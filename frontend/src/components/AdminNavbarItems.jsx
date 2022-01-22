import React from 'react';
import {Link as RouteLink} from 'react-router-dom'
import { Link } from '@chakra-ui/react';

const AdminNavbarItems = () => {
  return (
        <>
            <Link as={RouteLink} to='/admin/products' px={2} py={1} rounded={'md'}
                _hover={{textDecoration: 'none', bg:'gray.300'}}>
                PRODUCTS
            </Link>
            <Link as={RouteLink} to='/admin/users' px={2} py={1} rounded={'md'}
                _hover={{textDecoration: 'none', bg:'gray.300'}}>
                USERS
            </Link>
            <Link as={RouteLink} to='/admin/orders' px={2} py={1} rounded={'md'}
                _hover={{textDecoration: 'none', bg:'gray.300'}}>
                ORDERS
            </Link>
        </>
  )
};

export default AdminNavbarItems;
