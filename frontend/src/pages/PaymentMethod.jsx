import { useState } from "react";
import { useDispatch } from "react-redux";

import {savePaymentMethod} from '../actions/cartActions'
import { useNavigate } from "react-router-dom";

import { Button, Center, Container, Divider, Heading, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"

const PaymentMethod = () => {
    const [paymentMethod, setPaymentMethod] = useState('pod');

    const dispatch = useDispatch();

    const navigate = useNavigate()
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/place-order');
    }

    return (
        <Container maxW={'container.xl'}>
        <Center pt={10}>
            <Heading size='md'>
                Choose Payment Method
            </Heading>
        </Center>
        <Divider/>
        <Center py={3}>
                    <Stack spacing={5} width={{base:'xs', md:'md'}} borderWidth={'2px'} p={5} 
                            borderRadius={10} borderColor={'black'}
                    >
                        <form onSubmit={onSubmit}>
                            <RadioGroup onChange={setPaymentMethod} value={paymentMethod}>
                                <Stack>
                                    <Radio value='pod'>Pay On Delivery</Radio>
                                    <Divider/>
                                    <Text>Currently Online Payment Disabled</Text>
                                    <Radio value='razorpay' isDisabled={true}>Razorpay</Radio>
                                </Stack>
                            </RadioGroup>
                            <Center>
                            <Button type="submit" backgroundColor={'black'} color={'white'} 
                                    _hover={{bg:'grey'}} width={'full'} mt={10}>
                                Proceed to Payment
                            </Button>
                            </Center>
                        </form>
                    </Stack>
        </Center>
        </Container>
    )
}

export default PaymentMethod
