import React, { ReactElement } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useClipboard } from '@chakra-ui/hooks';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

interface ChatMessageProps {
    message: {
        role: 'user' | 'assistant';
        content: string;
    };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const { role, content } = message;
    const { onCopy, hasCopied } = useClipboard(content);

    const CodeComponent: Components['code'] = ({ className, children }) => {
        const match = /language-(\w+)/.exec(className || '');
        const language = match ? match[1] : '';

        return className ? (
            <Box position="relative">
                <SyntaxHighlighter language={language}>
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
                <Button
                    size="xs"
                    position="absolute"
                    top={2}
                    right={2}
                    onClick={onCopy}
                >
                    {hasCopied ? 'Copied!' : 'Copy'}
                </Button>
            </Box>
        ) : (
            <code className={className}>{children}</code>
        );
    };

    const components: Components = {
        code: CodeComponent
    };

    return (
        <Box
            bg={role === 'user' ? 'blue.50' : 'green.50'}
            p={3}
            my={2}
            borderRadius="md"
            borderLeftWidth={role === 'user' ? '4px' : '0'}
            borderRightWidth={role === 'user' ? '0' : '4px'}
            borderColor={role === 'user' ? 'blue.500' : 'green.500'}
            maxWidth="100%"
            alignSelf={role === 'user' ? 'flex-start' : 'flex-end'}
            shadow="sm"
        >
            <ReactMarkdown components={components}>
                {content}
            </ReactMarkdown>
        </Box>
    );
};

export default ChatMessage;