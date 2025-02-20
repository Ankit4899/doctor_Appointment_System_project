import React from 'react'
import { createSlice } from '@reduxjs/toolkit'


export const alertSlice = createSlice({
    name:"Alerts",
    initialState:{
        loading:false
    },
    reducers:{
        showLoading:(state)=>{
            state.loading=true
        },
        hideLoading:(state)=>{
            state.loading=false
        }
    }
})

export const {showLoading,hideLoading} = alertSlice.actions;
