import { useState, useRef } from 'react';
import { API } from '../api/api';

export const useChat = (modelType: number) => {
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const socketRef = useRef<WebSocket | null>(null);

    const getApiEndpoint = () => {
        switch (modelType) {
            case 0:
            case 1:
                return API.NomalChatGptV1;
            case 2:
                return API.NomalChatGeminiV1;
            default:
                return API.NomalChatGptV1;
        }
    };

    const sendMessage = async (message: string) => {
        if (!isGenerating) {
            const newMessage = { role: 'user', content: message, modelType };
            setMessages((prevMessages) => [...prevMessages, { ...newMessage, role: 'user' }]);
            setIsGenerating(true);

            try {
                const socket = new WebSocket(getApiEndpoint());
                socketRef.current = socket;
                socket.onopen = () => {
                    socket.send(JSON.stringify(newMessage));
                };

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    if (data.type === 'assistant') {
                        setMessages((prevMessages) => {
                            const lastMessage = prevMessages[prevMessages.length - 1];
                            if (lastMessage.role === 'assistant') {
                                return [
                                    ...prevMessages.slice(0, -1),
                                    { ...lastMessage, content: data.content },
                                ];
                            }
                            return [...prevMessages, { role: 'assistant', content: data.content }];
                        });
                    }
                
                    if (data.type === 'end') {
                        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                            
                            socketRef.current.close();
                            setIsGenerating(false);
                        }
                    }
                };

                socket.onclose = () => {
                    setIsGenerating(false);
                };

                socket.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    setIsGenerating(false);
                };
            } catch (error) {
                console.error('Error:', error);
                setIsGenerating(false);
            }
        }
    };

    const stopGenerating = () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({ type: 'stop' }));
            setIsGenerating(false);
            socketRef.current.close();
        }
    };

    return { messages, sendMessage, isGenerating, stopGenerating };
};
