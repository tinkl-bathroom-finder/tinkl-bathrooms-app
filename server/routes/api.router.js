const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

//Essie's old api route

// router.get('/', (req,res) => {
//     console.log('req.query.perPage: ', req.query.perPage)
//     console.log('req.query.perPage: ', req.query.pageNumber)
//     // axios get request to Refuge API to get bathrooms in Minneapolis? Do I even need this if I'm directly making the http get request from my saga?
//     axios({
//         method: "GET",
//         url: `https://refugerestrooms.org/api/v1/restrooms/by_location?lat=44.977753&lng=-93.2650108&search=Minneapolis%2C+Minnesota%2C&per_page=${req.query.perPage}&page=${req.query.pageNumber}`
//       })
//       .then ((response)=>{
//         res.send(response.data);
//       })
//       .catch((error)=>{
//         console.log("Error in get SEARCH", error);
//       })
// })


/**
 * GOOGLE Geocoding API
 */
router.get("/", (req, res) => {
  // query for which restrroms to get geocoding info for
  const query = /*sql*/`
  SELECT *
  FROM "restrooms"
  WHERE COALESCE(place_id, '') = ''
  ORDER BY id;`
  pool.query(query)
    .then(async (dbRes) => {
      // db_bathrooms array of bathroom objects from db
      let db_bathrooms = dbRes.rows
      console.log('db bathrooms:', db_bathrooms);
      for (let i = 0; i < db_bathrooms.length; i++) {
        let restroom_id = db_bathrooms[i].id
        let apiGeocode = `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCXfizt8q0KOhephD9TP55AqYdnUFNp1H0&address=${db_bathrooms[i].name.split(" ").join("%20")}%20${db_bathrooms[i].street.split(" ").join("%20")}%20${db_bathrooms[i].city.split(" ").join("%20")}%20${db_bathrooms[i].state.split(" ").join("%20")}`
        console.log('search string:', apiGeocode);
        await axios({
          method: "GET",
          url: `${apiGeocode}`
        })
          .then((response) => {
            let formatted_address = response.data.results[0].formatted_address
            let latitude_geo = response.data.results[0].location.latitude
            let longitude_geo = response.data.results[0].location.longitude
            let street_number = ''
            let street = ''
            let city = ''
            let state = ''
            let country = ''
            let zip = ''
            let i = 0
            while (i < response.data.results[0].address_components.length) {
              if (response.data.results[0].address_components[i].types[0] === "street_number") {
                street_number = response.data.results[0].address_components[i].short_name
              } else if (response.data.results[0].address_components[i].types[0] === "route") {
                street = response.data.results[0].address_components[i].short_name
              } else if (response.data.results[0].address_components[i].types[0] === "locality") {
                city = response.data.results[0].address_components[i].short_name
              } else if (response.data.results[0].address_components[i].types[0] === "administrative_area_level_1") {
                state = response.data.results[0].address_components[i].short_name
              } else if (response.data.results[0].address_components[i].types[0] === "country") {
                country = response.data.results[0].address_components[i].short_name
              } else if (response.data.results[0].address_components[i].types[0] === "postal_code") {
                zip = response.data.results[0].address_components[i].short_name
              }
              i++;
            }
            console.log('street_number:', street_number, 'street:', street, 'city:', city, 'state:', state, 'country:', country, 'zip:', zip, "formatted address:", formatted_address);
            if (response.data.results[0].place_id) {
              // add more variables to query to match DB
              const sqlQuery = `
              UPDATE "restrooms"
                  SET "place_id"=$1, "formatted_address"=$3
                  WHERE "id"=$2
              `;
              const sqlValues = [response.data.results[0].place_id, restroom_id, response.data.results[0].formatted_address];
              pool.query(sqlQuery, sqlValues)
            }
            // not sure if we need this?
            else { res.sendStatus(200) }
          })
          .catch((error) => {
            console.log("Error in geocode API", error);
          })
      }
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});

/**
 * GOOGLE PLACES API
 */
router.get("/places", (req, res) => {
  // query for which restrroms to get geocoding info for
  const query = /*sql*/`
  SELECT *
  FROM "restrooms"
  ORDER BY id;`
  pool.query(query)
    .then(async (dbRes) => {
      // db_bathrooms array of bathroom objects from db
      let db_bathrooms = dbRes.rows
      for (let i = 0; i < db_bathrooms.length; i++) {
        console.log('db bathrooms id and place id:', db_bathrooms[i].id, db_bathrooms[i].place_id);
        let restroom_id = db_bathrooms[i].id
        let place_id = db_bathrooms[i].place_id
        await axios({
          method: "GET",
          url: `https://places.googleapis.com/v1/places/${place_id}?fields=*&key=AIzaSyDwUFUMBNNbnaNJQjykE2YU6gnk-s5w5mo`
        })
          .then(async (response) => {
            // insert into opening_hours table 
            let place = response.data
            let sqlQuery;
            let sqlValues;
            console.log('place_id:', place.id);
            let business_status = null
            if (place.businessStatus) {
              business_status = place.businessStatus
              //  if a business is permanently closed, the SQL query will just be to "remove" the restroom from the table
              if (business_status === "CLOSED_PERMANENTLY") {
                console.log(`restroom with id ${restroom_id} will be removed from the database.`)
                sqlQuery = `
                UPDATE "restrooms"
                SET "is_removed"=TRUE
                WHERE "id"=$1
                `
                sqlValues = restroom_id
              } 
              // otherwise, if a business isn't permanently closed and does have its opening hours listed, the SQL query will insert them into the opening_hours table
              else if (place.regularOpeningHours){
            let weekday_text = ''
            let day_0_open = null
            let day_0_close = null
            let day_1_open = null
            let day_1_close = null
            let day_2_open = null
            let day_2_close = null
            let day_3_open = null
            let day_3_close = null
            let day_4_open = null
            let day_4_close = null
            let day_5_open = null
            let day_5_close = null
            let day_6_open = null
            let day_6_close = null

            let i = 0
              while (i < place.regularOpeningHours.periods.length) {
                if (place.regularOpeningHours.periods[i].open.day === 0) {
                  day_0_open = place.regularOpeningHours.periods[i].open.hour * 100
                  day_0_close = place.regularOpeningHours.periods[i].close.hour * 100
                } else if (place.regularOpeningHours.periods[i].open.day === 1) {
                  day_1_open = place.regularOpeningHours.periods[i].open.hour * 100
                  day_1_close = place.regularOpeningHours.periods[i].close.hour * 100
                } else if (place.regularOpeningHours.periods[i].open.day === 2) {
                  day_2_open = place.regularOpeningHours.periods[i].open.hour * 100
                  day_2_close = place.regularOpeningHours.periods[i].close.hour * 100
                } else if (place.regularOpeningHours.periods[i].open.day === 3) {
                  day_3_open = place.regularOpeningHours.periods[i].open.hour * 100
                  day_3_close = place.regularOpeningHours.periods[i].close.hour * 100
                } else if (place.regularOpeningHours.periods[i].open.day === 4) {
                  day_4_open = place.regularOpeningHours.periods[i].open.hour * 100
                  day_4_close = place.regularOpeningHours.periods[i].close.hour * 100
                } else if (place.regularOpeningHours.periods[i].open.day === 5) {
                  day_5_open = place.regularOpeningHours.periods[i].open.hour * 100
                  day_5_close = place.regularOpeningHours.periods[i].close.hour * 100
                } else if (place.regularOpeningHours.periods[i].open.day === 6) {
                  day_6_open = place.regularOpeningHours.periods[i].open.hour * 100
                  day_6_close = place.regularOpeningHours.periods[i].close.hour * 100
                }
                i++;
              }
              for (let i = 0; i < place.regularOpeningHours.weekdayDescriptions.length; i++) {
                if (i < place.regularOpeningHours.weekdayDescriptions.length - 1) {
                  weekday_text += `${place.regularOpeningHours.weekdayDescriptions[i]}, `
                } else if (i === place.regularOpeningHours.weekdayDescriptions.length - 1) {
                  weekday_text += `${place.regularOpeningHours.weekdayDescriptions[i]}`
                }
              }
            
            // SQL query to insert opening hours into opening_hours table
             sqlQuery = `
              INSERT INTO "opening_hours"
              ("restroom_id", "business_status", "weekday_text", "day_0_open", "day_0_close", "day_1_open", "day_1_close", "day_2_open", "day_2_close", "day_3_open", "day_3_close", "day_4_open", "day_4_close", "day_5_open", "day_5_close", "day_6_open", "day_6_close")
              VALUES
              ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`;
             sqlValues = [restroom_id, business_status, weekday_text, day_0_open, day_0_close, day_1_open, day_1_close, day_2_open, day_2_close, day_3_open, day_3_close, day_4_open, day_4_close, day_5_open, day_5_close, day_6_open, day_6_close]
              }
// 👉 Query will either a) change "is_removed" to true in restrooms table, if business_status is "CLOSED_PERMANENTLY", or:
// b) if 
            await pool.query(sqlQuery, sqlValues)
            }
            // let wheelchair_accessible = null
            // if (place.accessibilityOptions) {
            //   if (place.accessibilityOptions.wheelchairAccessibleRestroom && place.accessibilityOptions.wheelchairAccessibleRestroom === true) {
            //     wheelchair_accessible = true
            //   } else if (place.accessibilityOptions.wheelchairAccessibleRestroom && place.accessibilityOptions.wheelchairAccessibleRestroom === false) {
            //     wheelchair_accessible = false
            //   }
            // }
              // .then(async result => {
              //   // then update statement for wheelchair accessibility and open status on restrooms table
              //   let secondSqlQuery;
              //   console.log('status:', business_status);
              //   // if (wheelchair_accessible === true && business_status === 'OPERATIONAL') {
              //   //   sqlQuery = `
              //   // UPDATE "restrooms"
              //   //     SET "accessible"=TRUE, 
              //   //     "is_removed"=FALSE
              //   //     WHERE "id"=$1
              //   // `;
              //   // } else if (wheelchair_accessible === true && business_status === 'CLOSED_PERMANENTLY') {
              //   //   sqlQuery = `
              //   // UPDATE "restrooms"
              //   //     SET "accessible"=TRUE,
              //   //     "is_removed"=TRUE
              //   //     WHERE "id"=$1
              //   // `;
              //   // } else if (wheelchair_accessible === false && business_status === 'OPERATIONAL') {
              //   //   sqlQuery = `
              //   // UPDATE "restrooms"
              //   //     SET "accessible"=FALSE,
              //   //     "is_removed"=FALSE
              //   //     WHERE "id"=$1
              //   // `;
              //   // } else if (wheelchair_accessible === false && business_status === 'CLOSED_PERMANENTLY') {
              //   //   sqlQuery = `
              //   // UPDATE "restrooms"
              //   //     SET "accessible"=FALSE,
              //   //     "is_removed"=TRUE
              //   //     WHERE "id"=$1
              //   // `;
              //   // } else if (wheelchair_accessible === null && business_status === 'OPERATIONAL') {
              //   //   sqlQuery = `
              //   // UPDATE "restrooms"
              //   //     SET "is_removed"=FALSE
              //   //     WHERE "id"=$1
              //   // `;
              //   // } else
              //   //  if (business_status === 'CLOSED_PERMANENTLY') {
              //   //   secondSqlQuery = `
              //   // UPDATE "restrooms"
              //   //     SET "is_removed"=TRUE
              //   //     WHERE "id"=$1
              //   // `;
              //   // }
              //   // const secondSqlValues = [restroom_id];
              //   // await pool.query(secondSqlQuery, secondSqlValues)
              // }).catch(err => {
              //   console.log('error in insert opening_hours table', err);
              //   res.sendStatus(500)
              // })
          })
          .catch((error) => {
            console.log("Error in places API", error);
          })
      }
    })
    .catch((dbErr) => {
      console.log("fail:", dbErr);
      res.sendStatus(500);
    });
});

module.exports = router;