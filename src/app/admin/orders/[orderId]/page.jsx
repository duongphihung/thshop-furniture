"use client"
import React from "react";
import { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import {
    Avatar,
    Card,
    CardContent,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Grid,
    Stack,
    Button
} from "@mui/material";
import Link from 'next/link';
import { formatCurrency } from "@/app/utils/index";
import axios from "axios";

const OrderDetails = ({ params }) => {
    const [order, setOrder] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const id = params.orderId;
    useEffect(() => {
        axios.get(`/api/orders/${id}`)
            .then(function (response) {
                console.log(response.data);
                setOrder(response.data.order);
                setOrderItems(response.data.order.orderItems);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant="h3" sx={{ fontWeight: 600, }}>Order Details</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Stack
                                flexDirection="row"
                                justifyContent="right"
                                alignItems="center"
                            >
                                <Link href="/admin/orders/add">
                                    <Button variant="outlined" startIcon={<AddBoxIcon />}>
                                        Send to GHN
                                    </Button>
                                </Link>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography variant="h6">Payment Method: {order.paymentMethod}</Typography>
                            <Typography variant="h6">Total Price: {formatCurrency(Number(order.totalPrice))}</Typography>
                            <Typography variant="h6">Note: {order.note}</Typography>

                        </Grid>
                        <Grid item xs={6}>
                            {/* <Stack
                                flexDirection="row"
                                justifyContent="right"
                                alignItems="center"
                            >
                                
                            </Stack>
                             */}
                            <Typography variant="h6" sx={{ fontWeight: 600, }}>User: {order.user?.name}</Typography>
                            <Typography variant="h6">Location: {order.location}</Typography>
                            <Typography variant="h6">Phone: {order.phoneNumber}</Typography>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            overflow: {
                                xs: "auto",
                                sm: "unset",
                            },
                        }}
                    >
                        <Table
                            aria-label="simple table"
                            sx={{
                                mt: 3,
                                whiteSpace: "nowrap",
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Id
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Image
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "50%" }}>
                                        <Typography color="textSecondary" variant="h6" >
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Cost
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Quantity
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "50px" }}>
                                        <Typography color="textSecondary" variant="h6">
                                            Status
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orderItems?.map((val, key) => {
                                    return (
                                        <TableRow key={val.product.id}>
                                            <TableCell>
                                                <Typography
                                                    sx={{
                                                        fontSize: "15px",
                                                        fontWeight: "500",
                                                    }}
                                                >
                                                    {key + 1}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    <Avatar
                                                        alt="Wood chair"
                                                        src={val.product.imageUrl}
                                                        sx={{ width: 50, height: 50 }}
                                                    />
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Box>
                                                        <Typography
                                                            variant="h6"
                                                            sx={{
                                                                fontWeight: "600",
                                                            }}
                                                        >
                                                            {val.product.name}
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            sx={{
                                                                fontSize: "13px",
                                                            }}
                                                        >
                                                            {val.product.category.name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {formatCurrency(Number(val.product.price))}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {val.quantity}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    sx={{
                                                        pl: "4px",
                                                        pr: "4px",
                                                        backgroundColor: "success.main",
                                                        color: "#fff",
                                                    }}
                                                    size="small"
                                                    label="Selling"
                                                ></Chip>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}


export default OrderDetails;