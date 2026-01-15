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
    <aside className="h-auto md:h-full w-full md:w-72 border-b md:border-b-0 md:border-r border-base-300 flex md:flex-col transition-all duration-200 overflow-x-auto md:overflow-x-visible">
      <div className="border-b border-base-300 w-full p-3 md:p-5 min-w-max md:min-w-0">
        <div className="flex items-center gap-2">
          <Users className="size-5 md:size-6" />
          <span className="font-medium hidden md:block text-sm md:text-base">Contacts</span>
        </div>
        {/* TODO: Online filter toggle */}
      </div>

      <div className="overflow-x-auto md:overflow-x-visible overflow-y-auto md:overflow-y-auto w-full py-2 md:py-3 flex md:flex-col flex-row md:min-w-0">
        {/* Added optional chaining users?.map to prevent crash if users is null */}
        {users?.map((user) => (
          <button
            onClick={() => setSelectedUser(user)}
            key={user._id}
            className={`
              min-w-fit md:w-full px-2 md:px-3 py-2 md:py-3 flex flex-col md:flex-row items-center md:items-center gap-2 md:gap-3
              hover:bg-base-300 transition-colors flex-shrink-0 md:flex-shrink
              ${selectedUser?._id === user._id
                ? "bg-base-300 ring-1 ring-base-300"
                : ""
              }
            `}
          >
            <div className="relative mx-auto md:mx-0">
              <img
                src={
                  user.profilePic ||
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23999'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E"
                }
                alt={user.name}
                className="size-10 md:size-12 object-cover rounded-full"
              />

              {/* Added check for onlineUsers existence before calling .includes */}
              {onlineUsers?.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-2 md:size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - visible on mobile as text below avatar, on desktop as side text */}
            <div className="hidden md:block text-left min-w-0">
              <div className="font-medium truncate text-sm">{user.fullName || user.name}</div>
              <div className="text-xs text-zinc-400">
                {onlineUsers?.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {users?.length === 0 && (
          <div className="text-center text-zinc-500 py-4 w-full">No users found</div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
