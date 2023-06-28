import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthData } from "../../types/user";
import axios from "axios";

const baseUrl = 'https://cea1-176-98-9-55.ngrok-free.app/'

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params: any) => {
    // const {data} = await axios.post<IAuthData>('https://7d11-176-98-9-55.ngrok-free.app/auth/login', params)
    // return data
    try {
        const response = await axios.post<IAuthData>(baseUrl + `auth/login`, params)
        return response.data
    } catch (e) {
        console.log(e)
    }   
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: any) => {
    try {
        console.log(params)
        const response = await axios.post<IAuthData>(baseUrl + `auth/register`, params)
        return response.data
    } catch (e) {
        console.log(e)
    }   
})

export const fetchTest = createAsyncThunk('auth/fetchUserData', async (params : any) => {
    try {
        console.log(params)
        const response = await axios.post<IAuthData>(baseUrl + `loh`, params)
        return response.data
    } catch (e) {
        console.log('error')
    }   
})

interface IUserState {
    data: null | IAuthData;
    status: string
}

const initialState : IUserState = {
    data: null,
    status: 'loading'
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetData: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        [fetchAuth.pending.type]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchAuth.fulfilled.type]: (state, action : PayloadAction<IAuthData>) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchAuth.rejected.type]: (state) => {
            state.status = 'error'
            state.data = null
        },
        [fetchRegister.pending.type]: (state) => {
            state.status = 'loading'
            state.data = null
        },
        [fetchRegister.fulfilled.type]: (state, action : PayloadAction<IAuthData>) => {
            state.status = 'loaded'
            state.data = action.payload
        },
        [fetchRegister.rejected.type]: (state) => {
            state.status = 'error'
            state.data = null
        },
    }
}) 

export default authSlice.reducer
export const {resetData} = authSlice.actions