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
    <div className='flex items-center justify-center mt-8 md:mt-12 min-h-screen px-4'>
      <div className='bg-white shadow-lg p-4 md:p-8 rounded-xl w-full max-w-md'>
        {/* profile image upload */}
        <div className='relative w-24 md:w-32 h-24 md:h-32 mx-auto'>
          <img src={imagePreview || authUser?.profilePic || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"} alt="profile pic" className='w-24 md:w-32 h-24 md:h-32 rounded-full object-cover border' />
          <label htmlFor="profile-upload" className='absolute bottom-0 right-0 bg-black/70 text-white p-1.5 md:p-2 rounded-full cursor-pointer hover:bg-black transation'>
            <Camera size={16} className='md:size-[18px]' />
          </label>
          <input id="profile-upload" type='file' accept='image/*' onChange={handleImageChange} className='hidden  ' />

        </div>
        <p className='text-gray-600 text-center mt-2 text-xs md:text-sm'>
          Click the camera icon to change profile pic
        </p>
        {/* User information */}
        <div className="mt-4 md:mt-6">
          <label htmlFor=""className='block text-gray-600 text-xs md:text-sm mb-1'>Name</label>
          <input type="text" value={authUser.name} readOnly className='w-full p-2 md:p-3 text-gray-600 text-xs md:text-sm border rounded-lg bg-gray-100 cursor-not-allowed' />
          <label htmlFor=""className='block text-gray-600 text-xs md:text-sm mb-1 mt-2 md:mt-3'>Email</label>
          <input type="text" value={authUser?.email} readOnly className='w-full p-2 md:p-3 text-gray-600 text-xs md:text-sm border rounded-lg bg-gray-100 cursor-not-allowed' />
        </div>
        <p className='mt-3 md:mt-4 text-xs md:text-sm text-gray-600'>
          Member since: {authUser?.createdAt}
        </p>
        {/*  Update Button*/}
        <button onClick={handleSubmit} disabled={isUpdatingProfile} className='mt-4 md:mt-5 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-500 transition text-xs md:text-sm'>{isUpdatingProfile?"Upadating...":"Update"}</button>


      </div>


    </div>
  )
}

export default Profile
