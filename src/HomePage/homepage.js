import React from 'react'

import './homepage.css'

const HomePage = ({setStarted}) => {
    return (
        <div className="homepage-container">
            <div className="label-header">Memory Match</div>
            <div className="start-button" onClick={()=>setStarted(true)}> Start </div>
        </div>
    )
}

export default HomePage