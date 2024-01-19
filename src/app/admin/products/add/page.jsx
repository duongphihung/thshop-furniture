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
import "./index.css";

const TextEditor = dynamic(() => {
    return import('@/app/components/editor/TextEditor');
}, { ssr: false });

const initialFormData = {
    name: "",
    price: 0,
    description: "",
    shortDescription: "",
    categoryId: "",
    size: "",
    quantity: "",
    color: "no",
    imageUrl: "",
    images: "",
    placement: "",
    weight: "",
    material: "",
    status: 1,
};

const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState("");
    const [categorys, setCategorys] = useState([]);
    const [category, setCategory] = useState("");
    const [imagesURL, setImagesURL] = useState([]);
    const [desc, setDesc] = React.useState("");

    useEffect(() => {
        axios.get('/api/categorys')
            .then(function (response) {
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
        axios.post('/api/products', JSON.stringify({ formData }))
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
                                    Add product
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
                                    onChange={inputChange}
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
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />

                                <TextEditor initialData='<h1> Enter long description your product </h1>' setDesc={setDesc} />
                                <FileInput setImagesURL={setImagesURL} imagesUrl={imagesURL} />
                                <Stack
                                    flexDirection="row"
                                    justifyContent="center">
                                    <Button color="primary" onClick={handleSubmit} variant="contained">
                                        Add prodcut
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