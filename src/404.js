import React from 'react'
import { Link } from 'react-router-dom'

function FourOFourPage(props) {
    return (
        <div className='404-content bookshelf'>
            <h1>Everything Is Broken</h1>
            <h3>Were you trying to type in the browser bar? Silly human. That never works.</h3>
            <Link to="/">Go Back to the Beginning</Link>
        </div>
    )
}

export default FourOFourPage