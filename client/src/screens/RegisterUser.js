import { Box, IconButton, InputAdornment, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, Grid, outlinedInputClasses, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { ButtonBack, ButtonProduct, TileBox } from '../assets/styles/Styles';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const customTheme = (outerTheme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        border: '1px solid #DCDCDC',
                        borderRadius: "12px",
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            border: '1px solid #7F38EC',
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            border: '1px solid #7F38EC',
                        },
                    },
                },
            },
        },
        typography: {
            allVariants: {
                fontFamily: 'Inter',
            },
        },
    });

const RegisterUser = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [description, setDescription] = useState("");
    const outerTheme = useTheme();
    const Smalldialog = useMediaQuery(outerTheme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const formOne = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
            confirm_password: "",
            first: "",
            last: ""
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Please enter valid email")
                .required("Please enter email"),
            password: Yup.string()
                .required("Please enter password")
                .min(8, "Password must be 8 characters long")
                .matches(/[0-9]/, "Password requires a number")
                .matches(/[a-z]/, "Password requires a lowercase letter")
                .matches(/[A-Z]/, "Password requires an uppercase letter")
                .matches(/[^\w]/, "Password requires a special charator"),
            confirm_password: Yup.string()
                .required("Please enter confirm password")
                .oneOf([Yup.ref("password"), null], "Password must match"),
            first: Yup.string()
                .required("Please enter first name"),
            last: Yup.string()
                .required("Please enter last name")
        }),

        onSubmit: async (values) => {
            try {
                setMessage("Please wait!");
                setDescription("Please do not close the window or go back");
                setOpen(true);

                const res = await axios.post(
                    `https://ggrecipeapp.onrender.com/auth/register`,
                    {
                        email: values.email,
                        password: values.password,
                        firstname: values.first,
                        lastname: values.last
                    }
                );

                const data = await res.data

                setTimeout(() => {
                    setOpen(false)
                    setMessage("");
                    setDescription("");
                }, [2000])

                //const data = await res.data
                setMessage("Success!");
                setDescription("Login Successfully.");
                setOpen(true);

                setTimeout(() => {
                    setOpen(false);
                    setMessage("");
                    setDescription("");
                }, [2000])
                formOne.resetForm();
                navigate('/login')

            } catch (err) {
                setMessage("Error!");
                setDescription(err?.response?.data?.data);
                setOpen(true);

                setTimeout(() => {
                    setOpen(false)
                    setMessage("");
                    setDescription("");
                }, [2000])
            }
        },
    });

    return (
        <div style={{ padding: "12px" }}>
            <Grid container spacing={2}>
                <Grid item lg={4} md={3} sm={1} xs={0.5} />

                <Grid item lg={4} md={6} sm={10} xs={11}>
                    <TileBox>
                        <ThemeProvider theme={customTheme(outerTheme)}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box sx={{ width: '100%', textAlign: 'center' }}>
                                        <Typography variant='h6' sx={{ mb: 0.5 }}>
                                            Register
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                            First Name<span style={{ color: 'red' }}>*</span>
                                        </Typography>


                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="text"
                                            placeholder='Enter First Name'
                                            sx={{
                                                //maxWidth: '350px',
                                                "& input::placeholder": { fontSize: "14px" },
                                                "& .MuiInputBase-root": {
                                                    fontSize: "14px"
                                                }
                                            }}
                                            id="first"
                                            name="first"
                                            onChange={formOne.handleChange}
                                            value={formOne.values.first}
                                        />

                                        <Typography variant='caption' sx={{ color: 'red' }}>
                                            {formOne.touched.first && formOne.errors.first ?
                                                <>{formOne.errors.first}</> :
                                                <>&emsp;</>
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                            Last Name<span style={{ color: 'red' }}>*</span>
                                        </Typography>

                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="text"
                                            placeholder='Enter Last Name'
                                            sx={{
                                                //maxWidth: '350px',
                                                "& input::placeholder": { fontSize: "14px" },
                                                "& .MuiInputBase-root": {
                                                    fontSize: "14px"
                                                }
                                            }}
                                            id="last"
                                            name="last"
                                            onChange={formOne.handleChange}
                                            value={formOne.values.last}
                                        />

                                        <Typography variant='caption' sx={{ color: 'red' }}>
                                            {formOne.touched.last && formOne.errors.last ?
                                                <>{formOne.errors.last}</> :
                                                <>&emsp;</>
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                            Email<span style={{ color: 'red' }}>*</span>
                                        </Typography>


                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="email"
                                            placeholder='Enter Email'
                                            sx={{
                                                //maxWidth: '350px',
                                                "& input::placeholder": { fontSize: "14px" },
                                                "& .MuiInputBase-root": {
                                                    fontSize: "14px"
                                                }
                                            }}
                                            id="email"
                                            name="email"
                                            onChange={formOne.handleChange}
                                            value={formOne.values.email}
                                        />

                                        <Typography variant='caption' sx={{ color: 'red' }}>
                                            {formOne.touched.email && formOne.errors.email ?
                                                <>{formOne.errors.email}</> :
                                                <>&emsp;</>
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Box sx={{ width: '100%', mb: 1 }}>
                                        <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                            Password<span style={{ color: 'red' }}>*</span>
                                        </Typography>

                                        <TextField
                                            size="small"
                                            fullWidth
                                            type={showPassword1 ? "text" : "password"}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end" sx={{ ml: "auto" }}>
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword1((show) => !show)}
                                                            edge="end"
                                                            sx={{ color: "#B3B6B7", ml: "auto" }}
                                                        >
                                                            {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            placeholder="Enter Password"
                                            id="password"
                                            name="password"
                                            onChange={formOne.handleChange}
                                            value={formOne.values.password}
                                        />

                                        <Typography variant='caption' sx={{ color: 'red' }}>
                                            {formOne.touched.password && formOne.errors.password ?
                                                <>{formOne.errors.password}</> :
                                                <>&emsp;</>
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Box sx={{ width: '100%', mb: 1 }}>
                                        <Typography variant='subtitle1' sx={{ mb: 0.5, fontWeight: 450 }}>
                                            Confirm Password<span style={{ color: 'red' }}>*</span>
                                        </Typography>

                                        <TextField
                                            size="small"
                                            fullWidth
                                            type={showPassword2 ? "text" : "password"}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end" sx={{ ml: "auto" }}>
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword2((show) => !show)}
                                                            edge="end"
                                                            sx={{ color: "#B3B6B7", ml: "auto" }}
                                                        >
                                                            {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            placeholder="Enter Password"
                                            id="confirm_password"
                                            name="confirm_password"
                                            onChange={formOne.handleChange}
                                            value={formOne.values.confirm_password}
                                        />

                                        <Typography variant='caption' sx={{ color: 'red' }}>
                                            {formOne.touched.confirm_password && formOne.errors.confirm_password ?
                                                <>{formOne.errors.confirm_password}</> :
                                                <>&emsp;</>
                                            }
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                        <ButtonProduct onClick={formOne.handleSubmit}>
                                            <Typography variant='subtitle1'>
                                                Submit
                                            </Typography>
                                        </ButtonProduct>

                                        <ButtonBack onClick={() => { formOne.handleReset(); navigate('/') }}>
                                            <Typography variant='subtitle1'>
                                                Back
                                            </Typography>
                                        </ButtonBack>
                                    </Box>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <Box sx={{ width: '100%', mt: 1, textAlign: 'center' }}>
                                        <Typography variant='body2'>
                                            Already have an account? <span style={{ cursor: 'pointer', color: '#611ACE', fontWeight: 600 }} onClick={() => navigate('/login')}>Log in</span>
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </ThemeProvider>
                    </TileBox>
                </Grid>

                <Grid item lg={4} md={3} sm={1} xs={0.5} />
            </Grid>

            <Dialog
                open={open}
                aria-labelledby="responsive-dialog-title"
                sx={{ textAlign: 'center' }}
            >
                <DialogTitle
                    id="responsive-dialog-title"
                    sx={{ mb: 0, pb: 0 }}
                >
                    <Typography variant='h5'>
                        {message}
                    </Typography>
                </DialogTitle>

                <DialogTitle id="responsive-dialog-title">
                    {message?.includes("wait") ?
                        <CircularProgress color="success" /> :
                        message?.includes("Success") ?
                            <img
                                src={""}
                                height={'40px'}
                                weight={'40px'}
                                alt=''
                            /> :
                            message?.includes("Error") ?
                                <img
                                    src={""}
                                    height={'40px'}
                                    weight={'40px'}
                                    alt=''
                                /> :
                                null
                    }
                </DialogTitle>

                <DialogContent
                    sx={Smalldialog ?
                        { minWidth: '100px' } :
                        { minWidth: '320px' }
                    }
                >
                    <DialogContentText>
                        <Typography variant='body1'>
                            {description}
                        </Typography>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default RegisterUser
