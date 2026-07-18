import React from 'react'
import PageHeader from './PageHeader'
import NavbarActions from './NavbarActions'


const Navbar = () => {
    
 
  return (
    <nav className="flex items-center justify-between h-16  p-10 bg-white border-b border-slate-200">

    <PageHeader />

    <NavbarActions/>

</nav>
  
    
          
  )
}

export default Navbar
