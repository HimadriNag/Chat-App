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
            <div className="size-10 rounded-full relative">
              <img
                src={
                  selectedUser?.profilePic ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                // FIXED: Added optional chaining here
                alt={selectedUser?.name || "User"}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser?.fullName || selectedUser?.name}</h3>
            <p className="text-sm text-base-content/70">
              {/* FIXED: Added optional chaining for ._id and safety check for onlineUsers array */}
              {selectedUser?._id && onlineUsers?.includes(selectedUser._id) 
                ? "Online" 
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button - Moved outside the flex-gap div for better spacing */}
        <button onClick={() => setSelectedUser(null)}>
          <X className="hover:text-error transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
