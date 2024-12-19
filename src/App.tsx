import React, { useState } from 'react';
import { Bot, Download, Headphones, Plus, Search, Settings } from 'lucide-react';
import ChatInput from './components/ChatInput';
import ChatMessage from './components/ChatMessage';
import { getGeminiResponse } from './lib/gemini';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

// Welcome Header Component
function WelcomeHeader() {
  return (
    <div className="flex items-center gap-3 px-8 py-4 border-b">
      <div className="w-8 h-8 bg-gradient-to-br from-orange-300 to-orange-400 rounded-xl flex items-center justify-center">
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1">
        <h1 className="text-lg font-semibold">Welcome to Tidy!</h1>
      </div>
      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1 px-3 py-1.5 border bg-gray-200 border-bg-gray-100 rounded-lg text-sm">
          <Bot className="w-4 h-4" />
          GPT-4 Turbo
        </span>
        <span className='p-1 border-2 border-bg-gray-100 rounded-lg'>
          <Download className="w-5 h-5 text-black" />
        </span>
      </div>
    </div>
  );
}

// function App() {

//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendMessage = async (content: string) => {
//     const userMessage: Message = { role: 'user', content };
//     setMessages(prev => [...prev, userMessage]);
//     setIsLoading(true);

//     try {
//       const response = await getGeminiResponse(content);
//       const assistantMessage: Message = { role: 'assistant', content: response };
//       setMessages(prev => [...prev, assistantMessage]);
//     } catch (error) {
//       console.error('Error:', error);
//       const errorMessage: Message = {
//         role: 'assistant',
//         content: 'Sorry, I encountered an error. Please try again.',
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white border-b">
//         <div className="max-w-3xl mx-auto p-4 flex items-center gap-3">
//           <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
//             <MessageSquare className="w-5 h-5 text-white" />
//           </div>
//           <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
//         </div>
//       </header>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="max-w-3xl mx-auto">
//           {messages.length === 0 ? (
//             <div className="h-full text-2xl mx-10 my-8 flex items-center justify-center text-gray-500">
//               <p>Start a conversation by typing a message below.</p>
//             </div>
//           ) : (
//             messages.map((message, index) => (
//               <ChatMessage key={index} message={message} />
//             ))
//           )}
//           {isLoading && (
//             <div className="p-4 text-center text-gray-500">
//               <div className="animate-pulse">Thinking...</div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Chat Input */}
//       <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
//     </div>
//   );
// }

// export default App;
function EmptyState({ onSelect }: { onSelect: (prompt: string) => void }) {
  const suggestions = [
    { title: 'Write a thank-you note', subtitle: 'to my interviewer' },
    { title: 'Design a database schema', subtitle: 'for an online merch store' },
    { title: 'Help me pick', subtitle: 'a birthday gift for my mom' },
    { title: 'Brainstorm incentives', subtitle: 'for a customer loyalty program' },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
      <div className="w-16 h-16 bg-gradient-to-br from-orange-300 to-orange-400 rounded-2xl flex items-center justify-center mb-6">
        <Bot className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">Tidychat</h2>
      <p className="text-gray-500 mb-8">ChatGPT experience but tidy.</p>
      <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion.title)}
            className="bg-white p-4 rounded-xl border border-gray-200 hover:border-orange-200 hover:shadow-sm transition-all duration-200 text-left">
            <h3 className="font-medium text-gray-900">{suggestion.title}</h3>
            <p className="text-sm text-gray-500">{suggestion.subtitle}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

// Sidebar

function Sidebar() {
  return (
    <div className="w-64 bg-white border-r flex flex-col">
      <div className="p-4">
        <button className="w-full flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors">
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>
      <div className="px-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search a chat..."
            className="w-full pl-9 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="text-sm font-medium text-gray-500 mb-2">FOLDERS</div>
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100">
            Design
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100">
            Content
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100">
            Images
          </button>
        </div>
      </div>
      <div className="p-4 mt-auto border-t">
        <button className="flex items-center gap-2 px-3 py-2 w-full text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
          <Settings className="w-4 h-4" />
          Settings
        </button>
        <button className="flex items-center gap-2 px-3 py-2 w-full text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
          <Headphones className="w-4 h-4" />
          Help & Support
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getGeminiResponse(content);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      {/* <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-300 to-orange-400 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">AI Chat Assistant</h1>
              <p className="text-xs text-gray-500">Powered by Gemini</p>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <button className="w-full text-left px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors">
            + New Chat
          </button>
        </div>
      </div> */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <WelcomeHeader />
        <div className="flex-1 overflow-y-auto">
          {messages.length === 0 ? (
            <EmptyState onSelect={handleSendMessage} />
          ) : (
            <div className="max-w-3xl mx-auto py-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
              {isLoading && (
                <div className="p-4 text-center text-gray-500">
                  <div className="animate-pulse">Thinking...</div>
                </div>
              )}
            </div>
          )}
        </div>
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}
