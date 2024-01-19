"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    RadioGroup,
    Radio,
    FormControl,
    MenuItem,
    Input,
    Select

} from "@mui/material";
import Stack from '@mui/material/Stack';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ChipsArray from "@/app/components/admin/ChipArray";
import FileInput from "@/app/components/fileinput/FileInput";
import axios from "axios";
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';

const TextEditor = dynamic(() => {
    return import('@/app/components/editor/TextEditor');
}, { ssr: false });

const initialFormData = {
    id: "",
    name: "",
    price: 0,
    description: "",
    shortDescription: "",
    categoryId: "",
    size: "",
    quantity: "",
    brand: "",
    other: "",
    color: "",
    imageUrl: "",
    images: "",
    placement: "",
    weight: "",
    material: "",
};

const UserForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const id = searchParams.get('id');
    const [formData, setFormData] = useState(initialFormData);
    const [data, setData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState("");
    const [categorys, setCategorys] = useState([]);
    const [category, setCategory] = useState("");
    const [imagesURL, setImagesURL] = useState([]);
    const [imgURL, setImgURL] = useState([]);
    const [desc, setDesc] = React.useState("");

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(function (response) {
                setData(response.data.product);
                setCategory(response.data.product.categoryId);
                setFormData(response.data.product);
                setImgURL(JSON.parse(response.data.product.images));
            })
            .catch(function (error) {
                console.log(error);
            });
        setFormData((prevState) => ({
            ...prevState,
            id: id,
        }));
    }, [id]);

    useEffect(() => {
        axios.get('/api/categorys')
            .then(function (response) {
                // setCategory(response.data.categorys[0].id);
                setCategorys(response.data.categorys);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            description: desc,
        }));
    }, [desc]);

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
        setFormData({
            ...formData,
            categoryId: event.target.value,
        });
    };

    const inputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (imagesURL.length > 0) {
            setFormData({
                ...formData,
                imageUrl: imagesURL[0],
                images: JSON.stringify(imagesURL),
            });
        }
    }, [imagesURL])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        console.log(formData);
        axios.put('/api/products', JSON.stringify({ formData }))
            .then(function (response) {
                router.push('/admin/products');
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <Grid container spacing={0}>
            <Grid item lg={12} md={12} xs={12}>
                <div>
                    {/* ------------------------------------------------------------------------------------------------ */}
                    {/* Basic Checkbox */}
                    {/* ------------------------------------------------------------------------------------------------ */}
                    <Card
                        variant="outlined"
                        sx={{
                            p: 0,
                        }}
                    >
                        <Box
                            sx={{
                                padding: "15px 30px",
                            }}
                            display="flex"
                            alignItems="center"
                        >
                            <Box flexGrow={1}>
                                <Typography
                                    sx={{
                                        fontSize: "18px",
                                        fontWeight: "500",
                                    }}
                                >
                                    Edit product
                                </Typography>
                            </Box>
                        </Box>
                        <Divider />
                        <CardContent
                            sx={{
                                padding: "30px",
                            }}
                        >
                            <form encType="multipart/form-data">
                                <TextField
                                    fullWidth
                                    id="standard-select-number"
                                    variant="outlined"
                                    name="categoryId"
                                    select
                                    placeholder="Choose category"
                                    label="Category"
                                    value={category}
                                    onChange={handleChangeCategory}
                                    sx={{
                                        mb: 2,
                                    }}
                                >
                                    {categorys.map((option, key) => (
                                        <MenuItem key={key} value={option.id}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    id="default-name"
                                    label="Name product"
                                    variant="outlined"
                                    placeholder="Enter name product"
                                    name="name"
                                    defaultValue={data.name}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="default-size"
                                    label="Size"
                                    variant="outlined"
                                    placeholder="Enter size product"
                                    name="size"
                                    defaultValue={data.size}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="default-weight"
                                    label="Weigth"
                                    variant="outlined"
                                    placeholder="Enter weight product"
                                    name="weight"
                                    defaultValue={data.weight}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="default-material"
                                    label="Material"
                                    variant="outlined"
                                    placeholder="Enter material product"
                                    name="material"
                                    defaultValue={data.material}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="default-brand"
                                    label="Brand"
                                    variant="outlined"
                                    placeholder="Enter brand product"
                                    name="brand"
                                    defaultValue={data.brand}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="default-placement"
                                    label="Placement product"
                                    variant="outlined"
                                    placeholder="Enter placement product"
                                    name="placement"
                                    defaultValue={data.placement}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    prefix="$"
                                    id="cost-product-text"
                                    label="Cost product"
                                    name="price"
                                    type="number"
                                    defaultValue={data.price}
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="color-input"
                                    label="Color"
                                    name="color"
                                    type="text"
                                    defaultValue={data.color}
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="quantity-input"
                                    label="Quantity"
                                    type="number"
                                    name="quantity"
                                    defaultValue={data.quantity}
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="short-description"
                                    label="Short description"
                                    name="shortDescription"
                                    placeholder="Enter short description your product"
                                    defaultValue={data.shortDescription}
                                    onChange={inputChange}
                                    InputLabelProps={{ shrink: true }}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />

                                <TextField
                                    id="default-other"
                                    label="Note"
                                    variant="outlined"
                                    placeholder="Enter note product"
                                    name="other"
                                    defaultValue={data.other}
                                    InputLabelProps={{ shrink: true }}
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextEditor initialData={data.description} setDesc={setDesc} />
                                <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                                    Images uploaded
                                </Typography>
                                {imgURL.length > 0 ?
                                    <div className="kb-attach-box mb-3" style={{ display: "flex" }} >
                                        {
                                            imgURL.map((url, index) => {

                                                return (
                                                    <div className="file-atc-box" key={index} style={{ margin: "8px" }}>
                                                        {
                                                            <div className="file-image"> <img src={url} alt={data.name + "_" + index} /></div>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <div className="kb-attach-box mb-3" style={{ display: "flex" }} >
                                        <div className="file-atc-box" style={{ margin: "8px" }}>
                                            <div className="file-image"> <img src={data.imageUrl} alt={data.name + "_" + data.id} /></div>
                                        </div>
                                    </div>}

                                <Typography sx={{ fontSize: "16px", fontWeight: "500" }}>
                                    Images
                                </Typography>
                                <FileInput setImagesURL={setImagesURL} imagesUrl={imagesURL} />
                                <Stack
                                    flexDirection="row"
                                    justifyContent="center">
                                    <Button color="primary" onClick={handleSubmit} variant="contained">
                                        Update product
                                    </Button>
                                </Stack>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </Grid>
        </Grid>
    );
};

export default UserForm;