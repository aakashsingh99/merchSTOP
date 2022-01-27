import { Container, FormLabel, Input, Stack, Textarea } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const WebToCase = () => {
    const {id} = useParams();
    const {userInfo} = useSelector(state => state.userLogin);

    const navigate = useNavigate();
    useEffect(()=> {
        if(!userInfo){
            navigate('/login');
        }
    }, [userInfo, navigate])

    return <Container maxW='container.lg'>
        <form action="https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8"  method="POST">
            <Stack maxW='md' mt={5} p={2}>
                <Input type='hidden' name="orgid" value="00D5j000006Mqfv"/>
                <Input type='hidden' name="retURL" value="https://merchstop.herokuapp.com/"/>

                <Input  id="00N5j000006iWVn" maxLength="24" name="00N5j000006iWVn" size="20" type="hidden" 
                value={id} />
                
                <FormLabel htmlFor="name">Contact Name</FormLabel>
                <Input  id="name" maxLength="80" name="name" size="20" type="text" required/>
                
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input  id="email" maxLength="80" name="email" size="20" type="email" required/>
                
                <FormLabel htmlFor="subject">Subject</FormLabel>
                <Input  id="subject" maxLength="80" name="subject" size="20" type="text" required/>
                
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea name="description" required></Textarea>
                
                <Input type="submit" name="submit" bgColor='black' color='white'
                    _hover={{bgColor:'grey'}}
                />
            </Stack>
        </form>
    </Container>;
};

export default WebToCase;
