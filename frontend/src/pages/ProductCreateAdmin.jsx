import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productActions";
import { Alert, Box, Button, Container, Heading, Input, InputGroup, 
        InputLeftAddon, Spinner, Stack, Textarea } from "@chakra-ui/react"
import { Link} from "react-router-dom";
import axios from "axios";

const ProductCreateAdmin = () => {
    const dispatch = useDispatch();
    const productCreate = useSelector(state => state.productCreate);
    const { loading, product, error} = productCreate;

    const [formData,setFormData] = useState({
        name: '',
        description: '',
        image: '',
        brand: '',
        category: '',
        price: 0,
        countInStock: 0
    });
    const { name,image, description, brand, category, price, countInStock } = formData

    // const [imageInput, setImageInput] = useState('')
    const [uploading, setUploading] = useState(false);


    const onSubmit = (e) => {
        e.preventDefault()
        console.log(formData);
        dispatch(createProduct(formData));
    }

    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState,
            [e.target.id]:e.target.value
        }))
    }

    const fileInputChange = async (e) => {
        const file =  e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);
        try{
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const {data} = await axios.post('/api/upload', formData, config);
            console.log(data);
            setFormData((prevState)=> ({
                ...prevState,
                image:data
            }))
            setUploading(false);
        } catch(error) {
            console.log(error)
            setUploading(false);
        }
    }

    return (
        <Container maxW='container.xl'>
            <Heading size={'md'} my={5}>Create a product</Heading>
            
            <Box maxW='lg'>
                {productCreate 
                    ? loading && <>Creating <Spinner/></> 
                    : error && <Alert status='error'>{error}</Alert>
                }
                {product && <Button my={5}><Link to={`/product/${product._id}`}>Go to Recently made Product</Link></Button>}
                    <form onSubmit={onSubmit}>
                    <Stack>
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
                        <InputGroup size='md'>
                            <InputLeftAddon children='Image'/>
                            <Input id='image' value={image} onChange={onChange}
                                type='text' placeholder='Image URL' />
                        </InputGroup>
                        <InputGroup size='md'>
                            <Input onChange={fileInputChange} type='file'/>
                        </InputGroup>
                        {uploading && <Spinner/>}
                        <Button type="submit" mb={5} name='image'
                        bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500'}}>
                            Add to Database
                        </Button>
                    </Stack>
                </form>  
            </Box>
        </Container>
    )
}

export default ProductCreateAdmin
