import { useState } from 'react';
import { API } from '../api/api';

export const useChat = (modelType: number) => {
const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);

const getApiEndpoint = () => {
switch (modelType) {
    case 0:
    return API.NomalChatGptV1;
    case 1:
    return API.NomalChatGptV1;
    default:
    return API.NomalChatGptV1;
}
};

const sendMessage = async (message: string) => {
const newMessage = { role: 'user', content: message };
setMessages((prevMessages) => [...prevMessages, { ...newMessage, role: 'user' }]);

try {
    console.log('送信確認', newMessage);
    const response = await fetch(getApiEndpoint(), {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMessage),
    });

    if (!response.body) throw new Error();

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let assistantMessage = '';

    setMessages((prevMessages) => [
    ...prevMessages,
    { role: 'assistant', content: assistantMessage },
    ]);

    while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');
    for (const line of lines) {
        if (line.startsWith('data: ')) {
        const data = line.slice('data: '.length);
        assistantMessage += data;
        setMessages((prevMessages) => {
            const lastMessage = prevMessages[prevMessages.length - 1];
            if (lastMessage.role === 'assistant') {
            return [
                ...prevMessages.slice(0, -1),
                { ...lastMessage, content: assistantMessage },
            ];
            }
            return prevMessages;
        });
        }
    }
    }
} catch (error) {
    console.error('Error:', error);
}
};

return { messages, sendMessage };
};