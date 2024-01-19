"use-client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import DiscountIcon from '@mui/icons-material/Discount';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const initForm = {
    discount: "",
    description: "",
    dateStart: "",
    dateEnd: "",
    productId: "",
    status: 0,

}

export default function CustomizedMenus({ id, fetchProducts }) {
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openAddDiscount, setOpenAddDiscount] = useState(false);
    const [open1, setOpen] = useState(false);
    const [discountForm, setDiscountForm] = useState(initForm);
    // const {data: session, status} = useSession();
    useEffect(() => {
        setDiscountForm((prevState) => ({
            ...prevState,
            productId: id,
        }));
    }, [id])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOpenAddDiscount = () => {
        setOpenAddDiscount(true);
    };

    const handleCloseAddDiscount = () => {
        setOpenAddDiscount(false);
    };


    const inputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setDiscountForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const AddDiscount = (id) => {
        if (discountForm.productId !== "") {
            console.log(discountForm);
            axios.post('/api/discounts', JSON.stringify({ discountForm }))
                .then(function (response) {
                    // console.log(response);
                    if (response.data) {
                        setOpenAddDiscount(false);
                        setDiscountForm(initForm);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const handleClose1 = () => {
        setOpen(false);
    };

    const handleDelete = async (id) => {
        console.log(id);
        axios.delete(`/api/products?id=${id}`)
            .then(function (response) {
                if (response.data.success) {
                    fetchProducts();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        setOpen(false);
    }

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} disableRipple>
                    <Link href={"/product/" + id} style={{ alignItems: 'center', textDecoration: 'none', display: 'flex', color: 'black' }}>
                        <RemoveRedEyeIcon />
                        Detail
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleOpenAddDiscount} disableRipple>
                    <DiscountIcon />
                    Add Sales
                </MenuItem>
                <MenuItem disableRipple>
                    <Link href={"/admin/products/edit?id=" + id} style={{ alignItems: 'center', textDecoration: 'none', display: 'flex', color: 'black' }}>
                        <EditIcon />
                        Edit
                    </Link>
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClickOpen} disableRipple>
                    <DeleteIcon />
                    Delete
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    <RemoveCircleIcon />
                    Block
                </MenuItem>
            </StyledMenu>
            {/* Add product to discounts */}
            <Dialog
                open={openAddDiscount}
                maxWidth="sm"
                sx={{ minWidth: 120, }}
                onClose={handleCloseAddDiscount}
            >
                <DialogTitle variant='h2'>DiscountIcon</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="discount"
                        InputLabelProps={{ shrink: true }}
                        name="discount"
                        onChange={inputChange}
                        label="Discount product"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                        id="desc"
                        onChange={inputChange}
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        InputLabelProps={{ shrink: true }}
                        id="startDay"
                        name="dateStart"
                        label="Start Day"
                        onChange={inputChange}
                        type="datetime-local"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="endDay"
                        InputLabelProps={{ shrink: true }}
                        name="dateEnd"
                        label="End Day"
                        onChange={inputChange}
                        type="datetime-local"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAddDiscount}>Cancel</Button>
                    <Button type="submit" onClick={() => AddDiscount(id)}>Add discount</Button>
                </DialogActions>
            </Dialog>
            {/* Delete product  */}
            <Dialog
                open={open1}
                onClose={handleClose1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Warning"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose }}>Disagree</Button>
                    <Button onClick={() => handleDelete(id)} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}