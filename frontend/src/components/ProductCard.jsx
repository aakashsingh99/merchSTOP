import { StarIcon } from '@chakra-ui/icons'
import { Badge, Box, Image } from '@chakra-ui/react'
import {Link as RouteLink} from 'react-router-dom'


const ProductCard = ({product}) => {
    return (
        <RouteLink to={`/product/${product._id}`}>
            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' >
                <Image src={product.image} alt='product' 
                     fit={'cover'} align={'center'} w={'100%'}
                     h={{ base: '100%', sm: '400px', lg: '500px' }}
                />
                <Box p='6'>
                    <Box display='flex' alignItems='baseline' justifyContent='space-between'>
                        <Badge borderRadius='full' mr='2' colorScheme='teal'>{product.category}</Badge>
                        <Box>
                            {product.brand}
                        </Box>
                    </Box>
                    <Box fontWeight='semibold' as='h4' lineHeight='tight'>
                        {product.name}
                    </Box>
                    <Box>
                        ₹ {product.price}
                    </Box>
                    <Box display='flex' mt='2' alignItems='center'>
                        {Array(5)
                            .fill('')
                            .map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < product.rating ? 'teal.400' : 'gray.300'}
                            />
                            ))}
                        <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                            {product.numReviews} reviews
                        </Box>
                    </Box>
                </Box>
            </Box>
        </RouteLink>
    )
}

export default ProductCard
