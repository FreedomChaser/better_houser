import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUserid} from '../ducks/reducer'
import {Link} from 'react-router-dom'
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
        axios.get(`/api/userHomes/${this.props.userid}`)

    }

    render(){
        //add state 
        //finish filling out this page with info from db
        //build axios calls in componentDidMount
        //create filter
        return(
            <div>
                <Link to='/wizardOne'><button>Add new property</button></Link>
                {/* build out wizard routes */}
                {/* link add new property to wizOne route */}
                <p>List properties with "desired rent" greater than: $<input placeholder='0'></input>
                    <button>Filter</button>
                    <button>Reset</button>
                </p>
                <div>
                    <p>Home Listings</p>
                    {/* add alt tag variable once db's built out */}
                    <img src={`${this.props.img_url}`} className='imgThumb' alt={`${this.props.img_alt}`}/>
                    {/* add a componentDidMount to pull a get req for all houses for this userid */}
                </div> 
            </div>
        )
    }
}

function mapStateToProps(state){
    const {
            userid, 
            property_name, 
            property_description, 
            address, 
            city, 
            usState, 
            zip,
            img_url,
            img_alt,
            loan_amount,
            monthly_mortgages,
            desired_rent,
            recommended_rent 
        } = state

    return{
        userid,
        property_name, 
        property_description, 
        address, 
        city, 
        usState, 
        zip,
        img_url,
        img_alt,
        loan_amount,
        monthly_mortgages,
        desired_rent,
        recommended_rent 
    }
}

export default connect(mapStateToProps, {updateUserid}) (Dashboard)