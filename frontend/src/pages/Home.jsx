import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Alert, AlertIcon, Box, Container, Spinner, Wrap} from '@chakra-ui/react'

import { fetchProductList } from '../actions/productActions'
import ProductCard from '../components/ProductCard'

const Home = () => {    
    const dispatch = useDispatch()

    const { loading, error, products} = useSelector(state => state.productList)

    useEffect(() => {
        dispatch(fetchProductList())
    }, [dispatch])

    if(loading) return (
        <Box display={'flex'} justifyContent={'center'} pt={'12'}>
            <Spinner size='xl' />
        </Box>
    ) 

    return (
        <Container maxW='container.xl' centerContent> 
            {error && (  <Alert status='error' mt={10} borderRadius={10}>
                            <AlertIcon />
                            {error}
                        </Alert>
                    )
            }
            <Wrap>
                {products && products.map(p=> 
                <ProductCard key={p._id} product={p}/>)}    
            </Wrap>
        </Container>
    )
}

export default Home
