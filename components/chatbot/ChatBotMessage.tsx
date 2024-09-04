import './ChatBot.css';

interface ChatBotMessageProps {
    message: string;
}

export function ChatBotMessage({ message }: ChatBotMessageProps) {
    return (
        <div className="question">
            <div className="ali-question">
                <span>{message}</span>
            </div>
        </div>
    );
}