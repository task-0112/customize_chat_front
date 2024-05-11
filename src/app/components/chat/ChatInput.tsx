// src/app/components/chat/ChatInput.tsx

import React, { useState } from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';

interface ChatInputProps {
    onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() !== '') {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === 'Enter' && e.shiftKey) || (e.key === 'Enter' && e.metaKey)) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <HStack spacing={4}>
            <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                size="lg"
                flex="1"
            />
            <Button onClick={handleSend} size="lg" colorScheme="blue">
                Send
            </Button>
        </HStack>
    );
};

export default ChatInput;