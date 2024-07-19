import React from 'react';
import { Modal, Box, Fade, Backdrop } from '@mui/material';
import { styled } from '@mui/system';

const StyledModal = styled(Box)(({ theme }) => ({
    width: '45%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    outline: 'none',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    transition: 'transform 0.3s ease-out',
}));

export const BathroomModal = ({ open, handleClose, children }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <StyledModal
                    sx={{
                        transform: open ? 'translateX(0)' : 'translateX(-100%)',
                    }}
                >
                    {children}
                </StyledModal>
            </Fade>
        </Modal>
    );
};
