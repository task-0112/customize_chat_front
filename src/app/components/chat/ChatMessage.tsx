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
        <Box
            bg={role === 'user' ? 'blue.50' : 'green.50'}
            p={3}
            my={2}
            borderRadius="md"
            borderLeftWidth={role === 'user' ? '4px' : '0'}
            borderRightWidth={role === 'user' ? '0' : '4px'}
            borderColor={role === 'user' ? 'blue.500' : 'green.500'}
            maxWidth="80%"
            alignSelf={role === 'user' ? 'flex-start' : 'flex-end'}
            shadow="sm"
        >
            <Text fontSize="md" color="gray.800">
                {content}
            </Text>
        </Box>
    );
};

export default ChatMessage;
