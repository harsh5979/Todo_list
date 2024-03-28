import React from 'react'

const Navbar = () => {
  return (
 <nav className=' bg-slate-400 h-11 flex justify-between sticky top-0 '>
    <div className="logo font-bold text-xl mx-6 py-2"> 
    TODO-LIST</div>
    <ul className="flex text-xl mx-7 py-2 gap-6">
        <li className=""><a href="/">Home</a></li>
        <li className=""><a href="#">about</a></li>
    </ul>
 </nav>
  )
}

export default Navbar
