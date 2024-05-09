// src/app/components/chat/ChatMessage.tsx

import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface ChatMessageProps {
    message: {
        role: 'user' | 'assistant';
        content: string;
    };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const { role, content } = message;

    return (
        <Text fontSize="lg" color="gray.800" lineHeight="tall">
            {content}
        </Text>
    );
};

export default ChatMessage;