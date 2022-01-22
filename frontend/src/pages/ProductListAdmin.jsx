import {Link as RouteLink, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { DeleteIcon, EditIcon, ExternalLinkIcon, SettingsIcon } from '@chakra-ui/icons'
import { Alert, Button, Center, Container, Link, Spinner, Table, TableCaption, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'
import { deleteProduct, fetchProductList } from '../actions/productActions'

const ProductListAdmin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productList = useSelector(state => state.productList);
    const { loading, products, error} = productList;

    
    const productDelete = useSelector(state => state.productDelete)
    const { loading: deleteLoading, success, error: deleteError} = productDelete;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    useEffect(()=> {
        if( userInfo && userInfo.isAdmin ){
            dispatch(fetchProductList());
        } else {
            navigate('/login');
        }
    }, [dispatch, userInfo, navigate])

    useEffect(()=> {
        if(productDelete){
            if(success){
                dispatch(fetchProductList());
            }
        }
    }, [success, dispatch])

    const deleteProductHandler = (id) => {
        if(window.confirm(`Delete ${id}?`)){
            dispatch(deleteProduct(id))
        }
    }
    return (
        <Container maxW={'container.xl'} mt={5}>
            <Center my={5}>
                <Button mx={5} bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500'}}>
                    <Link as={RouteLink} to='/admin/products/create'>Create a Product</Link>
                </Button>
                <Button mx={5} bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500'}}>
                    <Link as={RouteLink} to='/profile'>Back to Profile</Link>
                </Button>
            </Center>
            <Center>
                {loading && <Alert>Loading Data<Spinner/></Alert>}
                {deleteLoading && <Alert>Deleting<Spinner/></Alert>}
                {success && <Alert>Product Deleted</Alert>}
            </Center>
            {error && <Alert status='error'>{error}</Alert>}
            {deleteError && <Alert status='error'>{deleteError}</Alert>}
            {products && 
                <Table variant='simple' colorScheme='blackAlpha'>
                <TableCaption placement='top'>PRODUCT LIST</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Brand</Th>
                    <Th>Category</Th>
                    <Th>Price</Th>
                    <Th>Stock</Th>
                    <Th><SettingsIcon/> Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                    {products.map( p => (
                        <Tr key={p._id} _hover={{background: '#edf2f7'}}>
                            <Td>{p.name}</Td>
                            <Td>{p.brand}</Td>
                            <Td>{p.category}</Td>
                            <Td>{p.price}</Td>
                            <Td>{p.countInStock}</Td>
                            <Td>
                                <DeleteIcon onClick={()=>deleteProductHandler(p._id)} w={10} h={10} borderRadius={10}
                                    _hover={{backgroundColor:'black', color: 'white'}} padding={2} mr={2}/>
                                <Link as={RouteLink} to={`/product/${p._id}`} >
                                    <ExternalLinkIcon mr={2} w={10} h={10} padding={2} borderRadius={10}
                                        _hover={{backgroundColor:'black', color: 'white'}}/>
                                </Link>
                                <Link as={RouteLink} to={`/admin/products/${p._id}/edit`} >
                                    <EditIcon mr={2} w={10} h={10} padding={2} borderRadius={10}
                                        _hover={{backgroundColor:'black', color: 'white'}}/>
                                </Link>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
              </Table>
            }
        </Container>
    )
}

export default ProductListAdmin
