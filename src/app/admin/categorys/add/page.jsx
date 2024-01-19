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
import axios from "axios";
import FileInput from "@/app/components/fileinput/FileInput";


const initialFormData = {
    name: "",
    description: "",
    icon: "",
};

const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState("");
    const [imagesURL, setImagesURL] = useState("");

    useEffect(() => {
        if (imagesURL.length > 0) {
            setFormData({
                ...formData,
                icon: formData.icon !== "" ? formData.icon : imagesURL,
            });
        }
    }, [imagesURL])


    const inputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        console.log(formData);
        axios.post('/api/categorys', JSON.stringify({ formData }))
            .then(function (response) {
                console.log(response);
                router.push('/admin/categorys');
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
                                        fontWeight: "bold",
                                    }}
                                >
                                    Add category
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
                                    id="default-value"
                                    label="Name category"
                                    variant="outlined"
                                    placeholder="Enter name category"
                                    name="name"
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Description"
                                    name="description"
                                    placeholder="Enter description your category"
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
                                    id="outlined-multiline-static"
                                    label="URL Icon"
                                    name="icon"
                                    placeholder="Enter URL icon for your category"
                                    onChange={inputChange}
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <Typography sx={{ fontWeight: "500" }}>
                                    Upload icon
                                </Typography>
                                <FileInput imagesUrl={imagesURL} setImagesURL={setImagesURL} linkFolderUpload="categorys" multipleUpload={false}/>
                                <Stack
                                    flexDirection="row"
                                    justifyContent="center">
                                    <Button color="primary" onClick={handleSubmit} variant="contained">
                                        Add category
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