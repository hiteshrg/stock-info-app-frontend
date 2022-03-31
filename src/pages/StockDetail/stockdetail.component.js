import React, { useState, useEffect } from 'react';
import { Container, Box, Paper, Grid } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import TableContent from '../TableContent/Table';
import "./stockdetail.css";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const TableContent = (props) => {
    const { total, items } = props.data;
    useEffect(() => { }, [props.items]);

    return (
        <div className="table-responsive-sm">
            <table className={props.sold ? "table table-striped" : "table table-hover"}>
                <thead className="table-header">
                    <tr>
                        <th>Date/Qty</th>
                        <th>Price</th>
                        <th style={{ textAlign: "right" }}>Total</th>
                    </tr>
                </thead>
                <tbody className="table-body">

                    {items && items.map((ele) => {
                        return (
                            <tr key={ele._id}>
                                <td>{ele.date.slice(0, 10)}</td>
                                <td>{ele.price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                                <td style={{ textAlign: "right" }}>{ele.total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</td>
                            </tr>
                        )
                    })}

                    <tr className="text-bold">
                        <td><b>Total</b></td>
                        <td></td>
                        <td style={{ textAlign: "right" }}><b>{total && total.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const StockDetail = (props) => {
    const navigate = useNavigate();
    const [btn, setBtn] = useState({ bought: true, sold: false });
    const [stockInfo, setStockInfo] = useState({});

    useEffect(() => {
        if (!localStorage.getItem('token')) { navigate('/') }

        if (props.getSingleStockDetail) {
            setStockInfo(props.getSingleStockDetail);
        }
    }, []);

    return (<>
        <Container>
            <Box sx={{ marginTop: '2rem', padding: "2rem", borderRadius: '25px', color: 'black' }} component={Paper}>
                <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ marginBottom: '1rem' }}>
                    <Grid item md={1} xs={2}>
                        <Link className="btn btn-light" to="/dashboard"><ArrowBackIosIcon style={{ marginLeft: '10px' }} /></Link>
                    </Grid>
                    <Grid item md={11} xs={10}>
                        <h1 className="text-center">{stockInfo.code}</h1>
                    </Grid>
                    {/* <Grid item xs={12} md={12}>
                        <p className="text-center"><small>{stockInfo.name}</small></p>
                    </Grid> */}
                </Grid>

                <Grid container spacing={1} className="btn-container">
                    <Grid item md={6} xs={6} className="text-center">
                        <button className={btn.bought ? "btn w-100 border-none fw-bold special-btn" : "btn w-100 border-none fw-bold common-btn"} onClick={() => setBtn({ bought: true, sold: false })}>Bought</button>
                    </Grid>
                    <Grid item md={6} xs={6} className="text-center">
                        <button className={btn.sold ? "btn w-100 fw-bold border-none special-btn" : "btn w-100 border-none fw-bold common-btn"} onClick={() => setBtn({ sold: true, bought: false })}>Sold</button>
                    </Grid>
                </Grid>
                {btn.bought && <TableContent data={stockInfo} />}
                {btn.sold && <p className="text-center mt-5">No Data Found</p>}
                {/* {btn.sold && <TableContent sold="sold" data={stockInfo} />} */}

                <div>
                    <Link to='/buy' className="btn w-50 special-btn buy-btn">Buy</Link>
                </div>
            </Box>
        </Container>
    </>);
}

const mapStateToProps = (state) => {
    return {
        getSingleStockDetail: state.rootReducer.stockReducer.singleStock
    }
}
export default connect(mapStateToProps, null)(StockDetail);