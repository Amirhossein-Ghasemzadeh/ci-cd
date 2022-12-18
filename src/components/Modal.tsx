import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, {PaperProps} from '@mui/material/Paper';
import Draggable from 'react-draggable';
import {useConsumeContext} from '../context/UserContext';
import AddOrEditUser from './AddorEditUser/AddOrEditUser';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle='#draggable-dialog-title'
      cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function Modal() {
  const {handleOpenModal, handleCloseModal, isOpenModal, mode, loading} =
    useConsumeContext();

  return (
    <div>
      <Dialog
        open={isOpenModal}
        onClose={handleCloseModal}
        PaperComponent={PaperComponent}
        aria-labelledby='draggable-dialog-title'>
        <DialogTitle style={{cursor: 'move'}} id='draggable-dialog-title'>
          {mode === 'add' ? 'Add New User' : 'Edit User'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {mode === 'edit' && loading ? 'loading' : <AddOrEditUser />}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
