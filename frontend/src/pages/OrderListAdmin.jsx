import {  CheckCircleIcon, CheckIcon, DeleteIcon,  SettingsIcon } from "@chakra-ui/icons"
import { Alert,Button, Center, Container, Link, Spinner,
        Table, TableCaption, Tbody, Td, Th, Thead, Tr,  } from "@chakra-ui/react"
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouteLink, useNavigate } from "react-router-dom"
import { getAllOrders, markDelivered } from "../actions/orderActions";

const OrderListAdmin = () => {    
    const { loading, orders, error} = useSelector(state => state.ordersAll);

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=> {
        if( userInfo && userInfo.isAdmin ){
            dispatch(getAllOrders());
        } else {
            navigate('/');
        }
    }, [dispatch, userInfo, navigate])

    const deleteOrderHandler = (id) => {
        console.log('deleting')
    }

    const { success } = useSelector(state => state.orderDeliver);
    useEffect(()=> {
        if(success){
            dispatch(getAllOrders());
        }
    }, [success, dispatch])

    const markOrderDelivered = (id) => {
        dispatch(markDelivered(id));
    }

    return (
        <Container maxW={'container.xl'} mt={5}>
            <Center my={5}>
                <Button mx={5} bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500'}}>
                    <Link as={RouteLink} to='/profile'>Back to Profile</Link>
                </Button>
            </Center>
            <Center>
                {loading && <Alert>Loading Data<Spinner/></Alert>}
            </Center>
            {error && <Alert status='error'>{error}</Alert>}
            {orders && 
                <Table variant='simple' colorScheme='blackAlpha'>
                <TableCaption placement='top'>ORDER LIST</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Order Id</Th>
                    <Th>User Name</Th>
                    <Th>Delivered Status</Th>
                    <Th>Total Price</Th>
                    <Th>Paid</Th>
                    <Th><SettingsIcon/> Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                    {orders.map( o => (
                        <Tr key={o._id} _hover={{background: '#edf2f7'}}>
                            <Td>{o._id}</Td>
                            <Td>{o.user.name}</Td>
                            <Td>{o.isDelivered? 'Delivered': 'Not delivered'}</Td>
                            <Td>{o.totalPrice}</Td>
                            <Td>{o.isPaid ? 'Paid' : 'Not Paid'}</Td>
                            <Td>
                                <DeleteIcon onClick={()=>deleteOrderHandler(o._id)} w={10} h={10} borderRadius={10}
                                    _hover={{backgroundColor:'black', color: 'white'}} padding={2} mr={2}/>
                                {!o.isDelivered ? <CheckIcon onClick={()=>markOrderDelivered(o._id)} 
                                    w={10} h={10} borderRadius={10}
                                    _hover={{backgroundColor:'black', color: 'white'}} padding={2} mr={2} 
                                />
                                : <CheckCircleIcon w={10} h={10} borderRadius={10} color='green'
                                     padding={2} mr={2}
                                />
                                }
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
              </Table>
            }
        </Container>
    )
}

export default OrderListAdmin
