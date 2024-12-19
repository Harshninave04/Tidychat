import React from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Types
type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Chat Message Component
function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-6 px-8 py-3 ${isUser ? 'bg-orange-50 text-lg font-medium items-center rounded-lg shadow shadow-slate-200' : 'my-2 bg-gray-50 text-lg'}`}>
      <div className="flex-shrink-0">
        {isUser ? (
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        ) : (
          <div className="w-10 h-10 bg-gradient-to-br from-orange-300 to-orange-400 rounded-xl flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
      <div className="flex-1 prose max-w-none">
        <ReactMarkdown>{message.content}</ReactMarkdown>
      </div>
    </div>
  );
}


export default ChatMessage;