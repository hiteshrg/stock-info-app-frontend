import React, { useState, useRef, useEffect } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import BottomPanel from "../../components/BottomPanel/BottomPanel";
import Spinner from '../../components/Spinner/Spinner';
import './Buy.css';
import axios from 'axios';
import { addSinglePurchaseShare } from '../../Redux/Actions/action';
import { connect } from 'react-redux';

const Buy = (props) => {
    const navigate = useNavigate();
    const [allBuyData, setAllBuyData] = useState([]);
    const [buyExistingShare, setBuyExistingShare] = useState([]);
    const [buyDetail, setBuyDetail] = useState({ date: '', code: '', name: '', quantity: '', price: '', total: '' });
    const [error, setError] = useState({ date: '', code: '', name: '', quantity: '', price: '', total: '' });
    const [disableBtn, setDisableBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const timeout = useRef()

    // validation function for input
    const validate = (name, value) => {
        if (value === '' || value === 0) {
            setError({ [name]: `${name} should not be empty **` });
        } else {
            setError({ date: '', code: '', name: '', quantity: '', price: '', total: '' });
        }
    }

    // handleChange function for update state
    const handleChange = (e) => {
        const { name, value } = e.target;
        validate(name, value);
        setBuyDetail({ ...buyDetail, [name]: value });

        if (name === 'code') {
            // console.log('Value', value);
            clearTimeout(timeout.current);
            if (value) {
                timeout.current = setTimeout(() => {
                    setDisableBtn(true);
                    setIsLoading(true);
                    // let check = allBuyData.filter((data) => data.code === value);
                    // console.log('Check', check);

                    axios({
                        method: "POST",
                        url: "http://localhost:8080/stock/get-yahoo-data",
                        data: { "symbol": [value] }
                    }).then((res) => {
                        const { fullName, currentPrice } = res.data[0];
                        setIsLoading(false);
                        setDisableBtn(false);
                        setBuyDetail({ ...buyDetail, code: value, name: fullName, price: currentPrice });
                    }).catch((err) => {
                        setDisableBtn(false);
                        setIsLoading(false);
                        console.error('Error :', err);
                    })

                }, 1000);
            } else {
                console.log('Value is null :', value)
            }

        }
    }

    // form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const { date, code, quantity, price, total, name } = buyDetail;
        const localData = JSON.parse(localStorage.getItem('userInfo'));
        const userId = localData.userId;
        if (!date || !code || !quantity || !price) {
            if (!date) {
                setError({ ...error, date: 'Date is required **' });
            } else if (!code) {
                setError({ ...error, code: 'Short Code is required **', })
            } else if (!quantity) {
                setError({ ...error, quantity: 'Quantity is required **', })
            } else if (!price) {
                setError({ ...error, price: 'Price is required **', })
            } else {
                setError({ date: "", code: "", quantity: "", price: "" })
            }
        } else {
            axios({
                method: "POST", url: "http://localhost:8080/buy/add", data: { date, name, code, quantity, price, total, userId }
            }).then((res) => {
                // props.addItemToStock(res.data.data);
                navigate('/');
                window.location.reload();
            }).catch((err) => console.error('Catch Error :', err));
            console.log('Buy Data :', buyDetail);
        }
    }

    useEffect(() => {
        let isMounted = true;
        if (!localStorage.getItem('token')) {
            props.navigate('/')
        }

        return () => {
            isMounted = false;
        }
    }, [])


    return (<>
        <div className="buy-container">
            {isLoading && <Spinner height="100vh" top="50%" />}
            <Box className="sell-box" component={Paper} sx={{ width: '400px', margin: '20px 10px', borderRadius: '10px' }}>
                <h1 className="text-center mb-4">BUY</h1>

                <form onSubmit={handleSubmit}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" className="mb-3">
                        <Grid item md={3} xs={3}>
                            <label style={{ fontSize: '14px' }}>Date</label>
                        </Grid>
                        <Grid item md={9} xs={9}>
                            <input type="date" className="form-control input-field"
                                disabled={disableBtn}
                                name="date"
                                value={buyDetail.date}
                                onChange={(e) => handleChange(e)} />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            {error.date && <span className="text-danger" style={{ fontSize: '12px' }}>{error.date}</span>}
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="center" alignItems="center" className="mb-3">
                        <Grid item md={3} xs={3}>
                            <label style={{ fontSize: '14px' }}>Short Code</label>
                        </Grid>
                        <Grid item md={9} xs={9}>
                            <input type="text" className="form-control input-field"
                                name="code"
                                value={buyDetail.code}
                                onChange={(e) => handleChange(e)} />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            {error.code && <span className="text-danger" style={{ fontSize: '12px' }}>{error.code} </span>}
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="center" alignItems="center" className="mb-3">
                        <Grid item md={3} xs={3}>
                            <label style={{ fontSize: '14px' }}>Name</label>
                        </Grid>
                        <Grid item md={9} xs={9}>
                            <input type="text" className="form-control input-field"
                                name="name"
                                value={buyDetail.name}
                                onChange={(e) => handleChange(e)}
                                disabled />
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="center" alignItems="center" className="mb-3">
                        <Grid item md={3} xs={3}>
                            <label style={{ fontSize: '14px' }}>Price</label>
                        </Grid>
                        <Grid item md={9} xs={9}>
                            <input type="text" className="form-control input-field"
                                name="price"
                                disabled={disableBtn}
                                value={buyDetail.price}
                                onChange={(e) => handleChange(e)} />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            {error.price && <span className="text-danger" style={{ fontSize: '12px' }}>{error.price} </span>}
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="center" alignItems="center" className="mb-3">
                        <Grid item md={3} xs={3}>
                            <label style={{ fontSize: '14px' }}>Quantity</label>
                        </Grid>
                        <Grid item md={9} xs={9}>
                            <input type="text" className="form-control input-field"
                                name="quantity"
                                disabled={disableBtn}
                                value={buyDetail.quantity}
                                onBlur={() => { setBuyDetail({ ...buyDetail, total: buyDetail.quantity * buyDetail.price }) }}
                                onChange={(e) => handleChange(e)} />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            {error.quantity && <span className="text-danger" style={{ fontSize: '12px' }}>{error.quantity} </span>}
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="center" alignItems="center" className="mb-3">
                        <Grid item md={3} xs={3}>
                            <label style={{ fontSize: '14px' }}>Total</label>
                        </Grid>
                        <Grid item md={9} xs={9}>
                            <input type="text" className="form-control input-field"
                                name="total"
                                value={buyDetail.total}
                                onChange={(e) => handleChange(e)}
                                disabled />
                        </Grid>
                    </Grid>

                    <div className="d-flex flex-column justify-content-center mt-5">
                        <div className="text-center">
                            <button type="submit" disabled={disableBtn} className="btn btn-primary rounded-pill px-4 w-50 login-btn">Save</button>
                        </div>
                    </div>
                </form>
            </Box>
        </div>
        <BottomPanel />
    </>);
}
// const mapStateToProps = (state) => { }
const mapDispatchToProps = (dispatch) => {
    return {
        addItemToStock: (data) => dispatch(addSinglePurchaseShare(data))
    }
}
export default connect(null, mapDispatchToProps)(Buy);