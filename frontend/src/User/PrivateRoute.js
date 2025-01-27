import React from 'react'
import { isUserLogin } from './Auth'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
    return isUserLogin() ? <Outlet /> : <Navigate to='signin' />
}
