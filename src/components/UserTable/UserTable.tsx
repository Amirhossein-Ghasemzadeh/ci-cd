import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, Pagination, TextField} from '@mui/material';
import {useConsumeContext} from '../../context/UserContext';
import TablePagination from '@mui/material/TablePagination';
import {IUser} from '../../context/types';

export default function BasicTable() {
  const {
    users,
    handleOpenModal,
    handleChange,
    handleEditUser,
    handleDeleteUSer,
    pageCount,
    text,
    handleTextChange,
    loading,
  } = useConsumeContext();

  // if (loading) {
  //   return <h1>loading data ...</h1>;
  // }
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextField label='search' value={text} onChange={handleTextChange} />
        <Button variant='outlined' sx={{m: '20px 0'}} onClick={handleOpenModal}>
          Add a New User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell align='right'>position</TableCell>
              <TableCell align='right'>email</TableCell>
              <TableCell align='right'>gender</TableCell>
              <TableCell align='right'>actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.length
              ? users.map((user: IUser, index) => (
                  <TableRow key={index}>
                    <TableCell align='right'>{user?.name}</TableCell>
                    <TableCell align='right'>{user?.position}</TableCell>
                    <TableCell align='right'>{user?.email}</TableCell>
                    <TableCell align='right'>{user?.gender}</TableCell>
                    <TableCell align='right'>
                      <Button onClick={() => handleDeleteUSer(user.id)}>
                        Delete
                      </Button>
                      <Button onClick={() => handleEditUser(user.id)}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : 'user does not exist!'}
          </TableBody>
        </Table>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Pagination
            count={pageCount}
            showFirstButton
            showLastButton
            onChange={handleChange}
          />
        </Box>
      </TableContainer>
    </Box>
  );
}
