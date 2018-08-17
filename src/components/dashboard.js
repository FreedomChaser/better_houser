import React from 'react'

export default class Dashboard extends React.Component{
    render(){
        //build out house table include userid and alt description
        //add state 
        //finish filling out this page with info from db
        // build axios calls in componentDidMount
        //create filter
        return(
            <div>
                <button>Add new property</button>
                <p>List properties with "desired rent" greater than: $<input placeholder='0'></input>
                    <button>Filter</button>
                    <button>Reset</button>
                </p>
                <div>
                    <p>Home Listings</p>
                    {/* add alt tag variable once db's built out */}
                    <img src='https://utahnonprofits.org/media/k2/items/cache/71601b6fd7fc74a9f4eea8e6c1b43d35_XL.jpg' className='imgThumb'/>
                </div> 
            </div>
        )
    }
}