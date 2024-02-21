import {configureStore} from '@reduxjs/toolkit'
import issueSlice from '../features/issue/issueSlice'
import userSlice from '../features/user/userSlice'


export const store = configureStore({
    reducer:{
        issue: issueSlice,
        user: userSlice,
    },
}) 