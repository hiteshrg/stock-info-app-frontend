import React, { useEffect, useState } from 'react';
import { Box, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import "./card.css";
import { connect } from 'react-redux';
import { getSingleStockDetails } from '../../Redux/Actions/action';

const GridData = ({ item, live }) => {
    // const { gainAmount, gainPercent, total, quantity, livePrice } = item;
    const { avg, code, quantity, name, total } = item;
    const { currentPrice, high52Weeks, low52Weeks } = live;
    const [color, setColor] = useState('');
    const [profit, setProfit] = useState(0);
    const [totalGain, setTotalGain] = useState(0);
    // const [averagePrice, setAveragePrice] = useState(0);

    useEffect(() => {
        // console.log('avg:', avg, 'currentPrice', currentPrice, 'quantity', quantity,)
        if (avg && currentPrice) {
            setProfit((avg - currentPrice) * quantity);
            // setPercent(profit / currentPrice);
            setTotalGain((profit / total) * 100);
        }
        if (profit) {
            if (profit > 0) { setColor('green'); }
            else { setColor('red'); }
        }

        // if (total && quantity) { setAveragePrice(total / quantity) }
    }, [item, live, profit]);

    // console.log('profit:', profit.toFixed(4), '\ntotalGain:', totalGain.toFixed(4));
    return (
        <Box className="card-container" component={Paper} sx={{ width: '600px', maxWidth: '100vw' }}>
            <Grid container direction="row" alignItems="center" className="">
                <Grid item xs={12} sm={12} md={12}>
                    <h5 className="no-margin fw-bold card-title">{code} <span style={{ fontSize: '12px', fontWeight: 'normal' }}>({name})</span></h5>
                </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" className="card-quantity-grid">
                <Grid item xs={6} sm={6} md={6}>
                    <h6 className="no-margin qty">Qty: {quantity}</h6>
                </Grid>
                <Grid item xs={3} sm={3} md={3} className="text-end">
                    <p className="no-margin price-text">Mkt Price</p>
                </Grid>
                <Grid item xs={3} sm={3} md={3} className="text-end">
                    <p className="no-margin purple price-text">Avg Price</p>
                </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" className="fw-bold">
                <Grid item xs={6} sm={6} md={6} />
                <Grid item xs={3} sm={3} md={3} className="text-end">
                    <p className="no-margin mkt-price">{currentPrice ? currentPrice : '-------'}</p>
                </Grid>
                <Grid item xs={3} sm={3} md={3} className="text-end purple">
                    <p className="no-margin mkt-price">{avg ? avg.toFixed(4) : '-----'}</p>
                </Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" className="mt-2">
                <Grid item xs={3} sm={3} md={3} />
                <Grid item xs={3} sm={3} md={3} className="text-end">
                    <small className="no-margin" style={{ fontSize: '11px' }}>52 weeks</small>
                </Grid>
                <Grid item xs={3} sm={3} md={3} className="text-end ">
                    <p className="text-success no-margin">H {high52Weeks}</p>
                </Grid>
                <Grid item xs={3} sm={3} md={3} className="text-end">
                    <div className="d-flex justify-content-between">
                        <p className="no-margin slash" style={{ marginLeft: '5px' }}>/</p>
                        <p className="text-danger no-margin">L {low52Weeks}</p>
                    </div>
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" className="mt-2">
                <Grid item xs={4} sm={4} md={4}>
                    <p className="no-margin fw-bold card-gain-title">Today's Gain</p>
                    <h6 className="text-success no-margin card-gain-price">+ 4.95 (0.50%)</h6>
                </Grid>
                <Grid item xs={6} sm={4} md={4} className="text-end">
                    <p className="no-margin fw-bold card-gain-title">Total Gain / Loss</p>
                    <h6 className={color === 'green' ? "text-success no-margin card-gain-price" : "text-danger no-margin card-gain-price"}>
                        {totalGain ?
                            profit > 0 ? `+ ${profit.toFixed(2)} (${totalGain.toFixed(2)}%)` :
                                `${profit.toFixed(2)} (${totalGain.toFixed(2)}%)` : profit}
                    </h6>
                </Grid>
            </Grid>
        </Box>
    );
}

const CardComp = (props) => {
    // console.log('Props :', props);
    const { data, live } = props;
    const [propData, setPropData] = useState([]);
    const [liveData, setLiveData] = useState([]);

    useEffect(() => {
        if (props.live) {
            setLiveData(live);
        }
        setPropData(data);
    }, [live]);

    // console.log('parth :', liveData)
    return (<>
        <div className="d-flex justify-content-center">
            <Link key={liveData._id} to={`/${propData.code}/${liveData._id}`} className="text-decoration-none" onClick={() => props.setSingleStockDetail(propData)}>
                <GridData item={propData} live={liveData} />
            </Link>
        </div>
    </>)
}

const mapStateToProps = (state) => {
    return {
        getStockData: state.rootReducer.stockReducer.stock
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSingleStockDetail: (data) => dispatch(getSingleStockDetails(data))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CardComp);