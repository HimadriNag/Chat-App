import React, { useEffect } from 'react';
import { Users } from "lucide-react";
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import SidebarSkeleton from './SidebarSkeleton';

const Sidebar = () => {
  const { selectedUser, setSelectedUser, users, getUsers, isUsersLoading } = useChatStore();
  const { onlineUsers = [] } = useAuthStore(); // Default to empty array to prevent .includes() crash

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
      </div>

      <div className="overflow-y-auto w-full py-3">
        {/* Added optional chaining users?.map to prevent crash if users is null */}
        {users?.map((user) => (
          <button
            onClick={() => setSelectedUser(user)}
            key={user._id}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={
                  user.profilePic ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />

              {/* Added check for onlineUsers existence before calling .includes */}
              {onlineUsers?.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName || user.name}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {users?.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
