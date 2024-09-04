"use client";

import { ChatBotForm } from './ChatBotForm';
import { ChatBotMessage } from './ChatBotMessage';
import { useState } from 'react';
import './ChatBot.css';

export default function ChatBot() {
    const [messages, setMessages] = useState<string[]>([]);

    const handleSendMessage = (message: string) => {
        setMessages([...messages, message]);
    };

    return (
        <div className="dashboard-card ali">
            <div className="askali-container">
                <div className="askali">
                    {messages.length === 0 && (
                        <img
                            src="/img/ali-text.svg"
                            alt="Chatbot"
                            className="main-ali img-fluid"
                        />
                    )}
                    {messages.map((message, index) => (
                        <ChatBotMessage key={index} message={message} />
                    ))}
                </div>
                <ChatBotForm onSendMessage={handleSendMessage} />
            </div>
        </div>
    );
}