import React, { useImperativeHandle, forwardRef, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface FormDialogProps {
  title: string;
  content: string;
}

export interface FormDialogHandle {
  show: () => void;
  hide: () => void;
}

const FormDialog = forwardRef<FormDialogHandle, FormDialogProps>(({ title, content }, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    show() {
      setOpen(true);
    },
    hide() {
      setOpen(false);
    },
  }));

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default FormDialog;
