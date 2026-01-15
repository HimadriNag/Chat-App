import { MessageSquare } from "lucide-react";
const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-4 md:p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-4 md:space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-2 md:mb-4">
          <div className="relative">
            <div
              className="w-12 md:w-16 h-12 md:h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-6 md:w-8 h-6 md:h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-lg md:text-2xl font-bold">Welcome to Secure Chat</h2>
        <p className="text-xs md:text-base text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};
export default NoChatSelected;
