import { useEffect, useState } from "react"
import { Button, Center, Container, Divider, Heading, Input, Stack } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate} from 'react-router-dom'

const Shipping = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    
    useEffect(() => {
        if(shippingAddress){
            setAddress(shippingAddress.address);
            setCity(shippingAddress.city)
            setPincode(shippingAddress.pincode)
            setState(shippingAddress.state)   
        }
    }, [shippingAddress])

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address,city, pincode, state}));
        navigate('/payment')
    } 

    return (
        <Container maxW={'container.xl'}>
            <Center pt={10}>
                <Heading>
                    Shipping
                </Heading>
            </Center>
            <Divider/>
            <Center py={3}>
                <form onSubmit={onSubmit}>
                    <Stack spacing={5} width={{base:'xs', md:'md'}} borderWidth={'1px'} p={5} 
                            backgroundColor={'#edf2f7'} borderRadius={10}
                    >
                        <Heading size={'md'}>Enter your address</Heading>
                        <Input placeholder='Address Line 1' maxW={'md'} backgroundColor={'white'} required
                            name='address' id='address' value={address} onChange={e => setAddress(e.target.value)}
                        />
                        <Input placeholder='City' maxW={'md'} backgroundColor={'white'} required
                            name='city' id='city' value={city} onChange={e => setCity(e.target.value)}
                        />
                        <Input placeholder='Pincode' maxW={'md'} backgroundColor={'white'} required
                            name='pincode' id='pincode' value={pincode} onChange={e => setPincode(e.target.value)}
                        />
                        <Input placeholder='State' maxW={'md'} backgroundColor={'white'} required
                            name='state' id='state' value={state} onChange={e => setState(e.target.value)}
                        />
                        <Button type="submit" backgroundColor={'black'} color={'white'} _hover={{bg:'grey'}}>
                            Proceed to Payment
                        </Button>
                    </Stack>
                </form>
            </Center>
        </Container>
    )
}

export default Shipping
