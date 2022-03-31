import React from 'react'

const Spinner = ({ height, top }) => {
    return (
        <div style={{ position: "fixed", width: "100vw", height: height, backgroundColor: "rgba(108, 117, 125, 0.3)" }}>
            <div style={{ position: 'absolute', top: top, left: '50%' }}>
                <div className="spinner-border text-dark" role="status" >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}

export default Spinner;