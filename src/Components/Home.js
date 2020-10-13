import React from 'react'
import { Redirect } from 'react-router-dom'

function Home() {
    return (
        <div>
            <Redirect to="/1" />
        </div>
    )
}

export default Home
