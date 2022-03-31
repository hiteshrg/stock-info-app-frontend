import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Grid } from '@mui/material';

const BottomPanel = () => {
    const [page, setPage] = useState('');
    useEffect(() => {
        if (document.URL.endsWith('buy')) { setPage('buy'); }
        else if (document.URL.endsWith('sell')) { setPage('sell'); }
        else { setPage('dashboard'); }
    })
    return (
        <div style={{ position: 'fixed', bottom: '0%', backgroundColor: 'white', paddingTop: '10px', width: 'calc(100vw)' }}>
            <Grid container sx={{ textAlign: 'center' }}>
                <Grid item md={4} xs={5}>
                    <Link className={page === 'dashboard' ? "btn direct-btns purple" : "btn direct-btns"} to='/dashboard'>
                        <DashboardIcon />
                        <p className="no-margin">Dashboard</p>
                    </Link>
                </Grid>
                <Grid item md={4} xs={3}>
                    <Link className={page === 'buy' ? "btn direct-btns purple" : "btn direct-btns"} to="/buy">
                        <DashboardIcon />
                        <p className="no-margin">Buy</p>
                    </Link>
                </Grid>
                <Grid item md={4} xs={4}>
                    <Link className={page === 'sell' ? "btn direct-btns purple" : "btn direct-btns"} to="/sell">
                        <DashboardIcon />
                        <p className="no-margin">Sell</p>
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default BottomPanel;