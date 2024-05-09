// src/app/components/chat/ChatInput.tsx

import React, { useState } from 'react';
import { Input, Button, Flex, useColorModeValue } from '@chakra-ui/react';

interface ChatInputProps {
    onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim() !== '') {
            onSend(message);
            setMessage('');
        }
    };

    const inputBg = useColorModeValue('gray.100', 'gray.700');
    const buttonBg = useColorModeValue('blue.500', 'blue.300');
    const buttonHoverBg = useColorModeValue('blue.600', 'blue.400');

    return (
        <Flex gap="3" mt="5">
            <Input
                flex="1"
                bg={inputBg}
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                size="lg"
                borderRadius="lg"
            />
            <Button
                colorScheme="blue"
                px="10"
                onClick={handleSend}
                disabled={!message.trim()}
                bg={buttonBg}
                _hover={{ bg: buttonHoverBg }}
                size="lg"
                borderRadius="lg"
            >
                Send
            </Button>
        </Flex>
    );
};

export default ChatInput;