import React from 'react'
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';

const Navbar = () => {
  const {logout}=useAuthStore();
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost text-xl">Secure Chat</Link>
      </div>
      <div className="flex-none">



        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <Link to="/profile" className="justify-between">
                Profile
               
              </Link>
            </li>
            
            <li><p onClick={logout}>Logout</p></li>
          </ul>
        </div>
      </div>
    </div>


  )
}

export default Navbar
