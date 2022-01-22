import { useEffect, useState } from 'react';
import { Link as RouteLink, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

import { logout, updateUser} from '../actions/userActions'
import { getAllUserOrders } from '../actions/orderActions'

import { Alert, Badge, Box, Button, Container, Divider, Flex, FormControl, FormLabel, Heading, 
        Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, 
        Skeleton, Spinner, Stack, StackDivider, Text, useDisclosure, useToast } 
from "@chakra-ui/react"

import {ArrowRightIcon, CheckIcon, ExternalLinkIcon, SmallCloseIcon, SpinnerIcon} from '@chakra-ui/icons'

const Profile = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast()

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const { success } = userUpdateProfile;

    const userOrderList = useSelector(state => state.ordersUser)
    const { loading: loadingOrders, error: errorOrders, orders } = userOrderList 

    useEffect(()=> {
        if(!userInfo){
            navigate('/login')
        }
        dispatch(getAllUserOrders());
    }, [navigate, userInfo, dispatch])

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/login')
    }

    const updateHandler = (e) => {
        e.preventDefault();
        if(password !=='' && password.length < 6){
            toast({
                title: 'Password should be more than 6 characters',
                status: 'warning',
                isClosable: true
            })
            return
        }
        dispatch(updateUser({id: userInfo._id, name: name.trim(), password}));
        setName('');
        setPassword('');
    }

    if( userInfo === null) {
        return (
            <Container maxW={'container.xl'} pt={5}>
                <Stack>
                    <Skeleton height='40px' />
                    <Skeleton height='80px' />
                </Stack>
            </Container>
        )
    }

    return (
        <Container maxW={'container.xl'} pt={5}>
            <Flex flexDirection={{base:'column', md:'row'}} spacing={10} >
                <Box maxW={'sm'}>
                    <Box>
                        <Heading size='md' mb={5}>My Profile</Heading>
                        <Button onClick={logoutHandler}
                            mb={5} bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500'}}
                        >
                            Logout
                        </Button>
                    </Box>
                    <Divider/>
                    {userInfo && 
                        (<Box p={{base:2, md:5}} borderWidth={'1px'} maxW={'xs'}>
                            {success && <Badge mb={3}>Profile Updated Recently</Badge>}
                            <Stack spacing={{ base: 4, sm: 6 }} direction={'column'} 
                                divider={<StackDivider borderColor={'gray.200'}/>}
                            >
                                <Text>Name: {userInfo.name}</Text>
                                <Text>Email: {userInfo.email}</Text>
                                <Button onClick={onOpen} maxW='xs'
                                    mb={5} bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500'}}
                                >
                                    Update Profile <ArrowRightIcon ml={3}/>
                                </Button>
                            </Stack>
                                <Modal isOpen={isOpen} onClose={onClose} size={'xl'} >
                                <ModalContent backgroundColor={'#f5f5f5'} borderWidth={'1px'} rounded={10}>
                                    <ModalHeader backgroundColor={'black'} color={'white'} borderRadius={'0.5rem 0.5rem 0 0'}>
                                        Update Profile
                                    </ModalHeader>
                                    <ModalCloseButton color={'white'} />
                                    <form onSubmit={updateHandler}>
                                        <ModalBody pb={6}>
                                            <FormControl>
                                                <FormLabel>New Name</FormLabel>
                                                <Input placeholder='Name' type='text'value={name} id='name' 
                                                    onChange={(e)=> setName(e.target.value) }/>
                                            </FormControl>
                                            <FormControl mt={4}>
                                                <FormLabel>New Password</FormLabel>
                                                <Input placeholder='Password' type='password' value={password} id='password'
                                                    onChange={(e)=> setPassword(e.target.value)}/>
                                            </FormControl>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button type='submit' colorScheme='blue' mr={3} onClick={onClose}>
                                                Save
                                            </Button>
                                            <Button onClick={onClose}>Cancel</Button>
                                        </ModalFooter>
                                    </form>
                                    </ModalContent>
                                </Modal>
                        </Box>)
                    }
                </Box>     
                <Box mt={{base:4, md:0}} ml={{base:'', md:'5'}}>
                    <Heading size='md' mb={5}>My Orders</Heading>
                    {loadingOrders && <Spinner/>}
                    {errorOrders && <Alert>{errorOrders}</Alert>}
                    {orders && 
                        <Stack spacing={5} padding={{base:0, md:4}} minW={{base:'', md:'lg'}}
                            divider={<Divider backgroundColor='black'/>}
                        >
                            {orders.map(order => 
                                <Stack key={order._id} boxShadow='md'>
                                    <Box backgroundColor='#edf2f7' p={3}
                                        borderRadius={'0.5rem 0.5rem 0 0'}>
                                        <Link as={RouteLink} to={`/order/${order._id}`}>
                                            Order Id: {order._id} <ExternalLinkIcon ml={2}/>
                                        </Link>
                                    </Box>
                                    <Stack padding={{base:1, md:4}}>
                                        {order.orderItems.map(item => (
                                            <Box key={item._id}>
                                            <Text size={'xs'} minW={{base:'', sm:'xs', md:'md'}} 
                                                fontWeight='bold' isTruncated
                                            >
                                                {item.name} <Badge>x{item.quantity}</Badge>
                                            </Text>
                                            </Box>
                                        ))}
                                        <Divider color='black'/>
                                        <Box color='grey' >
                                            <Text>Total: ₹{order.totalPrice} </Text>
                                            <Text>
                                                Shipped to: {order.shippingAddress.address}, {order.shippingAddress.pincode}
                                            </Text>
                                            <Text>Mode of Payment: {order.isPaid
                                                ? <><CheckIcon/> Paid </>
                                                : <><SpinnerIcon/> Pay on Delivery</>
                                            }</Text>
                                            <Text>{ order.isDelivered
                                                ? <><CheckIcon/> Delivered </>
                                                : <><SmallCloseIcon/> Not Delivered</>   
                                                }
                                            </Text>
                                        </Box>
                                    </Stack>
                                </Stack>)
                            }
                        </Stack>
                    }
                </Box>   
            </Flex>
        </Container>
    )
}

export default Profile
