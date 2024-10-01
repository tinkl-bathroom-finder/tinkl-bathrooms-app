import { BathtubOutlined } from "@mui/icons-material";

const CompareTime = (props) => {

    let bathroom = props.bathroom;

    const date = new Date();
    let day = date.getDay(); // day comes back as number => 1 is Monday, 2 is Tuesday, etc.
    let hour = date.getHours() * 100; // formats hour as military time
    let minutes  = date.getMinutes();
    let militaryTime = hour + minutes // we don't actually need to convert this to a string since we want to compare it as a numeral
    let newClose1 = 0
    let newClose2 = 0
    let newClose3 = 0
    let newClose4 = 0
    let newClose5 = 0
    let newClose6 = 0
    let newClose0 = 0 
    if (day === 1 && (Number(bathroom.day_1_open) > Number(bathroom.day_1_close))){
      newClose1 = 2400 + Number(bathroom.day_1_close)
    }
    else if (day === 2 && (Number(bathroom.day_2_open) > Number(bathroom.day_2_close))){
      newClose2 = 2400 + Number(bathroom.day_2_close)
    }
    else if (day === 3 && (Number(bathroom.day_3_open) > Number(bathroom.day_3_close))){
      newClose2 = 2400 + Number(bathroom.day_3_close)
    }
    else if (day === 4 && (Number(bathroom.day_4_open) > Number(bathroom.day_4_close))){
      newClose2 = 2400 + Number(bathroom.day_4_close)
    }
    else if (day === 5 && (Number(bathroom.day_5_open) > Number(bathroom.day_5_close))){
      newClose2 = 2400 + Number(bathroom.day_5_close)
    }
    else if (day === 6 && (Number(bathroom.day_6_open) > Number(bathroom.day_6_close))){
      newClose2 = 2400 + Number(bathroom.day_6_close)
    }
    else if (day === 0 && (Number(bathroom.day_0_open) > Number(bathroom.day_0_close))){
      newClose2 = 2400 + Number(bathroom.day_0_close)
    }
    
    console.log ('newClose2',newClose1, newClose2)
    const bathroomStatus =()  => {
        let isOpen = false;
        // if there are no opening hours listed for a business, set isOpen to null
        if( !bathroom.day_1_open && !bathroom.day_2_open && !bathroom.day_3_open && !bathroom.day_4_open && !bathroom.day_5_open &&  !bathroom.day_6_open ){
          isOpen = null;
    } else 
    if (day === 1 && (bathroom.day_1_open !== null && militaryTime >= bathroom.day_1_open && militaryTime <= bathroom.day_1_close)||(bathroom.day_1_open && militaryTime <= newClose1 )){
      isOpen = true;
    }  else if (day === 2 && (bathroom.day_2_open !== null && militaryTime >= bathroom.day_2_open && militaryTime <= bathroom.day_2_close)||(militaryTime >= bathroom.day_2_open && militaryTime <= newClose2 )){
      isOpen = true;
    } else if (day === 3 && (bathroom.day_3_open !== null && militaryTime >= bathroom.day_3_open && militaryTime <= bathroom.day_3_close)||(militaryTime >= bathroom.day_3_open && militaryTime <= newClose3 )){
       isOpen = true;
    } else if (day === 4 &&  (bathroom.day_4_open !== null && militaryTime >= bathroom.day_4_open && militaryTime <= bathroom.day_4_close)||(militaryTime >= bathroom.day_4_open && militaryTime <= newClose4 )){
      isOpen = true;
    } else if (day === 5 &&  (bathroom.day_5_open !== null && militaryTime >= bathroom.day_5_open && militaryTime <= bathroom.day_5_close)||(militaryTime >= bathroom.day_5_open && militaryTime <= newClose5 )){
      isOpen = true;
    } else if (day === 6 &&  (bathroom.day_6_open !== null && militaryTime >= bathroom.day_6_open && militaryTime <= bathroom.day_6_close)||(militaryTime >= bathroom.day_6_open && militaryTime <= newClose6 )){
      isOpen = true;
    }  else if (day === 0 &&  (bathroom.day_0_open !== null && militaryTime >= bathroom.day_0_open && militaryTime <= bathroom.day_0_close)||(militaryTime >= bathroom.day_0_open && militaryTime <= newClose0 )){
      isOpen = true;
    }  else { console.log('isOpen: ', isOpen)
      isOpen = false;
    } 
    return isOpen;
    }
    let isOpenNow = bathroomStatus()
    console.log("isOpenNow", isOpenNow)
    return (
        <h6 class={isOpenNow ? "open" : "closed"}>
          {/* if no business hours are available, nothing will display */}
        { isOpenNow === true
          ? 'Open Now' 
          : isOpenNow === false
          ? 'Closed'
        : ''}</h6>
    )
   }
  
export default CompareTime