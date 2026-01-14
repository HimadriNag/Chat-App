import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import toast from 'react-hot-toast';
import { Camera } from "lucide-react";

const Profile = () => {
  const { updateProfile, isUpdatingProfile, authUser } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = () => {

      setSelectedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = async () => {
    if (!selectedImage) {
      return toast.error("Please select an image");
    }
    await updateProfile({ profilePic: selectedImage });
  };
  return (
    <div className='flex items-center justify-center mt-12'>
      <div className='bg-white shadow-lg p-8 rounded-xl w-100'>
        {/* profile image upload */}
        <div className='relative w-32 h-32 mx-auto'>
          <img src={imagePreview || authUser?.profilePic || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} alt="profile pic" className='w-32 h-32 rounded-full object-cover border' />
          <label htmlFor="profile-upload" className='absolute bottom-1 right-1 bg-black/70 text-white p-2 rounded-full cursor-pointer hover:bg-black transation'>
            <Camera size={18} />
          </label>
          <input id="profile-upload" type='file' accept='image/*' onChange={handleImageChange} className='hidden  ' />

        </div>
        <p className='text-gray-600 text-center mt-2'>
          Click the camera icon to change profile pic
        </p>
        {/* User information */}
        <div className="mt-6">
          <label htmlFor=""className='block text-gray-600 text-sm mb-1'>Name</label>
          <input type="text" value={authUser.name} readOnly className='w-full p-3 text-gray-600 border rounded-lg bg-gray-100 cursor-not-allowed' />
          <label htmlFor=""className='block text-gray-600 text-sm mb-1'>Email</label>
          <input type="text" value={authUser?.email} readOnly className='w-full p-3 text-gray-600 border rounded-lg bg-gray-100 cursor-not-allowed' />
        </div>
        <p className='mt-4 text-sm text-gray-600'>
          Member since: {authUser?.createdAt}
        </p>
        {/*  Update Button*/}
        <button onClick={handleSubmit} disabled={isUpdatingProfile} className='mt-5 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-500 transition'>{isUpdatingProfile?"Upadating...":"Update"}</button>


      </div>


    </div>
  )
}

export default Profile
