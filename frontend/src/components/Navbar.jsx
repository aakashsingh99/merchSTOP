import {Link as RouteLink} from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Box, Flex, HStack, Link, IconButton, Stack,
  useDisclosure, useColorModeValue, Avatar, Text, Center, Badge,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import AdminNavbarItems from './AdminNavbarItems';
import SearchBox from './SearchBox';

const Navbar = () => {
  const userLogin = useSelector(state => state.userLogin);
  const {userInfo} = userLogin;

  const {cartItems} = useSelector(state => state.cart);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (<>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          
          <Box>
            <RouteLink to='/'>Merch<strong>STOP</strong></RouteLink>
          </Box>
          <HStack spacing={8} alignItems={'center'}>
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                <SearchBox/>
                {
                  userInfo && userInfo.isAdmin && <AdminNavbarItems/>
                }
                <Link as={RouteLink} to='/cart' px={2} py={1} rounded={'md'}
                    _hover={{textDecoration: 'none', bg:'gray.300'}}
                >
                        Cart { cartItems.length !== 0 && <Badge ml={2} colorScheme='blue'>
                                {cartItems.length}
                              </Badge>
                        }
                </Link>
                <Link as={RouteLink} to={`${userInfo ? '/profile' : '/login'}`}
                    px={2} py={1} rounded={'md'}
                    _hover={{textDecoration: 'none', bg:'gray.300'}} 
                >
                    {userInfo
                          ? (<Center>
                              <Avatar name={userInfo.name} bg='teal.500' size={'sm'}/>
                              <Text pl={2}>{userInfo.name}</Text>
                            </Center>) 
                          : 'Login'
                    }
                </Link>
            </HStack>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
                <SearchBox/>
                <Link as={RouteLink} to='/cart' px={2} py={1} rounded={'md'} href={'#'}
                    _hover={{textDecoration: 'none', bg:'gray.300'}}
                    onClick={isOpen && onClose }
                >
                    Cart
                 </Link>
                <Link as={RouteLink} to={`${userInfo ? '/profile' : '/login'}`} 
                    px={2} py={1} rounded={'md'} href={'#'}
                    _hover={{textDecoration: 'none', bg:'gray.300'}}
                    onClick={isOpen && onClose }
                >
                        {userInfo ? 'My Account' : 'Login'}
                </Link>
                {
                  userInfo && userInfo.isAdmin && <AdminNavbarItems/>
                }
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

export default Navbar;