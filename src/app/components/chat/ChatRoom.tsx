// src/app/components/chat/ChatRoom.tsx

'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Container, VStack, Box, Divider, Flex } from '@chakra-ui/react';
import { useChat } from '../../hooks/useChat';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import ChatModal from './ChatModal';

const ChatRoom: React.FC = () => {
    const [modelType, setModelType] = useState<number>(0);
    const { messages, sendMessage } = useChat(modelType);
    const chatBoxRef = useRef<HTMLDivElement>(null);

    const handleModelTypeChange = (type: number) => {
        setModelType(type);
    };

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <Container maxW="container.xl" py={6}>
            <Flex direction="column" h="70vh">
                <Box mb={4}>
                    <ChatModal onSetModelType={handleModelTypeChange} />
                </Box>
                <Divider borderColor="gray.300" />
                <Box ref={chatBoxRef} flex="1" overflowY="auto" bg="white" p={4} borderRadius="lg" boxShadow="md">
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
                    ))}
                </Box>
                <Box mt={6}>
                    <ChatInput onSend={sendMessage} />
                </Box>
            </Flex>
        </Container>
    );
};

export default ChatRoom;