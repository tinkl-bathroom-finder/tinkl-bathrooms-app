import * as React from 'react';
import { useDispatch } from 'react-redux';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import BabyChangingStationOutlinedIcon from "@mui/icons-material/BabyChangingStationOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import TransgenderOutlinedIcon from "@mui/icons-material/TransgenderOutlined";

function FilterByToggles() {
    const dispatch = useDispatch();

    const handleClick = () => {
    // dispatch({
    //     type: "FILTER_BATHROOMS"
    // })
}



    return (
        <Stack direction="row" spacing={1} sx={{mb: 1}} >
        <Chip label="Open now" variant="filled" color="primary" onClick={handleClick}  />
        <Chip icon={<AccessibleForwardOutlinedIcon/>} label="Accessible"  variant="filled" color="primary"  onClick={handleClick}  />
        <Chip icon={<BabyChangingStationOutlinedIcon/>} label="Changing table"  variant="filled" color="primary"  onClick={handleClick}  />
      </Stack>
    )
}

export default FilterByToggles;