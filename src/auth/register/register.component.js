import React, { useState, useEffect } from 'react';
import "./register.component.css";
import { useForm } from 'react-hook-form';
import { Box, Grid, Paper } from '@mui/material';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link, useNavigate } from 'react-router-dom';
// import { AccountCircle } from '@mui/icons-material';
import axios from 'axios';
import swal from 'sweetalert';

const RegisterComp = () => {
    const navigate = useNavigate()
    const [passwordShown, setPasswordShown] = useState(false);
    // const [formData, setFormData] = useState({
    //     fname: '', lname: '', email: '', phone: '', password: '', cpassword: ''
    // });
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('hook-form :', data)
        axios({ method: 'POST', url: "http://localhost:8080/users/add", data: data })
            .then((res) => {
                console.log('kirtna:', res);
                if (res.status === 201) {
                    swal("Good job!", "Registration Successful!", "success");
                    navigate('/');
                } else {
                    swal("Oops!", res.data.error, "warning");
                }
            }).catch((err) => {
                console.log('Register Error :', err)
            });

        // console.log('state :', formData);
    }

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     console.log('handleChange :', formData)

    //     setFormData({ ...formData, [name]: value });
    // }


    useEffect(() => {
        document.getElementById('appBar-container').style.display = 'none';
    }, [])

    // console.log('Check :', formData)
    return (<>
        <div className="register-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
            <Box style={{ width: "800px", padding: '4rem 2rem', borderRadius: '35px', margin: "0 2rem" }} component={Paper}>
                <h2 className="text-center mb-5 fw-bold">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <div className="mb-3">
                                <input type="text" className="form-control input-field"
                                    // value={formData.fname}
                                    placeholder="First Name"
                                    name="fname"
                                    // onChange={(e) => handleChange(e)}
                                    {...register("fname", { required: { value: true, message: "First Name is required ***" }, maxLength: 80, })}
                                />
                                {errors?.fname && <span className="span-error text-danger" style={{ fontSize: '13px', marginLeft: '10px' }}>{errors.fname.message} </span>}
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div className="mb-3">
                                <input type="text"
                                    placeholder="Last Name"
                                    name="lname"
                                    // value={formData.lname}
                                    // onChange={(e) => handleChange(e)}
                                    className="form-control input-field"
                                    {...register("lname", { required: { value: true, message: "Last Name is required ***" }, maxLength: 50 })}
                                />
                                {errors?.lname && <span className="span-error text-danger" style={{ fontSize: '13px', marginLeft: '10px' }}> {errors.lname.message} </span>}
                            </div>
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <div className="mb-3">
                                <input type="email" className="form-control input-field"
                                    aria-describedby="emailHelp"
                                    placeholder="Email id"
                                    name="email"
                                    // value={formData.email}
                                    // onChange={(e) => handleChange(e)}
                                    {...register("email", { required: { value: true, message: "Email is required ***" }, maxLength: 80, })} />
                                {errors?.email && <span className="span-error text-danger" style={{ fontSize: '13px', marginLeft: '10px' }}>{errors.email.message} </span>}
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div className="mb-3">
                                <input type="text"
                                    placeholder="Phone Number"
                                    name="phone"
                                    // value={formData.phone}
                                    // onChange={(e) => handleChange(e)}
                                    className="form-control input-field"
                                    {...register("phone", { required: { value: true, message: "Password is required ***" }, maxLength: 50 })}
                                />
                                {errors?.phone && <span className="span-error text-danger" style={{ fontSize: '13px', marginLeft: '10px' }}> {errors.phone.message} </span>}
                            </div>
                        </Grid>

                        <Grid item md={6} xs={12}>
                            <div className="mb-3">
                                <input type={passwordShown ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                    // value={formData.password}
                                    // onChange={(e) => handleChange(e)}
                                    className="form-control input-field"
                                    {...register("password", { required: { value: true, message: "Password is required ***" }, maxLength: 50 })}
                                />
                                {errors?.password && <span className="span-error text-danger" style={{ fontSize: '13px', marginLeft: '10px' }}> {errors.password.message} </span>}
                            </div>
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <div className="mb-3">
                                <input type={passwordShown ? "text" : "password"}
                                    placeholder="Confirm Password"
                                    name="cpassword"
                                    // value={formData.cpassword}
                                    // onChange={(e) => handleChange(e)}
                                    className="form-control input-field"
                                    {...register("cpassword", { required: { value: true, message: "Password is required ***" }, maxLength: 50 })}
                                />
                                {errors?.cpassword && <span className="span-error text-danger" style={{ fontSize: '13px', marginLeft: '10px' }}> {errors.cpassword.message} </span>}
                            </div>
                        </Grid>
                    </Grid>


                    <div className="d-flex flex-column justify-content-center mt-5">
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary rounded-pill px-4 w-75 register-btn btn-lg">Create Account</button>
                        </div>
                        <span className="span-signin" style={{ marginTop: '10px', textAlign: 'center' }}>Already have an account? <Link className="link-tag" to='/'>Sign in</Link></span>
                    </div>
                </form>
            </Box>
        </div>

    </>)
}

export default RegisterComp;