import React from 'react'
import {Link} from 'react-router-dom'

export default function wizHeader(){
    return(
        <div className='wizheader'>
            <h2 className='headerTitle'>Add new listing</h2>
            <Link to='/dashboard'>
                <button className='headerBtn'>Cancel</button>
            </Link>
        </div>
    )
}