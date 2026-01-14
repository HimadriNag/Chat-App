import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/Sidebar';
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';

const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className='h-screen w-screen bg-base-200 flex flex-col'>
      <div className='flex-1 flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-xl max-w-6xl w-full h-[calc(100vh-8rem)] flex flex-col'>
          <div className='flex h-full w-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
