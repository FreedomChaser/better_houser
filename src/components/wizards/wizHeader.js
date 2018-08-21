import React from 'react'
import {Link} from 'react-router-dom'

export default function wizHeader(){
    return(
        <div>
            <h2>Add new listing</h2>
            <Link to='/dashboard'>
                <button>Cancel</button>
            </Link>
        </div>
    )
}