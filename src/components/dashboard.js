//wiz three img preview not working but alt is sort of
//dashboard img
//problems with login and register

import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {updateUserid} from '../ducks/reducer'
import {Link} from 'react-router-dom'
//add the sessions block on each route

class Dashboard extends React.Component{
    constructor(){
        super()

        this.state = {
            homes: [],
            homeFilter: 0
            // userid: '',
            // property_name: '',
            // property_description: '',
            // address: '',
            // city: '',
            // usState: '',
            // zip: 0,
            // img_url: '',
            // img_alt: '',
            // loan_amount: 0,
            // monthly_mortgage: 0,
            // desired_rent: 0,
            // recommended_rent: 0
        }
        this.deleteHouse = this.deleteHouse.bind(this)
    }
    
    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/confirmUser').then(res => {
                this.props.updateUserid(res)
            }).catch(err => {
                this.props.history.push('/')
            })
        }
        axios.get(`/api/userHomes/${this.props.userid}`)
        .then(res => {this.setState({homes: res.data})})
        
        // (res => this.setState({
        //     userid: res.data[0].userid,
        //     property_name: res.data[0].property_name,
        //     property_description: res.data[0].property_description,
        //     address: res.data[0].address,
        //     city: res.data[0].city,
        //     usState: res.data[0].usState,
        //     zip: res.data[0].zip,
        //     img_url: res.data[0].img_url,
        //     img_alt: res.data[0].img_alt,
        //     loan_amount: res.data[0].loan_amount,
        //     monthly_mortgage: res.data[0].monthly_mortgage,
        //     desired_rent: res.data[0].desired_rent,
        //     recommended_rent: res.data[0].recommended_rent
        // }))
    }

    deleteHouse(){
        axios.delete(`/api/deleteHouse/${this.props.userid}`, {
        //   loan_amount: this.state.loan_amount,
        //   monthly_mortgage: this.state.monthly_mortgage,
        //   recommended_rent: this.state.recommended_rent,
        //   desired_rent: this.state.desired_rent,
        //   address: this.state.address,
        //   city: this.state.city  
        })
        // .then(res => alert('House deleted'))
    }

    filterHome(val){
        this.setState({homeFilter: val})
    }

    render(){
        

        let home = this.state.homes.map((ele, i) => {
            // console.log(ele)
         if(ele.desired_rent >= this.state.homeFilter){
            return(
                <div>
                    <div>
                        
                            {/* / */}
                            <img src='delete_icon.png' alt='click to delete' onClick={this.deleteHouse}/>
                            {/* / */}
                            <img src={`${ele.img_url}`} className='imgThumb' alt={`${ele.img_alt}`}/>
                        <div>
                        <p>{ele.home_name}</p>
                        <p>{ele.description}</p>
                        <p>{ele.loan}</p>
                        <p>{ele.monthly_mortgage}</p>
                        <p>{ele.recommended_rent}</p>
                        <p>{ele.desired_rent}</p>
                        <p>{ele.address}</p>
                        <p>{ele.city}</p>
                        </div>
                    </div>
                </div>
            )
         }else{
             return(
                 <div>
                     <div>
                         
                             {/* / */}
                             <img src='delete_icon.png' alt='click to delete' onClick={this.deleteHouse}/>
                             {/* / */}
                             <img src={`${ele.img_url}`} className='imgThumb' alt={`${ele.img_alt}`}/>
                         <div>
                         <p>{ele.home_name}</p>
                         <p>{ele.description}</p>
                         <p>{ele.loan}</p>
                         <p>{ele.monthly_mortgage}</p>
                         <p>{ele.recommended_rent}</p>
                         <p>{ele.desired_rent}</p>
                         <p>{ele.address}</p>
                         <p>{ele.city}</p>
                         </div>
                     </div>
                 </div>
             )
         }  
        })

        
        //add state 
        //finish filling out this page with info from db
        //build axios calls in componentDidMount
        //create filter

        return(
            <div>
                <Link to='/wizardOne'><button>Add new property</button></Link>
                {/* build out wizard routes */}
                {/* link add new property to wizOne route */}
                <p>List properties with "desired rent" greater than: $<input onChange={e => this.filterHome(e.target.value)} placeholder='0'></input>
                    <button>Filter</button>
                    <button>Reset</button>
                </p>
                <div>
                    <p>Home Listings</p>
                    {home}
                    {/* add alt tag variable once db's built out */}
                    

                    {/* add a componentDidMount to pull a get req for all houses for this userid */}
                </div> 
            </div>
        )
    }
}

function mapStateToProps(state){
    const {
            userid, 
            // property_name, 
            // property_description, 
            // address, 
            // city, 
            // usState, 
            // zip,
            // img_url,
            // img_alt,
            // loan_amount,
            // monthly_mortgages,
            // desired_rent,
            // recommended_rent 
        } = state

    return{
        userid,
        // property_name, 
        // property_description, 
        // address, 
        // city, 
        // usState, 
        // zip,
        // img_url,
        // img_alt,
        // loan_amount,
        // monthly_mortgages,
        // desired_rent,
        // recommended_rent 
    }
}

export default connect(mapStateToProps, {updateUserid}) (Dashboard)