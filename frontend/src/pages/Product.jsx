import { useEffect, useState } from "react";
import { createSearchParams, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { fetchProductDetails } from "../actions/productActions";

import { StarIcon, WarningIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Box, Button, Container, Flex, Heading, Image, 
        Select, 
        SimpleGrid, Spinner, Stack, StackDivider, Text } from "@chakra-ui/react"

const Product = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);

    const { loading, product, error} =  useSelector(state => state.productDetails)

    useEffect(()=> {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id])

    const addToCartHandler = (e) => {
        navigate({
            pathname: '/cart',
            search: `?${createSearchParams({
                productId: id,
                quantity: quantity
            })}`
        });            
    }

    if(loading) return (
        <Box display={'flex'} justifyContent={'center'} pt={'12'}>
            <Spinner size='xl' />
        </Box>
    )

    if(error) return (
        <Container maxW='container.xl' >
            <Alert status='error' mt={10} borderRadius={10}>
                <AlertIcon />
                ERROR: {error}
            </Alert>    
        </Container>
    )

    return (
        <>
            {   product && (<Container maxW='container.xl' >
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 8, md: 10 }} py={{ base: 6, md: 10 }}>
                    <Flex>
                        <Image src={product.image} alt="ProductImg" 
                            rounded={'md'} fit={'cover'} align={'center'} w={'100%'}
                            h={{ base: '100%', sm: '400px', lg: '500px' }}
                        />
                    </Flex>
                    <Stack spacing={{ base: 6,md: 10}}>
                        <Box as={'header'}>
                            <Heading lineHeight={1.1} fontWeight={600} fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                    {product.name}
                            </Heading>
                            <Text color={'gray.900'} fontWeight={300} fontSize={'2xl'}>
                                    {product.brand}
                            </Text>
                        </Box>
                        <Stack spacing={{ base: 4, sm: 6 }} direction={'column'} 
                            divider={<StackDivider borderColor={'gray.200'}/>}
                        >
                            <Box>
                                {product.description}
                            </Box>
                            <Box>
                                Price: ₹{product.price}
                            </Box>
                            <Box>
                                Category: {product.category}
                            </Box>
                            <Box display='flex' mt='2' alignItems='center'>
                                <Text pr={2} fontWeight={600}>Rating:</Text>
                                    {Array(5)
                                        .fill('')
                                        .map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                color={i < product.rating ? 'teal.400' : 'gray.300'}
                                            />
                                        ))}
                                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                        {product.numReviews} reviews
                                    </Box>
                            </Box>
                        </Stack>
                        {
                            product.countInStock > 0
                            && (<Select placeholder="Select Quantity" 
                                    value={quantity} size={'lg'}
                                    onChange={(e) => setQuantity(e.target.value)}
                                >
                                    {[...Array(product.countInStock).keys()].map(qty=>
                                        (<option key={qty+1}>{qty+1}</option>)    
                                    )}
                                </Select>)
                        }
                        <Button onClick={addToCartHandler}
                            rounded={'none'} w={'full'} mt={8} size={'lg'}
                            py={'7'} bg={'gray.900'}
                            color={'white'} textTransform={'uppercase'}
                            _hover={{ transform: 'translateY(2px)', boxShadow: 'lg',}}
                            disabled={product.countInStock < 1}
                        >
                            {product.countInStock > 0 
                                ? 'Add to cart'
                                : (<Stack direction="row" alignItems="center" justifyContent={'center'}>
                                    <WarningIcon/>
                                    <Text>Out of Stock</Text>
                                    </Stack>
                            )}
                        </Button>
                    </Stack>
                </SimpleGrid>
            </Container>)}
        </>
    )
}

export default Product
