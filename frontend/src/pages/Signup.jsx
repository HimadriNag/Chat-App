import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";


export default function Signup() {
    const {signup,isSigningUp}=useAuthStore();

  const[formData,setFormData]=useState({
    name: "",
    email:"",
    password:"",
  });
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }
    await signup(formData);
    
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <div className="flex flex-col justify-center w-full max-w-sm px-4 md:px-6 py-6 md:py-8 rounded-xl border-2 border-lime-400 bg-white text-gray-900 text-xs md:text-sm shadow-lg shadow-lime-400/50 mx-4 md:mx-0">
        <h2 className="text-2xl font-semibold text-lime-500">Sign Up</h2>
        <p className="text-lime-600 mt-1">Signup to your account</p>
        <form onSubmit={handleSubmit} className="mt-8">
          <label htmlFor="name" className="block mb-1 font-medium text-lime-700">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="w-full p-2 mb-3 bg-gray-100 border border-lime-400 text-gray-900 placeholder-lime-500 rounded-md focus:outline-none focus:ring-2 transition focus:ring-lime-400 focus:border-lime-400" />
          <label htmlFor="email" className="block mb-1 font-medium text-lime-700">Email address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  placeholder="Email" className="w-full p-2 mb-3 bg-gray-100 border border-lime-400 text-gray-900 placeholder-lime-500 rounded-md focus:outline-none focus:ring-2 transition focus:ring-lime-400 focus:border-lime-400" />

          <label htmlFor="password" className="block mb-1 font-medium text-lime-700">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}  placeholder="Password" className="w-full p-2 mb-2 bg-gray-100 border border-lime-400 text-gray-900 placeholder-lime-500 rounded-md focus:outline-none focus:ring-2 transition focus:ring-lime-400 focus:border-lime-400" />

          <button type="submit" className="w-full mt-4 px-4 py-2.5 font-medium text-gray-900 bg-lime-400 rounded-md hover:bg-lime-300 focus:outline-none focus:ring-2 focus:ring-lime-400 shadow-md shadow-lime-400/50 active:bg-lime-500 cursor-pointer">{isSigningUp?"Loading...":"Signup"} </button>
        </form>
        <p>
          Already Have an account? <Link to="/login" className="text-blue-500">Sign in</Link>{" "}
        </p>

      </div>
    </div>
  );
};
