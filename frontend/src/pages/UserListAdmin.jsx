import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getAllUsers } from '../actions/userActions';

import { Alert, Center, Container,  Spinner, Table, TableCaption, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'

const UserListAdmin = () => {
    const dispatch = useDispatch();
    const userList = useSelector(state => state.userList);
    const { loading, users, error} = userList;

    useEffect(()=> {
        dispatch(getAllUsers());
    }, [dispatch])

    if(loading){
        return (
            <Container maxW={'container.xl'} mt={5}>
                <Center>
                    <Spinner size={'xl'}/>
                </Center>
            </Container>
        ) 
    }
    

    return (
        <Container maxW={'container.xl'} mt={5}>
            {error && <Alert status='error'>{error}</Alert>}
            {users && 
                <Table variant='simple' colorScheme='blackAlpha'>
                <TableCaption placement='top'>USER LIST</TableCaption>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>ID</Th>
                    <Th>isAdmin</Th>
                    <Th>Last Updated</Th>
                  </Tr>
                </Thead>
                <Tbody>
                    {users.map( user => (
                        <Tr key={user._id}>
                            <Td>{user.name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user._id}</Td>
                            <Td>{user.isAdmin ? <CheckIcon/> : <CloseIcon/>}</Td>
                            <Td>{user.updatedAt.split('T')[0]}</Td>
                        </Tr>
                    ))}
                </Tbody>
              </Table>
            }
        </Container>
    )
}

export default UserListAdmin
