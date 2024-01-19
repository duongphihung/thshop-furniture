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

import TableMenu from './TableMenu';

const Orders = () => {
    const [data, setData] = useState({});
    const [orders, setOrders] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchOrders = () => {
        fetch('/api/orders')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
                setOrders(data.orders);
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant="h3">Order management</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Stack
                                flexDirection="row"
                                justifyContent="right"
                                alignItems="center"
                            >
                                {/* <Link href="/admin/products/add">
                                    <Button variant="outlined" startIcon={<AddBoxIcon />}>
                                        Add product
                                    </Button>
                                </Link> */}
                            </Stack>
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
                                            User
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "50%" }}>
                                        <Typography color="textSecondary" variant="h6" >
                                            Location
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Total Price
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Pay Method
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "50px" }}>
                                        <Typography color="textSecondary" variant="h6">
                                            Status
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right" style={{ width: "50px" }}>
                                        <Typography color="textSecondary" variant="h6">
                                            Action
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((item, i) => {
                                    return (<TableRow key={item.id}>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                {i + 1}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                color="textSecondary"
                                                sx={{
                                                    fontSize: "13px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {item.user.name}
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
                                                    >
                                                        {item.location}
                                                    </Typography>

                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {formatCurrency(item.totalPrice)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography color="textSecondary" variant="h6">
                                                {item.paymentMethod}
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
                                                label='Approved'
                                            ></Chip>
                                        </TableCell>
                                        <TableCell fad lign="right">
                                            <Typography variant="h6">
                                                <TableMenu id={item.id} key={item.id} fetchOrders={fetchOrders} />
                                            </Typography>
                                        </TableCell>
                                    </TableRow>)
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Orders;


