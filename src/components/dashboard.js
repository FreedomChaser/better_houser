import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUserid} from '../ducks/reducer'
//add the sessions block on each route

class Dashboard extends React.Component{
    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/confirmUser').then(res => {
                this.props.updateUserid(res)
            }).catch(err => {
                this.props.history.push('/')
            })
        }
    }

    render(){
        //add state 
        //finish filling out this page with info from db
        //build axios calls in componentDidMount
        //create filter
        return(
            <div>
                <button>Add new property</button>
                {/* build out wizard routes */}
                {/* link add new property to wizOne route */}
                <p>List properties with "desired rent" greater than: $<input placeholder='0'></input>
                    <button>Filter</button>
                    <button>Reset</button>
                </p>
                <div>
                    <p>Home Listings</p>
                    {/* add alt tag variable once db's built out */}
                    <img src='https://utahnonprofits.org/media/k2/items/cache/71601b6fd7fc74a9f4eea8e6c1b43d35_XL.jpg' className='imgThumb'/>
                    {/* add a componentDidMount to pull a get req for all houses for this userid */}
                </div> 
            </div>
        )
    }
}

function mapStateToProps(state){
    const {userid} = state

    return{
        userid
    }
}

export default connect(mapStateToProps, {updateUserid}) (Dashboard)