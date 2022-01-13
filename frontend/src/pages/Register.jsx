import { useState, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { Link as RouteLink } from "react-router-dom"

import { register } from "../actions/userActions"

import { Alert, AlertIcon, Box, Button,Flex, Heading, Input, Link, Spinner, Stack, Text} from '@chakra-ui/react'

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState(null);

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo} = userRegister;

    const location = useLocation();
    const redirect = location.search 
                        ? location.search.split('=')[1]
                        :''

    const navigate = useNavigate();

    useEffect(()=> {
        if(userInfo) {
            navigate(`/${redirect}`)
        }
    }, [userInfo, navigate, redirect])

    const loginFormSubmitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setAlertMessage('Password & Confirm Password dones not match');
            return
        } else {
            setAlertMessage(null);
        }
        dispatch(register(name.trim(), email.trim(), password));
    }

    return (
        <Flex minH={'80vh'} align={'center'} justify={'center'} bg={'gray.50'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={{base:'2xl', md:'4xl'}}>Sign Up for a new Account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Already have an account?
                        <Link color={'blue.400'}
                            as={RouteLink} to='/login'
                        > Login</Link> Instead
                    </Text>
                </Stack>
                <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
                    {error && 
                        <Alert status='error' borderRadius={10} mb={3}>
                            <AlertIcon />
                            <Text>{error}</Text>
                        </Alert>}
                    <form onSubmit={loginFormSubmitHandler}>
                        <Stack spacing={2}>
                            {alertMessage && 
                                <Alert status="warning">
                                    Password & Confirm password are not same
                                </Alert>
                            }
                            <Text>Name</Text>
                            <Input type="name" name='name' id='name' value={name} required
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Text>Email</Text>
                            <Input type="email" name='email' id='email' value={email} required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Text>Password</Text>
                            <Input type="password" name='password' id='password' value={password} required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Text>Confirm Password</Text>
                            <Input type="password" name='confirmPassword' id='confirmPassword' value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} required
                            />
                            <Button type='submit' bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500'}}>
                                Register {loading && <Spinner size='md' />} 
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Register
