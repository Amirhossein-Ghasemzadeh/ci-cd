import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as types from './types';
import axios from 'axios';

const userContext = createContext({} as types.IContextValues);

export const UserContext = ({children}: types.IProps) => {
  const [state, setState] = useState<types.IState>({
    pageNo: 1,
    users: [],
    mode: 'add',
    isOpenModal: false,
    text: '',
    loading: false,
    edit: {
      data: null,
      id: null,
    },
    pageCount: 0,
  });

  const fetchAllUsers = useCallback(async () => {
    if (state.text.length >= 3) {
      const response = await axios.get(
        `http://localhost:4000/users?q=${state.text}`
      );
      const userCount = response.data.length;
      const pageCount = Math.ceil(userCount / 4);
      setState((prevState) => ({
        ...prevState,
        pageCount,
      }));
    } else {
      const response = await axios.get(`http://localhost:4000/users`);
      const userCount = response.data.length;
      const pageCount = Math.ceil(userCount / 4);
      setState((prevState) => ({
        ...prevState,
        pageCount,
      }));
    }
  }, [state.text]);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleOpenModal = (): void => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: true,
    }));
  };

  const handleCloseModal = (): void => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: false,
    }));
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setState((prevState) => ({
      ...prevState,
      pageNo: value,
    }));
  };

  const fetchData = useCallback(async () => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    if (state.text.length >= 3) {
      const response = await axios.get(
        `http://localhost:4000/users?q=${state.text}&_page=${state.pageNo}&_limit=4`
      );
      console.log(response);

      setState((prevState) => ({
        ...prevState,
        users: response.data,
        loading: false,
      }));
    } else {
      const response = await axios.get(
        `http://localhost:4000/users?_page=${state.pageNo}&_limit=4`
      );
      setState((prevState) => ({
        ...prevState,
        users: response.data,
        loading: false,
      }));
    }
  }, [state.pageNo, state.text]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addNewUser = async (data: types.IAddUser) => {
    const response = await axios.post('http://localhost:4000/users', data);
    console.log(response.status);

    if (response.status === 201) {
      setState((prevState) => ({
        ...prevState,
        isOpenModal: false,
      }));
      fetchData();
      fetchAllUsers();
    }
  };

  const handleEditUser = async (id: number) => {
    setState((prevState) => ({
      ...prevState,
      isOpenModal: true,
      mode: 'edit',
      loading: true,
    }));

    const response = await axios.get(`http://localhost:4000/users/${id}`);
    setState((prevState) => ({
      ...prevState,
      edit: {
        data: response.data,
        id: id,
      },
      loading: false,
    }));
  };

  const editUser = async (data: types.IAddUser) => {
    const response = await axios.put(
      `http://localhost:4000/users/${state.edit.id}`,
      data
    );
    setState((prevState) => ({
      ...prevState,
      isOpenModal: false,
    }));
    fetchData();
  };

  const handleDeleteUSer = async (id: number) => {
    await axios.delete(`http://localhost:4000/users/${id}`);
    fetchData();
    fetchAllUsers();
    if (state.users.length === 1) {
      setState((prevState) => ({
        ...prevState,
        pageNo: prevState.pageNo - 1,
      }));
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prevState) => ({
      ...prevState,
      text: e.target.value,
    }));
  };

  const values: types.IContextValues = {
    ...state,
    handleOpenModal,
    handleCloseModal,
    handleChange,
    addNewUser,
    handleEditUser,
    editUser,
    handleDeleteUSer,
    handleTextChange,
  };
  return <userContext.Provider value={values}>{children}</userContext.Provider>;
};

export const useConsumeContext = () => useContext(userContext);
