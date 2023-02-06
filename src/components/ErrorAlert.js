import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { Image } from 'mui-image';
import ErrorImage from '../assets/error.png';
import {useNavigate} from 'react-router-dom';

export default function ErrorAlert() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  return (
    <Stack direction="column">
        <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Image duration = {0} src={ErrorImage}/>
        <DialogTitle sx= {{color: '#5F5B5B',fontFamily: 'Poppins',
    fontWeight: 'bold', textAlign: 'center',marginTop:  -9, fontSize: 25}} id="alert-dialog-title">
          {"Something wrong"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx = {{color: '#5F5B5B',fontFamily: 'Poppins',
             textAlign: 'center', fontSize: 20}} 
            id="alert-dialog-description">
            Something went wrong.
            Try again uploading another product.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', marginBottom: 1}}>
          <Button sx={{fontFamily: 'Poppins', fontWeight: 'bold', backgroundColor: '#388E3C', 
          color: '#FFFF', padding: 1,
          "&:hover": {
            color: '#FFFF',
            backgroundColor: '#388E3C',
          },}}
           onClick={() => navigate('/products/add')}>GO BACK</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}