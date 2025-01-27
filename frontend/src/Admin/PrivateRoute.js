import React from 'react'
import { isAdminLogin } from './Auth'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
    return isAdminLogin() ? <Outlet /> : <Navigate to='signin' />
}
