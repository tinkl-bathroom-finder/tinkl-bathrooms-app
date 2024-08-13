



const CompareTime = () => {
    const isOpenNow =()  => {

    
    let isOpen = false;

    const date = new Date();
    let day = date.getDay(); // day comes back as number => 1 is Monday, 2 is Tuesday, etc.
    let hour = date.getHours() * 100; // formats hour as military time
    let minutes  = date.getMinutes();
    let militaryTime = hour + minutes // we don't actually need to convert this to a string since we want to compare it as a numeral

    if (day = 1 && militaryTime >= bathroom.day_1_open && militaryTime <= bathroom.day_1_close){
      isOpen = true;
    }  else if (day = 2 && militaryTime >= bathroom.day_2_open && militaryTime <= bathroom.day_2_close){
      isOpen = true;
    } else if (day = 3 && militaryTime >= bathroom.day_3_open && militaryTime <= bathroom.day_3_close){
       isOpen = true;
    } else if (day = 4 && militaryTime >= bathroom.day_4_open && militaryTime <= bathroom.day_4_close){
      isOpen = true;
    } else if (day = 5 && militaryTime >= bathroom.day_5_open && militaryTime <= bathroom.day_5_close){
      isOpen = true;
    } else if (day = 6 && militaryTime >= bathroom.day_2_open && militaryTime <= bathroom.day_2_close){
      isOpen = true;
    }  else if (day = 7 && militaryTime >= bathroom.day_2_open && militaryTime <= bathroom.day_2_close){
      isOpen = true;
    }  else{console.log('close')
    } return isOpen;
    }
    return (
        <h6 class={isOpenNow ? "open" : "closed"}> {isOpenNow ? 'Open now' : 'Closed'}</h6>

    )
   }
  
export default CompareTime