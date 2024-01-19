"use client"
import React from "react";
import { useState, useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import moment from "moment";
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
import SellIcon from '@mui/icons-material/Sell';
import TableMenu from './TableMenu';

const Discounts = () => {
    const [data, setData] = useState({});
    const [discounts, setDiscounts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchDiscounts = () => {
        fetch('/api/discounts?getDiscount=true')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
                setDiscounts(data.discounts);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchDiscounts();
    }, []);

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant="h3">Product discount management</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Stack
                                flexDirection="row"
                                justifyContent="right"
                                alignItems="center"
                            >
                                <Link href="/admin/coupons">
                                    <Button variant="outlined" startIcon={<SellIcon />}>
                                        List coupons
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
                                            Discount
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Cost
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "50px" }}>
                                        <Typography color="textSecondary" variant="h6">
                                            Day
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
                                {discounts.map((discount, key) => {
                                    return (
                                        <TableRow key={discount.id}>
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
                                                        src={discount.product.imageUrl}
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
                                                            {discount.product.name}
                                                        </Typography>
                                                        <Typography
                                                            color="textSecondary"
                                                            sx={{
                                                                fontSize: "13px",
                                                            }}
                                                        >
                                                            {discount.product.category.name}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {discount.discount}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {discount.product.price}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                {moment(discount.dateStart).format("hh:mm, DD-MM-YYYY") + " To "+ moment(discount.dateEnd).format("hh:mm, DD-MM-YYYY")}
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
                                                    label="onSale"
                                                ></Chip>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="h6">
                                                    <TableMenu id={discount.id} productId={discount.product.id} key={discount.id} fetchDiscounts={fetchDiscounts} />
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

export default Discounts;


