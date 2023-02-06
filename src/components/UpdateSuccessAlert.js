import React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function UpdateSuccessAlert() {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
        <Alert variant="filled" severity="success">
          Product Updated Successfully!
        </Alert>
      </Stack>
  )
}
