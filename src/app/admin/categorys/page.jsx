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
import TableMenu from './TableMenu';

const Categorys = () => {
    const [data, setData] = useState({});
    const [categorys, setCategorys] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const fetchCategorys = () => {
        fetch('/api/categorys')
            .then((res) => res.json())
            .then((data) => {
                console.log(data.categorys);
                setData(data);
                setCategorys(data.categorys);
                setLoading(false);
            })
    }
    useEffect(() => {
        fetchCategorys();
    }, []);

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Grid container>
                        <Grid item xs={10}>
                            <Typography variant="h3">Categorys management</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Stack
                                flexDirection="row"
                                justifyContent="right"
                                alignItems="center"
                            >
                                <Link href="/admin/categorys/add">
                                    <Button variant="outlined" startIcon={<AddBoxIcon />}>
                                        Add category
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
                                    <TableCell style={{ width: "100px" }}>
                                        <Typography color="textSecondary" variant="h6" >
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography color="textSecondary" variant="h6" >
                                            Description
                                        </Typography>
                                    </TableCell>
                                    {/* <TableCell>
                                        <Typography color="textSecondary" variant="h6">
                                            Note
                                        </Typography>
                                    </TableCell> */}
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
                                {categorys.map((category, key) => {
                                    return (
                                        <TableRow key={category.id}>
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
                                                                display: "flex",
                                                                alignItems: "center"
                                                            }}
                                                        >
                                                            <Avatar
                                                                alt="Wood chair"
                                                                src={category.icon}
                                                                sx={{ width: 25, height: 25, margin: "4px" }}
                                                            />
                                                            {category.name}
                                                        </Typography>
                                                        {/* <Typography
                                                            color="textSecondary"
                                                            sx={{
                                                                fontSize: "13px",
                                                            }}
                                                        >
                                                            Ghế
                                                        </Typography> */}
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                <Typography color="textSecondary" variant="h6" sx={{whiteSpace:"break-spaces"}} >
                                                    {category.description}
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
                                                    label='Active'
                                                ></Chip>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="h6">
                                                    <TableMenu id={category.id} key={category.id} fetchCategorys={fetchCategorys} />
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

export default Categorys;


