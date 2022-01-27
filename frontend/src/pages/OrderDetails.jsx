import { useEffect } from 'react'
import { useParams, useSearchParams, Link as RouteLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { getOrderDetails} from '../actions/orderActions'

import { Alert, Badge, Box, Button, Center, Container, Divider, Flex, Heading, Link, Spinner, Stack, Text} from '@chakra-ui/react'
import { ChatIcon, CheckCircleIcon, TimeIcon} from '@chakra-ui/icons'

const OrderDetails = () => {
    const params = useParams();
    const [searchParams,] = useSearchParams();
    const success = searchParams.get('s');

    const dispatch = useDispatch()

    const orderDetails = useSelector(state=> state.orderDetails);
    const { loading, error, order} = orderDetails

    useEffect(() => {
        dispatch(getOrderDetails(params.id));
    }, [dispatch, params.id])

    if(success === 'true'){
        return (
            <Container maxW={'container.lg'}>
                <Box textAlign="center" py={10} px={6}>
                    <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
                    <Heading as="h2" size="xl" mt={6} mb={2}>
                        Order Placed Successfully
                    </Heading>
                    <Center mt={10}>
                        <Stack spacing={5}>
                            <Link as={RouteLink} to='/myorders'>
                                <Button textDecoration={'none'}>
                                    My Orders
                                </Button>
                            </Link>
                            <Link as={RouteLink} to={`/order/${params.id}`} >
                                    Go to order
                            </Link>
                            <Link as={RouteLink} to='/'>
                                    Continue Shopping
                            </Link>
                        </Stack>
                    </Center>
                </Box>
            </Container>
        )
    }

    if(loading) {
        return (
            <Center mt={10}>
                <Spinner size={'xl'}/>
            </Center>
    )}

    return (
        <Container maxW={'container.md'} mt={5}>
            {error 
                ? <Alert status='error'>{error}</Alert>
                : (<Box borderWidth={'1px'} padding={3} borderRadius={10} boxShadow='lg'>
                    <Heading size={'sm'} my={3}>ORDER DETAILS</Heading>
                    <Stack spacing={2} divider={<Divider borderColor={'grey'}/>} mb={5}>
                        <Box backgroundColor='#edf2f7'>
                            <Box margin={5}>
                                <Text fontWeight='bold'>Order Id: {order._id}</Text>
                                <Text>Name: {order.user.name}</Text>
                                <Text>Email: {order.user.email}</Text>
                            </Box>
                        </Box>
                        <Text>{order.isDelivered
                                ? <><CheckCircleIcon mx={2}/>Item Delivered</>
                                : <><TimeIcon mx={2}/>Not yet Delivered</>
                            }
                        </Text>
                        <Stack width={'2xl'} mt={5}>
                            <Heading size={'sm'}>Order Items</Heading>
                            {order.orderItems.map(item => (
                                    <Flex key={item.product} flexDirection={{base:'column', sm:'column', lg:'row'}}
                                        justifyContent={'space-between'}
                                    >
                                        <Box size={'xs'} minW={{base:'100px', sm:'xs', md:'md'}}>
                                            {item.name} <Badge>x{item.quantity}</Badge>
                                        </Box>
                                        <Box fontWeight={'bold'}>
                                            ₹ {(parseFloat(item.price)*parseFloat(item.quantity)).toFixed(2)}
                                        </Box>
                                    </Flex>
                                ))}
                        </Stack>
                        <Box>
                            <Text>Address: {order.shippingAddress.address}, {order.shippingAddress.city},
                                {order.shippingAddress.state} - {order.shippingAddress.pincode}
                            </Text>
                            <Text> Total Price: ₹{order.totalPrice}</Text>
                            <Text> Payment Method: {(order.paymentMethod).toUpperCase()}</Text>
                        </Box>
                        <Box>
                            <Link as={RouteLink} to={`/order/${params.id}/support`} >
                                <Text><ChatIcon mx={2}/>Report Issue</Text>
                            </Link>
                        </Box>
                    </Stack>
            </Box>
            )}
        </Container>
    )
}

export default OrderDetails
