import axios from '../../utils/axios';
import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: [],
    state: null,
    error: null
}

export const getUser = createAsyncThunk(
    'user/fetch', async (user)=>{
        try{
            const data = await axios.get(`/users/${user.name}`)
            
            return data.data
        }catch(err){
            console.log(err)

        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
          .addCase(getUser.pending, (state) => {
            state.user = 'loading';
          })
          .addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = 'loaded';
          })
          .addCase(getUser.rejected, (state, action) => {
            state.user = ['error'];
            state.status = action.payload;
            
          });
      },
})



export default userSlice.reducer

