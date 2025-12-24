import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/admin/AdminSidebar'
import AdminNavbar from '../../components/admin/AdminNavbar'

const Layout = () => {
  return (
    <>
     <AdminNavbar />
    <div className="flex min-h-screen bg-black text-white">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* Page Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>

    </div>
    </>
  )
}

export default Layout

