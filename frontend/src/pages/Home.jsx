import React, { useEffect, useState } from 'react'
import {Box, Container, Spinner, useToast, Wrap} from '@chakra-ui/react'
import axios from 'axios'

import ProductCard from '../components/ProductCard'

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true)
    
    const toast = useToast();

    useEffect(()=> {
        const fetchProducts = async() => {
            try{
                const res = await axios.get('/api/products');
                setProducts(res.data);
                setLoading(false);
            }catch(error){
                toast({
                    title: 'Something went wrong',
                    position: 'top-right',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        }
        fetchProducts();
    }, [])

    if(loading) return (
        <Box display={'flex'} justifyContent={'center'} pt={'12'}>
            <Spinner size='xl' />
        </Box>
    )


    return (
        <Container maxW='container.xl' centerContent>
            <Wrap>
                {products.map(p=> 
                <ProductCard key={p._id} product={p}/>)}    
            </Wrap>
        </Container>
    )
}

export default Home
