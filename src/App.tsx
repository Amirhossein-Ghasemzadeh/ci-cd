// import AddOrEditUser from './components/AddorEditUser/AddOrEditUser';
import {Container} from '@mui/material';
import Modal from './components/Modal';
import UserTable from './components/UserTable/UserTable';
import {UserContext} from './context/UserContext';
const App = () => {
  return (
    <Container maxWidth='lg'>
      <UserContext>
        <Modal />
        <UserTable />
      </UserContext>
      {/* <AddOrEditUser /> */}
    </Container>
  );
};

export default App;
