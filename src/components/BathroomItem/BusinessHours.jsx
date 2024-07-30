import { Box, Typography } from "@mui/material"

const BusinessHours = (props) => {

  const convertToTwelveHourTime = (time) => {
    let twelveHourTime = time/100
    let amOrPm = "am" 
    if (time > 1200) {
      twelveHourTime = twelveHourTime - 12
      amOrPm = "pm"
    
    }
    return `${twelveHourTime}${amOrPm}`
  }

    return (
        <Box sx={{ml: '20px'}}>
    <Typography sx={{fontWeight: 'bold'}}>Business hours:</Typography>
    <Typography>Monday: {props.bathroom.day_1_open ? convertToTwelveHourTime(props.bathroom.day_1_open) + '-' + convertToTwelveHourTime(props.bathroom.day_1_close)  : "Closed"}</Typography>
    <Typography>Tuesday: {props.bathroom.day_2_open ? convertToTwelveHourTime(props.bathroom.day_2_open) + '-' + convertToTwelveHourTime(props.bathroom.day_2_close) : "Closed"}</Typography>
    <Typography>Wednesday: {props.bathroom.day_3_open ? convertToTwelveHourTime(props.bathroom.day_3_open ) + '-' + convertToTwelveHourTime(props.bathroom.day_3_close) : "Closed"}</Typography>
    <Typography>Thursday: {props.bathroom.day_4_open ? convertToTwelveHourTime(props.bathroom.day_4_open ) + '-' + convertToTwelveHourTime(props.bathroom.day_4_close) : "Closed"}</Typography>
    <Typography>Friday: {props.bathroom.day_5_open ? convertToTwelveHourTime(props.bathroom.day_5_open ) + '-' + convertToTwelveHourTime(props.bathroom.day_5_close) : "Closed"}</Typography>
    <Typography>Saturday: {props.bathroom.day_6_open ? convertToTwelveHourTime(props.bathroom.day_6_open ) + '-' + convertToTwelveHourTime(props.bathroom.day_6_close) : "Closed"}</Typography>
    <Typography>Sunday: {props.bathroom.day_0_open ? convertToTwelveHourTime(props.bathroom.day_0_open ) + '-' + convertToTwelveHourTime(props.bathroom.day_0_close) : "Closed"}</Typography>
    </Box>)
}

export default BusinessHours;