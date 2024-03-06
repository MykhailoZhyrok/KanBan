import axios from "axios";
import {createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
  data: [],
  status: null,
  error: null
}

export const getIssue = createAsyncThunk(
  'issue/fetch', 
  async ({owner, repo}) => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/issues`);
      return response.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
);

const issueSlice = createSlice({
  name: 'issue',
  initialState,
  reducers: {
    // Додаткові редуктори, якщо необхідно
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIssue.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getIssue.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log(state.data);
      })
      .addCase(getIssue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Отримати текст помилки
      });
  },
});

export default issueSlice.reducer;

