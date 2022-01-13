import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { Alert, Badge, Box, Button, Center, Container, Divider, Flex, Heading, Skeleton, Stack, Text} from "@chakra-ui/react"
import { createNewOrder } from "../actions/orderActions"

const PlaceOrder = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const { cartItems, shippingAddress, paymentMethod} = cart

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error} = orderCreate

    useEffect(()=> {
        if(cartItems.length === 0){
            navigate('/cart');
        } else if(!shippingAddress){
            navigate('/shipping');
        } else if(!paymentMethod){
            navigate('/payment')
        }
    })

    

    let cartPrice = 0;
    let shippingCharges = 0;
    let totalPrice = 0;
    if(cartItems.length !==0 ){
        cartPrice = cartItems.reduce((acc, item) => 
                                    acc+parseFloat(item.quantity)*parseFloat(item.price), 0).toFixed(2)
        let no_items = cartItems.reduce((acc, item) => acc + parseInt(item.quantity),0).toFixed(2)
        shippingCharges = no_items > 3 ? 0 : 50;
        totalPrice = parseFloat(cartPrice) + parseFloat(shippingCharges);
    }

    const placeOrderHandler = () => {
        dispatch(createNewOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            shippingPrice: shippingCharges,
            totalPrice: totalPrice
        }))
        if(order.paymentMethod === 'paypal'){
            navigate('pay');
        }
    }


    useEffect(()=> {
        if(success && order){
            navigate(`/order/${order._id}`)
        }
    }, [navigate, success, order])

    if(cartItems.length === 0){
        return(<Stack>
            <Skeleton height={'50px'}/>
            <Skeleton height={'100px'}/>
        </Stack>)
    }

    return (
        <Container maxW={'container.md'} mt={10}>
            {error && <Alert>{error}</Alert>}
            <Stack spacing={4} divider={<Divider borderColor={'black'}/>}>
                <Heading size={'md'}>Cart Summary</Heading>
                <Flex justifyContent={'start'} alignItems={'center'}>
                    <Heading size={'xs'} mr={10}>PAYMENT</Heading>
                    {paymentMethod && <Text>MODE: {paymentMethod.toUpperCase()}</Text>}
                </Flex>
                <Flex justifyContent={'start'} alignItems={'center'}>
                    <Heading size={'xs'} mr={10}>ADDRESS</Heading>
                    {shippingAddress && 
                        <Box>
                            <Text>{shippingAddress.address}, {shippingAddress.city}</Text>
                            <Text>{shippingAddress.state} - {shippingAddress.pincode}</Text>
                        </Box>
                    }
                </Flex>
                <Box borderWidth={'1px'} px={{base:3, md:5}} py={5} borderRadius={10} borderColor={'grey'}>
                    <Center> CART ITEMS: </Center>
                    <Divider my={2} borderColor={'grey'}/>
                    <Stack spacing={2} divider={<Divider borderColor={'grey'}/>} >
                        <Flex flexDirection={{base:'column', sm:'column', lg:'row'}} 
                            justifyContent={'space-evenly'} display={{base:'none', sm:'flex'}}
                        >
                            <Text fontWeight={'bold'} size={'xs'} minW={{base:'', sm:'xs', md:'md'}}>
                                Product
                            </Text>
                            <Box fontWeight={'bold'}>
                                Qty. price
                            </Box>
                            <Text fontWeight={'bold'}>
                                SubTotal
                            </Text>
                        </Flex>
                        {cartItems.map(item => (
                            <Flex key={item.product} flexDirection={{base:'column', sm:'column', lg:'row'}}
                                justifyContent={'space-evenly'}
                            >
                                <Text size={'xs'} minW={{base:'', sm:'xs', md:'md'}}>
                                    {item.name} <Badge>x{item.quantity}</Badge>
                                </Text>
                                <Box display={{base:'none', sm:'block'}}>
                                    ₹ {item.price}
                                </Box>
                                <Box fontWeight={'bold'}>
                                    ₹ {(parseFloat(item.price)*parseFloat(item.quantity)).toFixed(2)}
                                </Box>
                            </Flex>
                        ))}
                    </Stack>
                </Box>
            </Stack>
            <Box mt={5}>
                <Text> Order Amount: {totalPrice}</Text>
                <Text> Shipping: {shippingCharges === 0 ? 'Free': '₹ 50'}</Text>
                <Text> Final Price: {totalPrice}</Text>
            </Box>
            <Center mt={5}>
                <Button backgroundColor={'black'} color={'white'} _hover={{bg:'grey'}} width={'full'}
                    onClick={placeOrderHandler}
                >
                    {paymentMethod === 'paypal' 
                        ? `Proceed to Pay Rs${totalPrice}`
                        :  'Place Order'
                    }
                </Button>
            </Center>
        </Container>
    )
}

export default PlaceOrder
