import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import "./dashboard.css";
import { useNavigate } from "react-router-dom";
import CardComp from '../../components/Card/card';
import axios from 'axios';
import BottomPanel from '../../components/BottomPanel/BottomPanel';
import { getAllStockDetails } from '../../Redux/Actions/action';
import { connect } from 'react-redux';
import Spinner from './../../components/Spinner/Spinner'

const Dashboard = (props) => {
    const navigate = useNavigate();
    let [apiData, setApiData] = useState([]);
    let [liveData, setLiveData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // get live stock price and 52WeeksHigh and 52WeeksLow data
    // const getLiveData = async (params) => {
    //     try {
    //         setIsLoading(true);
    //         const symbols = params.slice(1, params.length);
    //         console.log('Params :', symbols)
    //         let res = await axios({ method: "POST", url: "http://192.168.175.206:57/stock_info", data: { "company_name": symbols, "full_name_boolean": "" } })
    //         if (res.data.code === 200) {
    //             setIsLoading(false);
    //             setLiveData(res.data.data);
    //             liveData = res.data.data;
    //             apiData.map((item) => {
    //                 if (liveData[item.code]) {
    //                     item['livePrice'] = liveData[item.code];
    //                 }
    //                 let totalGain, gain, percent, avgPrice, livePrice;
    //                 livePrice = item.livePrice.live_data;
    //                 avgPrice = item.total / item.quantity;
    //                 gain = livePrice - avgPrice;
    //                 percent = gain / item.price;
    //                 totalGain = percent * 100;
    //                 // console.log('Avg :', avgPrice, '\nlivePrice:', item.livePrice.live_data, '\ngain :', gain, '\npercent :', percent, '\ntotalGain :', totalGain);
    //                 if (liveData[item.code]) {
    //                     item['gainAmount'] = gain;
    //                     item['gainPercent'] = totalGain;
    //                 }
    //             });
    //             props.setStockData(apiData);
    //         } else {
    //             console.log(`Error: ${res}`);
    //         }
    //     } catch (error) {
    //         console.log(`Error: ${error.message}`);
    //     }

    // }

    useEffect(() => {
        document.getElementById('appBar-container').style.display = 'block';
        let isMounted = true;
        if (!localStorage.getItem('token')) { navigate('/') }

        if (props.getStockData.length > 0) {
            setApiData(props.getStockData);
        } else {
            if (isMounted) {
                setIsLoading(true);
                // let searchCode = "";
                // axios({ method: 'GET', url: 'http://localhost:8080/buy/get' })
                //     .then((res) => {
                //         setApiData(res.data.data);
                //         apiData = res.data.data;
                //         res.data.data.map((item) => searchCode = searchCode + "," + item.code);
                //         getLiveData(searchCode);
                //         props.setStockData(res.data.data);
                //     }).catch((err) => console.error('Catch Error :', err));
                axios({ method: 'GET', url: 'http://localhost:8080/stock/get-all-purchased-stock' })
                    .then((res) => {
                        setIsLoading(false);
                        setApiData(res.data.data);
                    }).catch((err) => {
                        setIsLoading(false);
                        console.error('get-all-purchased-stock Error :', err)
                    });

                axios({ method: 'GET', url: 'http://localhost:8080/stock/get' })
                    .then((stockRes) => {
                        setIsLoading(false);
                        setLiveData(stockRes.data);
                    }).catch((err) => {
                        setIsLoading(false);
                        console.error('Stock Catch Error :', err)
                    });
            }
        }
        return () => {
            isMounted = false;
        }

    }, []);

    // console.log('apiData :', apiData);
    return (<>
        <div className="dashboard-container d-flex justify-content-center">
            {isLoading && <Spinner height="100vh" top="35%" />}
            {apiData.length > 0 ?
                <Box sx={{ margin: '1rem 0 4rem 0' }}>
                    {apiData.map((item, i) => {
                        return <CardComp data={item} live={liveData[i]} key={item.code} />
                    })}
                </Box> : <h4 className='mt-5 text-dark'>No data available</h4>}
        </div>
        <BottomPanel />
    </>);
}


const mapStateToProps = (state) => {
    return {
        getStockData: state.rootReducer.stockReducer.stock,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setStockData: (data) => dispatch(getAllStockDetails(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);