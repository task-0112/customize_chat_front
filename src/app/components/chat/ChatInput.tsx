// src/app/components/chat/ChatInput.tsx

import React, { useState } from 'react';
import { Textarea, InputGroup, InputRightElement, IconButton, VStack, Box } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import ChatModal from './ChatModal';

interface ChatInputProps {
    onSend: (message: string) => void;
    onSetModelType: (type: number) => void;
    selectedModelType: number;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, onSetModelType, selectedModelType }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() !== '') {
            onSend(input);
            setInput('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        // シフト+エンターまたはコマンド+エンターで送信
        if (e.key === 'Enter' && (e.shiftKey || e.metaKey)) {
            e.preventDefault(); // デフォルトの改行挿入を防ぐ
            handleSend();
        }
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <VStack spacing={0}>
                <InputGroup size="lg">
                    <Textarea
                        pr="4.5rem"  // ボタンのためのパディング
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message..."
                        size="lg"
                        borderRadius="0"
                        border="none"
                        resize="none"
                        _focus={{ outline: 'none', boxShadow: 'none' }}
                        height="45px"
                    />
                    {input.trim() !== '' && (
                        <InputRightElement width="4.5rem">
                            <IconButton
                                aria-label="Send message"
                                icon={<ArrowForwardIcon />}
                                h="1.75rem"
                                size="sm"
                                onClick={handleSend}
                                colorScheme="blue"
                            />
                        </InputRightElement>
                    )}
                </InputGroup>
                <ChatModal onSetModelType={onSetModelType} selectedModelType={selectedModelType} />
            </VStack>
        </Box>
    );
};

export default ChatInput;
