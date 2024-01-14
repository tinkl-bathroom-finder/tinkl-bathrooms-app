console.log('HELLLLLOOOOOOO??????')
let frickinArray = [
    {
      id: 62110,
      name: 'Oo',
      street: 'Mn',
      city: 'Ijo',
      state: 'Jj',
      accessible: false,
      unisex: false,
      directions: '',
      comment: '',
      latitude: 44.977753,
      longitude: -93.2650108,
      created_at: '2022-05-18T08:33:33.964Z',
      updated_at: '2022-05-18T08:33:34.055Z',
      downvote: 0,
      upvote: 0,
      country: 'US',
      changing_table: false,
      edit_id: 62110,
      approved: true,
      distance: 0,
      bearing: '0.0'
    },
    {
      id: 47878,
      name: 'Municipal Building, 350 S 5th St, Minneapolis, MN 55415, USA',
      street: 'Municipal Building',
      city: 'Minneapolis',
      state: 'Minnesota',
      accessible: true,
      unisex: false,
      directions: "Just inside the courthouse, ground floor (G), near the adult & juvenile detention areas. Look at a map to locate restrooms, they're a bit hidden down narrow hallways. Restrooms are labelled unisex  and are single stall. ",
      comment: '',
      latitude: 44.9772807,
      longitude: -93.2654276,
      created_at: '2019-03-04T16:37:52.435Z',
      updated_at: '2019-03-04T16:37:52.488Z',
      downvote: 0,
      upvote: 1,
      country: 'US',
      changing_table: false,
      edit_id: 47878,
      approved: true,
      distance: 0.03846932253398921,
      bearing: '221.428078856972'
    }
  ]

let testArray = ["Just inside the courthouse, ground floor (G), near the adult & juvenile detention areas. Look at a map to locate restrooms, they're a bit hidden down narrow hallways. Restrooms are labelled unisex  and are single stall. ", "lalalala'lalal'lalal"]

function stringifyThing(array){
  let newArray = []

  console.log('array', array)
  for (let i = 0; i < array.length; i++){
    console.log('array[i]: ', array[i])
    newArray.push(array[i].replace(/'/g, "&"))

  }
  return newArray;
  }

let string = "Just inside the courthouse, ground floor (G), near the adult & juvenile detention areas. Look at a map to locate restrooms, they're a bit hidden down narrow hallways. Restrooms are labelled unisex  and are single stall. "

console.log(`string.replace("'", "&"))`, string.replace("'", "&"))

console.log('stringifyThing(testArray)', stringifyThing(testArray))


//   function stringifyBathroomNames(BA) {
//     let newArray = []
//     for (let i = 0; i < BA.length; i++) {
//       BA[i].name.replace("'", "&");
//       BA[i].street.replace("'", "&");
//       BA[i].city.replace("'", "&");
//       BA[i].state.replace("'", "&");
//       BA[i].country.replace("'", "&");
//     BA[i].directions.replace("'", "&");
//     BA[i].comment.replace("'", "&");
//       newArray.push(BA[i])
//     }
//     return newArray;
//   }

//   console.log('stringifyBathroomNames(frickinArray)', stringifyBathroomNames(frickinArray))




router.put('/:id', (req, res) => {
    const queryText = `
      UPDATE "activities"
        SET
          "date"=$1,
          "temperature"=$2,
          "weather_conditions"=$3,
          "feel"=$4,
          "notes"=$5,
          "activity_type_id"=$6,
          "updated_date"=CURRENT_TIMESTAMP
        WHERE
          id=$7;
    `;
    console.log('req.body:', req.body);
    const queryValues = [
        req.body.activity.date,
        req.body.activity.temperature,
        req.body.activity.weather_conditions,
        req.body.activity.feel,
        req.body.activity.notes,
        req.body.activity.activity_type_id,
        req.params.id
    ];
    pool.query(queryText, queryValues)
    .then(result => {
      const queryDeleteText = `
      DELETE FROM activities_clothes
        WHERE activities_id=${req.params.id};
    `;
    // second QUERY removes clothes FOR THAT activity
      pool.query(queryDeleteText)
        .then(result => {
          const clothesArray = req.body.clothesArrayForQuery
          // console.log('clothes array', req.body.clothesArrayForQuery);
          // console.log('activity id', req.params.id);
          // const formattedClothesArray = formatClothesArray(clothesArray)
          // console.log('new query', editActivityClothesQuery(clothesArray, req.params.id));
          const editActivitiesClothesQuery = editActivityClothesQuery(clothesArray, req.params.id);
          // Third QUERY ADDS clothes FOR THAT activity
          pool.query(editActivitiesClothesQuery)
          .then(result => {
            res.sendStatus(201);
          }).catch(err => {
            // catch for third query
            console.log(err);
            res.sendStatus(500)
        })
        }).catch(err => {
          // catch for second query
          console.log(err);
          res.sendStatus(500)
      })
    }).catch(err => { // :apuntando_hacia_la_izquierda: Catch for first query
      console.log(err);
      res.sendStatus(500)
    })
})