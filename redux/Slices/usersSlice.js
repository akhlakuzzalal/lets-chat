/* eslint-disable prettier/prettier */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from '../../Components/axios';
export const fetchAllUser = createAsyncThunk('fetchUsers', () => {
  const responce = axios.get('/user').then(res => res.data);
  return responce;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers: builder => {
    //   allUsers
    builder.addCase(fetchAllUser.fulfilled, (state, {payload}) => {
      state.users = payload;
    });
  },
});

export const {setProducts, setProductCurrPage} = usersSlice.actions;

export default usersSlice.reducer;
