import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function EmailSubmittedAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
    <Alert variant="filled" severity="success">
      Email Submitted Successfully!
    </Alert>
  </Stack>
  )
}
