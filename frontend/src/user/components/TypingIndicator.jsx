export default function TypingIndicator() {
    return (
      <div className="flex items-center gap-2 text-gray-400 text-sm pl-4">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
        </div>
        <span>typing...</span>
      </div>
    );
  }