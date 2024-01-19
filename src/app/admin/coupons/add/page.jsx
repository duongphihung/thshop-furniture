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


const initialFormData = {
    code: "",
    quantity: 1,
    description: "",
    coupon: "",
    dateStart: "",
    dateEnd: "",
    status: 0,
};

const UserForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);
    const [errorMessage, setErrorMessage] = useState("");


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
        axios.post('/api/coupons', JSON.stringify({ formData }))
            .then(function (response) {
                console.log(response);
                router.push('/admin/coupons');
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
                                    Add Coupon
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
                                    label="Code coupon"
                                    variant="outlined"
                                    placeholder="Enter code"
                                    name="code"
                                    type="text"
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="default-value"
                                    label="Quantity coupon"
                                    variant="outlined"
                                    placeholder="Enter quantity coupon"
                                    name="quantity"
                                    onChange={inputChange}
                                    type="number"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="default-value"
                                    label="Coupon Rate"
                                    variant="outlined"
                                    placeholder="Enter coupon"
                                    name="coupon"
                                    onChange={inputChange}
                                    type="number"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="default-value"
                                    label="Description coupon"
                                    variant="outlined"
                                    placeholder="Enter description coupon"
                                    name="description"
                                    rows={3}
                                    multiline
                                    onChange={inputChange}
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Date Start"
                                    name="dateStart"
                                    placeholder="Enter date start"
                                    onChange={inputChange}
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                    type="datetime-local"
                                    fullWidth
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Date End"
                                    name="dateEnd"
                                    placeholder="Enter date end"
                                    onChange={inputChange}
                                    InputLabelProps={{ shrink: true }}
                                    variant="outlined"
                                    fullWidth
                                    type="datetime-local"
                                    sx={{
                                        mb: 2,
                                    }}
                                />
                                <Stack
                                    flexDirection="row"
                                    justifyContent="center">
                                    <Button color="primary" onClick={handleSubmit} variant="contained">
                                        Add coupons
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