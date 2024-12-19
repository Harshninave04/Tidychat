import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

function ChatInput({
  onSendMessage,
  isLoading,
}: {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            rows={1}
            className="w-full resize-none rounded-xl border border-gray-200 bg-white p-4 pr-16 focus:outline-none focus:ring-2 focus:ring-orange-200"
            style={{ minHeight: '52px', maxHeight: '200px' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg p-2.5 hover:from-orange-500 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
        <p className="text-center text-gray-500 text-sm mt-3">
          Tidychat can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}

export default ChatInput;
