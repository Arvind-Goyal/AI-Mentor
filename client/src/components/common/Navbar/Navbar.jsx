import React from 'react'
import PageHeader from './PageHeader'
import NavbarActions from './NavbarActions'


const Navbar = () => {
    
 
  return (
    <nav className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 py-4">

    <PageHeader />

    <NavbarActions/>

</nav>
  
    
          
  )
}

export default Navbar
