import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useNavigate} from 'react-router-dom';

const classes = {
    Button: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#FFFF',
        borderRadius: 1,
        padding: 1,
        backgroundColor: '#388E3C',
        "&:hover": {
            color: '#FFFF',
            backgroundColor: '#388E3C',
        },
    }
}
export default function LogoutDialog() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const navigate = useNavigate();
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open alert dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to log-out?"}
          </DialogTitle>
          <DialogActions>
            <Button sx={classes.Button} onClick={handleClose}>Yes</Button>
            <Button sx={classes.Button} onClick={() => navigate('/account')}>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}