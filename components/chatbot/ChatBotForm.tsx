import { useState, ChangeEvent, FormEvent } from 'react';
import './ChatBot.css';

interface ChatBotFormProps {
    onSendMessage: (message: string) => void;
}

export function ChatBotForm({ onSendMessage }: ChatBotFormProps) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue('');
        }
    };

    return (
        <form id="ali-form" onSubmit={handleSubmit}>
            <textarea
                className="ask-ali-textarea-2"
                id="text_generate"
                value={inputValue}
                onChange={handleChange}
                placeholder="Ask something here..."
            />
            <button
                type="submit"
                className="ask-ali-btn-2"
                disabled={!inputValue.trim()}
            >
                <i id="generateIcon"></i>
            </button>
        </form>
    );
}