// src/app/components/chat/ChatModal.tsx

import React, { useState } from 'react';
import { FormControl, FormLabel, Box, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

type Props = {
    onSetModelType: (type: number) => void;
};

const ChatModal: React.FC<Props> = ({ onSetModelType }) => {
    const [selectedModelType, setSelectedModelType] = useState<number>(0);

    const options = [
        { value: 0, label: "比較的低コストで速い回答 (GPT-3.5-turbo)" },
        { value: 1, label: "より賢い回答 (GPT-4-turbo)" },
    ];

    const handleModelTypeChange = (value: number) => {
        setSelectedModelType(value);
        onSetModelType(value);
    };

    return (
        <FormControl>
            <FormLabel htmlFor="model-type-select" fontSize="lg" fontWeight="bold" mb="2">
                モデルタイプを選択
            </FormLabel>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="blue" size="lg" width="full" borderRadius="lg">
                    {options.find(option => option.value === selectedModelType)?.label || "モデルタイプを選択"}
                </MenuButton>
                <MenuList borderRadius="lg" boxShadow="lg">
                    {options.map(option => (
                        <MenuItem key={option.value} onClick={() => handleModelTypeChange(option.value)} fontSize="md" _hover={{ bg: 'blue.50' }}>
                            {option.label}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </FormControl>
    );
};

export default ChatModal;