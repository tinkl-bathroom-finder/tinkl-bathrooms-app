import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";

const BusinessHours = (props) => {
  let bathroom = props.bathroom;

  const convertToTwelveHourTime = (time) => {
    let twelveHourTime = time/100
    let amOrPm = "am"
    if (time > 1200) {
      twelveHourTime = twelveHourTime - 12
      amOrPm = "pm"
    
    }else if (time == 1200){
      amOrPm = "pm"
    }else if (time == 0) {
      twelveHourTime = 12
    }
    
    return `${twelveHourTime}${amOrPm}`
  }
  if( bathroom.day_1_open || bathroom.day_2_open || bathroom.day_3_open || bathroom.day_4_open || bathroom.day_5_open ||  bathroom.day_6_open ){
    return (
        <Accordion defaultExpanded sx={{pl: '16px', boxShadow: 'none' }}>
        <AccordionSummary 
        // expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
          >
    <Typography sx={{fontWeight: 'bold', ml: '-16px'}}>Business hours:</Typography>
    </AccordionSummary>
    <Typography variant='body1' sx={{pl: '8px'}}>Monday: {props.bathroom.day_1_open ? convertToTwelveHourTime(props.bathroom.day_1_open) + '-' + convertToTwelveHourTime(props.bathroom.day_1_close)  : "Closed"}</Typography>
    <Typography variant='body1' sx={{pl: '8px'}}>Tuesday: {props.bathroom.day_2_open ? convertToTwelveHourTime(props.bathroom.day_2_open) + '-' + convertToTwelveHourTime(props.bathroom.day_2_close) : "Closed"}</Typography>
    <Typography variant='body1' sx={{pl: '8px'}}>Wednesday: {props.bathroom.day_3_open ? convertToTwelveHourTime(props.bathroom.day_3_open ) + '-' + convertToTwelveHourTime(props.bathroom.day_3_close) : "Closed"}</Typography>
    <Typography variant='body1' sx={{pl: '8px'}}>Thursday: {props.bathroom.day_4_open ? convertToTwelveHourTime(props.bathroom.day_4_open ) + '-' + convertToTwelveHourTime(props.bathroom.day_4_close) : "Closed"}</Typography>
    <Typography variant='body1' sx={{pl: '8px'}}>Friday: {props.bathroom.day_5_open ? convertToTwelveHourTime(props.bathroom.day_5_open ) + '-' + convertToTwelveHourTime(props.bathroom.day_5_close) : "Closed"}</Typography>
    <Typography variant='body1' sx={{pl: '8px'}}>Saturday: {props.bathroom.day_6_open ? convertToTwelveHourTime(props.bathroom.day_6_open ) + '-' + convertToTwelveHourTime(props.bathroom.day_6_close) : "Closed"}</Typography>
    <Typography variant='body1' sx={{pl: '8px', pb: '16px'}}>Sunday: {props.bathroom.day_0_open ? convertToTwelveHourTime(props.bathroom.day_0_open ) + '-' + convertToTwelveHourTime(props.bathroom.day_0_close) : "Closed"}</Typography>
    </Accordion >)
}
}

export default BusinessHours;