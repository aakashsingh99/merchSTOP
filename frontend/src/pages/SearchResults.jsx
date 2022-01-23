import { Alert, AlertIcon, Box, Container, Spinner, Wrap } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductList } from '../actions/productActions';
import ProductCard from '../components/ProductCard';

const SearchPage = () => {
    const {searchTerm} = useParams();
    const dispatch = useDispatch();

    const { loading, error, products} = useSelector(state => state.productList)

    useEffect(()=> {
        dispatch(fetchProductList(searchTerm));
    }, [dispatch, searchTerm])

    if(loading) return (
        <Box display={'flex'} justifyContent={'center'} pt={'12'}>
            <Spinner size='xl' />
        </Box>
    ) 

    return(
        <Container maxW='container.xl' mt={5}>
            {/* <Box my={5} maxW='md'>
                <SearchBox/>
            </Box> */}
            {error && (  <Alert status='error' mt={10} borderRadius={10}>
                            <AlertIcon />
                            {error}
                        </Alert>
                    )
            }
            <Wrap>
                {products.length !== 0   
                            ? products.map(p=> 
                                <ProductCard key={p._id} product={p}/>)
                            : <Box>No Products Found for '{searchTerm}'</Box>
                }    
            </Wrap>
        </Container>
    );
}

export default SearchPage;
