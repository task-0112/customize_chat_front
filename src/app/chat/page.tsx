// src/app/chat/page.tsx

import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import ChatRoom from '../components/chat/ChatRoom';

const ChatModalPage = () => {
    const bgColor = 'gray.100'; // 背景色を少し明るめに
    const textColor = 'gray.800';

    return (
        <Container maxW="container.xl" centerContent py={10}>
            <ChatRoom />
        </Container>
    );
};

export default ChatModalPage;