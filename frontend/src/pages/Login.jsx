import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {Link} from "react-router-dom";


export default function Login() {
    const {login,isLoggingIn}=useAuthStore();

  const[formData,setFormData]=useState({
   
    email:"",
    password:"",
  });
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  const handleSubmit=async(e)=>{
    e.preventDefault();
    await login(formData);
    
  }
  return (
    <div className="flex items-center justify-center mt-12">
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>

      <div className="flex flex-col justify-center w-full max-w-80 rounded-xl px-6 py-8 border border-slate-700 bg-slate-900 text-white text-sm">
        <h2 className="text-2xl font-semibold">Sign In</h2>
        <p className="text-slate-300 mt-1">Signin to your account</p>
        <form onSubmit={handleSubmit} className="mt-8">
         
          <label htmlFor="email" className="block mb-1 font-medium text-slate-300">Email address</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}  placeholder="Email" className="w-full p-2 mb-3 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500" />

          <label htmlFor="password" className="block mb-1 font-medium text-slate-300">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange}  placeholder="Password" className="w-full p-2 mb-2 bg-slate-900 border border-slate-700 rounded-md focus:outline-none focus:ring-1 transition focus:ring-indigo-500 focus:border-indigo-500" />

          <button type="submit" className="w-full mt-4 px-4 py-2.5 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">{isLoggingIn?"Loading...":"Login"} </button>
        </form>
        <p>
          Don't Have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>{" "}
        </p>

      </div>
    </div>
  );
};
