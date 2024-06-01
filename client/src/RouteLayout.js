import React from 'react'
import NavigationBar from './Components/NavigationBar';
import {Outlet} from 'react-router-dom';
function RouteLayout() {
  return (
    <div>
        <NavigationBar />
        <Outlet />
    </div>
  )
}

export default RouteLayout;