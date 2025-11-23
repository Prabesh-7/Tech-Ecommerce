import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar.jsx'
import Footer from '../components/Footer.jsx'


export default function FrontendLayout() {
  return (
    <div>

    <Navbar/>
    <Outlet/>
    <Footer />
      
    </div>
  )
}
