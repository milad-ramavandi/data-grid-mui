import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from '../routes'

const AppRouterProvider = () => {
  return <RouterProvider router={routes}/>
}

export default AppRouterProvider