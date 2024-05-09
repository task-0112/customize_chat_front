'use client'

import React, { useState } from 'react';
import { Container, VStack, Box, Divider } from '@chakra-ui/react';
import { useChat } from '../../hooks/useChat';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ChatModal from './ChatModal';

const ChatRoom: React.FC = () => {
    const [modelType, setModelType] = useState<number>(0);
    const { messages, sendMessage } = useChat(modelType);

    const handleModelTypeChange = (type: number) => {
        setModelType(type);
    };

    return (
        <Container maxW="container.xl" p={5}>
            <VStack spacing={4} align="stretch">
                <Box>
                    <ChatModal onSetModelType={handleModelTypeChange} />
                </Box>
                <Divider />
                <Box flex="1" overflowY="auto" bg="gray.100" p={3} borderRadius="lg">
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                </Box>
                <Box mt={4}>
                    <ChatInput onSend={sendMessage} />
                </Box>
            </VStack>
        </Container>
    );
};

export default ChatRoom;
