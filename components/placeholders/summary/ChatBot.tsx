import React from 'react';

interface ChatBotProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="w-1/3 h-screen bg-gray-100 shadow-lg p-6 border-l border-solid border-zinc-300 flex flex-col justify-between">
            {/* Chatbot Header with Close Button */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Chatbot</h3>
                <button
                    onClick={onClose}
                    className="text-red-500 text-sm font-bold"
                >
                    Close
                </button>
            </div>

            {/* Message Container */}
            <div className="flex-1 overflow-y-auto">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <p className="text-gray-800">
                        <strong>Ali:</strong> Hi, I am Ali, your study analysis partner. Feel free to ask me any questions about the conclusions.
                    </p>
                </div>
            </div>

            {/* Input Field and Send Button */}
            <div className="mt-4 flex items-center">
                <input
                    type="text"
                    placeholder="Ask Ali about these conclusions"
                    className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-200"
                />
                <button
                    className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBot;