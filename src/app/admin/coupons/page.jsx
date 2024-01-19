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

import TableMenu from './TableMenu';

const Coupons = () => {
    const [data, setData] = useState({});
    const [coupons, setCoupons] = useState({});
    const [isLoading, setLoading] = useState(true);

    const fetchCoupons = () => {
        fetch('/api/coupons')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
                setCoupons(data.couponsData);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchCoupons();
    }, []);

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant="h3">Coupons management</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Stack
                                flexDirection="row"
                                justifyContent="right"
                                alignItems="center"
                            >
                                <Link href="/admin/coupons/add">
                                    <Button variant="outlined" startIcon={<AddBoxIcon />}>
                                        Add coupons
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
                                            Code
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Quantity
                                        </Typography>
                                    </TableCell>
                                    <TableCell style={{ width: "50%" }}>
                                        <Typography color="textSecondary" variant="h6" >
                                            Description
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Coupon
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
                                {coupons.length > 0 ? coupons.map((coupon, key) => {
                                    return (
                                        <TableRow key={coupon.id}>
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
                                                            {coupon.code}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {coupon.quantity}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {coupon.description}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {coupon.coupon}%
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6">
                                                    {moment(coupon.dateStart).format("DD-MM-YYYY") + " To " + moment(coupon.dateEnd).format("DD-MM-YYYY")}
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
                                                    label="Using"
                                                ></Chip>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="h6">
                                                    <TableMenu id={coupon.id} key={coupon.id} fetchCoupons={fetchCoupons} />
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }): ""}
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Coupons;


