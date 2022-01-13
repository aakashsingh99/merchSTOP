import { Alert, AlertIcon, Box, Button, Container, Divider, Heading, StackDivider, Stat, StatLabel, StatNumber, useToast, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom"

import {addToCart, removeFromCart} from '../actions/cartActions'
import CartItem from "../components/CartItem";

const Cart = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const toast = useToast();

    const productId = searchParams.get('productId');
    const quantity  = searchParams.get('quantity');

    const dispatch = useDispatch()

    useEffect(()=> {
        if(productId){
            dispatch(addToCart(productId, quantity));
        }
    }, [dispatch, productId, quantity]);

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    // console.log(cartItems)

    const checkoutHandler = () => {
        navigate('/login?redirect=shipping')
    }

    const deleteCartItem = (id) => {
        dispatch(removeFromCart(id));
        toast({
            title: 'Item removed',
            status: 'success',
            isClosable: true,
        })
    }

    const updateQuantity = (productId, quantity) => {
        dispatch(addToCart(productId, quantity));
        toast({
            title: 'Quantity Updated',
            status: 'success',
            isClosable: true,
        })
    }

    return (
        <Container maxW={'container.xl'}>
            { cartItems && cartItems.length === 0
                ? <Alert status='warning' mt={4}><AlertIcon />Cart Empty</Alert>
                : ( <Box pb={5}>
                        <Heading as='h3' size='md' my={4}>Your Cart</Heading>
                        <Divider/>
                        <Stat my={3} px={5} py={2} shadow='md' maxW={'sm'} borderRadius={'xs'}>
                            <StatLabel>
                                Cart Value ({cartItems.reduce((acc, item) => acc+parseInt(item.quantity), 0)} items):
                            </StatLabel>
                            <StatNumber>
                                Total: ₹ {cartItems.reduce((acc, item) => 
                                                acc+parseFloat(item.quantity)*parseFloat(item.price), 0).toFixed(2)
                                            }   
                            </StatNumber>
                            <Button rounded={'5px'} w={'full'} mt={8} size={'lg'}
                                    py={'7'} bg={'gray.900'} color={'white'}
                                    _hover={{ transform: 'translateY(2px)', boxShadow: 'lg',}}
                                    onClick={checkoutHandler}
                                >
                                Checkout
                            </Button>
                        </Stat>
                    </Box> 
                )
            }
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
            >
                {cartItems.map( item => (
                    <CartItem key={item.product} item={item} deleteCartItem={deleteCartItem}
                        updateQuantity={updateQuantity}
                    />
                ))}
            </VStack>
        </Container>
    )
}

export default Cart
