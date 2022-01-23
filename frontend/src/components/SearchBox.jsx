import { SearchIcon } from '@chakra-ui/icons';
import { Button, HStack, Input } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search/${searchTerm}`)
    }

    return <>
        <form>
            <HStack>
                <Input placeholder='Search Products' value={searchTerm} 
                    variant='flushed'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type='submit' onClick={e => handleSearch(e)}>
                    <SearchIcon/>
                </Button>
            </HStack>
        </form>
    </>;
};

export default SearchBox;
