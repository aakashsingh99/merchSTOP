import { DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Image, Select, Spacer, Text } from "@chakra-ui/react"

const CartItem = ({item, deleteCartItem, updateQuantity}) => {

    // const [quantity, setQuantity] = useState(item.quantity);

    return (
        <Box p={5} shadow='md' borderWidth='1px' >
            <Flex justifyContent={'center'} alignItems={'center'} 
                flexDirection={{base:'column', sm:'column', lg:'row'}}
            >
                <Flex justifyContent={'center'} alignItems={'center'}>
                    <Image src={item.image} borderRadius={10} boxSize={{base:'100px', sm:'150px'}}/>
                    <Heading size={'md'} mx={{base:3, md:10}} minW={{base:'', sm:'xs', md:'md'}}>
                        {item.name}
                    </Heading>
                </Flex>
                <Spacer/>
                <Flex justifyContent={'center'} alignItems={'center'} 
                        flexDirection={'row'}
                        pt={4} minW={{base:'', sm:'xs' }}
                >
                    <Select width='100px'
                                        value={item.quantity} size={'sm'}
                                        onChange={(e) => updateQuantity(item.product, e.target.value)}
                                    >
                                        {[...Array(item.countInStock).keys()].map(qty=>
                                            (<option key={qty+1}>{qty+1}</option>)    
                                        )}
                    </Select>
                    <Text px={5}>₹ {item.price}</Text>
                    <Spacer/>
                    <DeleteIcon onClick={() => deleteCartItem(item.product)}/>
                </Flex>
            </Flex>
        </Box>
    )
}

export default CartItem
