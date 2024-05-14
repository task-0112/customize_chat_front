// src/app/components/chat/ChatModal.tsx

import React from 'react';
import { FormControl, Menu, MenuButton, MenuList, MenuItem, Button, Portal, Box, Flex } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

type Props = {
    onSetModelType: (type: number) => void;
    selectedModelType: number;
};

const ChatModal: React.FC<Props> = ({ onSetModelType, selectedModelType }) => {
    const options = [
        { value: 0, label: "GPT-3.5" },
        { value: 1, label: "GPT-4" },
        { value: 2, label: "GeminiPro-1.5" }
    ];

    return (
        <FormControl>
            <Menu placement="top">
                <MenuButton
                    as={Button}
                    variant="ghost"
                    size="lg"
                    width="full"
                    borderRadius="lg"
                    textAlign="left"
                    maxWidth="15%"
                >
                    <Flex alignItems="center" justifyContent="space-between">
                        <Box flex="1" textAlign="left" mr={2}>
                            {options.find(option => option.value === selectedModelType)?.label || "モデルタイプを選択"}
                        </Box>
                        <Box>
                            <ChevronDownIcon />
                        </Box>
                    </Flex>
                </MenuButton>
                <Portal>
                    <MenuList borderRadius="lg" boxShadow="lg">
                        {options.map(option => (
                            <MenuItem key={option.value} onClick={() => onSetModelType(option.value)} fontSize="md">
                                {option.label}
                            </MenuItem>
                        ))}
                    </MenuList>
                </Portal>
            </Menu>
        </FormControl>
    );
};

export default ChatModal;