import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import BabyChangingStationOutlinedIcon from "@mui/icons-material/BabyChangingStationOutlined";
import AccessibleForwardOutlinedIcon from "@mui/icons-material/AccessibleForwardOutlined";
import TransgenderOutlinedIcon from "@mui/icons-material/TransgenderOutlined";

function FilterByToggles() {
    const dispatch = useDispatch();
    
  const isPublic = useSelector((store) => store.isPublic);
  const openNow = useSelector((store) => store.openNow);
  let accessible = false;
  let changing_table = false;

    const handleClick = () => {
    dispatch({
        type: "SAGA/SET_FILTERS"
    })
}

    const togglePublic = () => {
        dispatch({
          type: "TOGGLE_PUBLIC",
        });
        dispatch({
            type: "SAGA/SET_FILTERS",
            payload: isPublic
        })
      };

      const toggleOpenNow = () => {
        // isChecked is no longer doing anything because it is a button, not a toggle switch
        // setIsPublic(!isPublic);
        dispatch({
          type: "TOGGLE_OPEN_NOW",
        });
      };

      const toggleAccessible = () => {
        // isChecked is no longer doing anything because it is a button, not a toggle switch
        // setIsPublic(!isPublic);
        dispatch({
          type: "TOGGLE_ACCESSIBLE",
        });
      };

      const toggleChangingTable = () => {
        // isChecked is no longer doing anything because it is a button, not a toggle switch
        // setIsPublic(!isPublic);
        dispatch({
          type: "TOGGLE_CHANGING_TABLE",
        });
      };

    return (
        <Stack direction="row" spacing={1} sx={{mb: 1}} >
        <Chip label="Public" variant={isPublic ? "filled" : "outlined"} color="secondary" onClick={togglePublic}  />
        <Chip label="Open now" variant={openNow ? "filled" : "outlined"} color="secondary" onClick={toggleOpenNow}  />
        <Chip icon={<AccessibleForwardOutlinedIcon/>} label="Accessible"  variant={accessible ? "filled" : "outlined"} color="secondary"  onClick={toggleAccessible}  />
        <Chip icon={<BabyChangingStationOutlinedIcon/>} label="Changing table"  variant={changing_table ? "filled" : "outlined"} color="secondary"  onClick={toggleChangingTable}  />
      </Stack>
    )
}

export default FilterByToggles;