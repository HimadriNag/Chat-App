import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative bg-lime-400 flex items-center justify-center">
              {selectedUser?.profilePic ? (
                <img
                  src={selectedUser.profilePic}
                  alt={selectedUser?.name || "User"}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-900 font-bold text-sm">
                  {selectedUser?.fullName?.charAt(0) || selectedUser?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser?.fullName || selectedUser?.name}</h3>
            <p className="text-sm text-base-content/70">

              {selectedUser?._id && onlineUsers?.includes(selectedUser._id) 
                ? "Online" 
                : "Offline"}
            </p>
          </div>
        </div>

        
        <button onClick={() => setSelectedUser(null)}>
          <X className="hover:text-error transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
