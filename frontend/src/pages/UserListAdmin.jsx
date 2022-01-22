import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom'
import { deleteUser, getAllUsers } from '../actions/userActions';

import { Alert, Center, Container,  Spinner, Table, TableCaption, Tbody, Td, Th, Thead, toast, Tr, useToast} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, DeleteIcon, SettingsIcon } from '@chakra-ui/icons'

const UserListAdmin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [alertMessage, setAlertMessage] = useState(null);

    const userList = useSelector(state => state.userList);
    const { loading, users, error} = userList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector(state => state.userDelete);
    const { loading: deleteLoading, success, error: deleteError} = userDelete;

    useEffect(()=> {
        if( userInfo && userInfo.isAdmin ){
            dispatch(getAllUsers());
        } else {
            navigate('/login');
        }
    }, [dispatch, userInfo, navigate])
    
    useEffect(()=> {
        if(userDelete){
            if(success){
                dispatch(getAllUsers());
            } else if(deleteError){
                setAlertMessage(deleteError);
            }
        }
    }, [success])


    const deleteUserHandler = (id) => {
        if(window.confirm(`Delete ${id}?`)){
            dispatch(deleteUser(id));
        }
    }

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
            {deleteError && <Alert status='error'>{deleteError}</Alert>}
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
                    <Th><SettingsIcon/> Actions</Th>
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
                            <Td><DeleteIcon onClick={()=>deleteUserHandler(user._id)}/></Td>
                        </Tr>
                    ))}
                </Tbody>
              </Table>
            }
        </Container>
    )
}

export default UserListAdmin
