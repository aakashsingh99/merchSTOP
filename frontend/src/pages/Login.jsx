import { useState, useEffect } from "react"
import { useLocation, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { Link as RouteLink } from "react-router-dom"

import { login } from "../actions/userActions"

import { Alert, AlertIcon, Box, Button, CloseButton, Flex, Heading, Input, Link, Spinner, Stack, Text} from '@chakra-ui/react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const userLogin = useSelector(state => state.userLogin);
    const { loading, userInfo, error} = userLogin;

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
        dispatch(login(email, password));
    }

    return (
        <Flex minH={'80vh'} align={'center'} justify={'center'} bg={'gray.50'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={{base:'2xl', md:'4xl'}}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        Don't have an account?
                        <Link color={'blue.400'}
                            as={RouteLink} to='/register'
                        > Register</Link> Instead
                    </Text>
                </Stack>
                <Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
                    {error && <Alert status='error' borderRadius={10} mb={3}>
                        <AlertIcon />
                        <Text>{error}</Text>
                        <CloseButton position='absolute' right='8px' top='8px' />
                    </Alert>}
                    <form onSubmit={loginFormSubmitHandler}>
                        <Stack spacing={2}>
                            <Text>Email</Text>
                            <Input type="email" name='email' id='email' value={email} required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Text>Password</Text>
                            <Input type="password" name='password' id='password' value={password} 
                                onChange={(e) => setPassword(e.target.value)} required
                            />
                            {/* <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} 
                                justify={'space-between'}
                                >
                                <Link color={'blue.400'}>Forgot password?</Link>
                            </Stack> */}
                            <Button type='submit' bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500'}}>
                                Login {loading && <Spinner size='md' />} 
                            </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    )
}

export default Login
