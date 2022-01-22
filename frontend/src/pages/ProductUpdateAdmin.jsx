import { Box, Button, Center, Container, Heading, Input, InputGroup, InputLeftAddon, Spinner, Stack, Textarea } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../actions/productActions";

const ProductUpdateAdmin = () => {
    const {id} = useParams();

    const [formData,setFormData] = useState({
        name: '',
        description: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0
    });
    const { name, description, brand, category, price, countInStock } = formData
    
    const { loading, product} =  useSelector(state => state.productDetails)

    const { userInfo } = useSelector(state => state.userLogin);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=> {
        if( userInfo && userInfo.isAdmin ){
            dispatch(fetchProductDetails(id));
        } else {
            navigate('/');
        }
    }, [dispatch, userInfo, navigate, id])

    useEffect(()=> {
        if(product){
            Object.keys(product).forEach(key => {
                setFormData(prevState => ({
                    ...prevState,
                    [key] : product[key]
                }))
            })
        }
    }, [product])

    if(loading) {
        return <Center><Spinner/></Center>
    }
    
    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]:e.target.value
        }))
    }

    const populateFields = (e) => {
        if(product){
            Object.keys(product).forEach(key => {
                setFormData(prevState => ({
                    ...prevState,
                    [key] : product[key]
                }))
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProduct(id, formData));
        navigate(`/product/${id}`)
    }

    return (
        <Container maxW='container.xl'>
            <Box my={5}>
                <Button onClick={populateFields}
                    bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500'}}
                > 
                    Populate Previous Data
                </Button>
                <form onSubmit={onSubmit}>
                <Heading size='md' my={5}>Update Product</Heading>
                <Stack maxW='md'>
                    <InputGroup size='md'>
                        <InputLeftAddon children='Name'/>
                        <Input name='name' id='name' value={name} onChange={onChange}
                            placeholder='Product Name' isRequired/>
                    </InputGroup>
                    <InputGroup size='md'>
                        <Textarea id='description' value={description} onChange={onChange}
                            placeholder='Description' isRequired/>
                    </InputGroup>
                    <InputGroup size='md'>
                        <InputLeftAddon children='Brand'/>
                        <Input id='brand' value={brand} onChange={onChange}
                            placeholder='Brand  '  isRequired/>
                    </InputGroup>
                    <InputGroup size='md'>
                        <InputLeftAddon children='Category'/>
                        <Input id='category' value={category} onChange={onChange}
                            placeholder='Category'  isRequired/>
                    </InputGroup>
                    <InputGroup size='md'>
                        <InputLeftAddon children='Price:₹'/>
                        <Input id='price' value={price} type='number' onChange={onChange}
                            placeholder='In rupees' isRequired/>
                    </InputGroup>
                    <InputGroup size='md'>
                        <InputLeftAddon children='Stock'/>
                        <Input id='countInStock' value={countInStock} onChange={onChange}
                            type='number' placeholder='Number in Stock'  isRequired/>
                    </InputGroup>
                    <Button type="submit" mb={5}
                    bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500'}}>
                        Update
                    </Button>
                </Stack>
                </form>
            </Box>
        </Container>
    )
}

export default ProductUpdateAdmin
