import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import ChatRoom from '../components/chat/ChatRoom';

const ChatModalPage = () => {
    const bgColor = 'gray.50'; // 固定の背景色
    const textColor = 'gray.800'; // 固定のテキスト色

    return (
        <Container maxW="container.xl" centerContent p={5}>
            <Box
                bg={bgColor}
                color={textColor}
                w="100%"
                p={4}
                borderRadius="lg"
                boxShadow="xl"
                minHeight="90vh" // ビューポートに合わせた最小高さ
            >
                <ChatRoom />
            </Box>
        </Container>
    );
};

export default ChatModalPage;
