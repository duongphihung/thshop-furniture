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

import TableMenu from '@/app/components/admin/TableMenu';

const Products = () => {
    const [data, setData] = useState({});
    const [products, setProduct] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchProducts = () => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
                setProduct(data.products);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant="h3">Product management</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Stack
                                flexDirection="row"
                                justifyContent="right"
                                alignItems="center"
                            >
                                <Link href="/admin/products/add">
                                    <Button variant="outlined" startIcon={<AddBoxIcon />}>
                                        Add product
                                    </Button>
                                </Link>
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
                                    <TableCell align="right" style={{ width: "50px" }}>
                                        <Typography color="textSecondary" variant="h6">
                                            Action
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product, key) => {
                                    return (
                                        <TableRow key={product.id}>
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
                                                        src={product.imageUrl}
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
                                                            {product.name}
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            sx={{
                                                                fontSize: "13px",
                                                            }}
                                                        >
                                                            {product.category.name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    ${product.price}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {product.quantity}
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
                                                    label={product.status}
                                                ></Chip>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="h6">
                                                    <TableMenu id={product.id} key={product.id} fetchProducts={fetchProducts} />
                                                </Typography>
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
    );
};

export default Products;


