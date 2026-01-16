import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { X } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2 md:p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
          {/* Avatar */}
          <div className="avatar shrink-0">
            <div className="size-8 md:size-10 rounded-full relative bg-lime-400 flex items-center justify-center">
              {selectedUser?.profilePic ? (
                <img
                  src={selectedUser.profilePic}
                  alt={selectedUser?.name || "User"}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-900 font-bold text-xs md:text-sm">
                  {selectedUser?.fullName?.charAt(0) || selectedUser?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
          </div>

          {/* User info */}
          <div className="min-w-0 flex-1">
            <h3 className="font-medium text-sm md:text-base truncate">{selectedUser?.fullName || selectedUser?.name}</h3>
            <p className="text-xs md:text-sm text-base-content/70">
              {selectedUser?._id && onlineUsers?.includes(selectedUser._id) 
                ? "Online" 
                : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)} className="shrink-0 active:scale-95 transition-transform p-2 hover:bg-base-300 rounded-lg">
          <X className="size-5 md:size-6 hover:text-error transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
