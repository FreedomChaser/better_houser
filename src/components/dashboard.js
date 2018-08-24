//wiz three img preview not working but alt is sort of
//dashboard img, finish delete button 
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
            homeFilter: 0,
            filterToggle: false,
            
        }
        this.deleteHouse = this.deleteHouse.bind(this)
        this.filterToggle = this.filterToggle.bind(this)
        this.filterHome = this.filterHome.bind(this)
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

    filterToggle(){
        this.setState({filterToggle: !this.filterToggle})
    }

    render(){
        
        console.log('homes', this.state.homes)
        // console.log(el
        let displayHome = []
        // if(this.state.filterToggle === false){
        //     displayHome = this.state.homes.map((ele, i) => {
        //         console.log('ele', ele)
        //         return(
        //                 <div>
        //                     <div>                         
        //                         <img src='delete_icon.png' alt='click to delete' onClick={this.deleteHouse}/>
        //                         <img src={`${ele.img_url}`} className='imgThumb' alt={`${ele.img_alt}`}/>
        //                     </div>
        //                     <div>
        //                         <p>{ele.home_name}</p>
        //                         <p>{ele.description}</p>
        //                         <p>{ele.loan}</p>
        //                         <p>{ele.monthly_mortgage}</p>
        //                         <p>{ele.recommended_rent}</p>
        //                         <p>{ele.desired_rent}</p>
        //                         <p>{ele.address}</p>
        //                         <p>{ele.city}</p>
        //                     </div>
        //                 </div>
        //             ) 
        //     })
        // }else{
        //     let home = this.state.homes.filter((ele, i) => {
        //         if(ele.desired_rent >= this.homeFilter){
        //             return true
        //         }else{
        //             return false
        //         }
        //     })
        //     displayHome = home.map((ele, i) => {
        //         console.log('else', ele)
        //         return(
        //             <div>
        //                 <div>                         
        //                     <img src='delete_icon.png' alt='click to delete' onClick={this.deleteHouse}/>
        //                     <img src={`${ele.img_url}`} className='imgThumb' alt={`${ele.img_alt}`}/>
        //                     <div>
        //                         <p>{ele.home_name}</p>
        //                         <p>{ele.description}</p>
        //                         <p>{ele.loan}</p>
        //                         <p>{ele.monthly_mortgage}</p>
        //                         <p>{ele.recommended_rent}</p>
        //                         <p>{ele.desired_rent}</p>
        //                         <p>{ele.address}</p>
        //                         <p>{ele.city}</p>
        //                     </div>
        //                 </div>
        //             </div>
        //                     ) 
        //     })
        // }
        if(this.state.filterToggle){
            let home = this.state.homes.filter((ele, i) => {
                if(ele.desired_rent >= this.homeFilter){
                    console.log('ele', ele)
                    return true
                }else{
                    return false
                }
            })
            console.log('filtered', displayHome)
           displayHome = home.map((ele, i) => {
               console.log('mapele', ele)
            return(
                 <body>
                     <main>                         
                         <img src='delete_icon.png' alt='click to delete' onClick={this.deleteHouse}/>
                         <img src={`${ele.img_url}`} className='imgThumb' alt={`${ele.img_alt}`}/>
                         <div>
                         <p>{ele.home_name}</p>
                         <p>{ele.description}</p>
                         <p>Loan: ${ele.loan}</p>
                         <p>Monthly Mortgage: ${ele.monthly_mortgage}</p>
                         <p>Recommended Rent: ${ele.recommended_rent}</p>
                         <p>Desired Rent: ${ele.desired_rent}</p>
                         <p>Address: {ele.address}</p>
                         <p>City: {ele.city}</p>
                         </div>
                     </main>
                 </body>
                )
            })
        //unreachable code?
        // this.filterToggle()
    }else{
        displayHome = this.state.homes.map((ele, i) => {
            console.log('else', ele)
            return(
                     <div className='dashMain'>                         
                         <img src='delete_icon.png' alt='click to delete' onClick={this.deleteHouse}/>
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
            ) 
        })
    }

console.log('displayHome', displayHome)
        
        //add state 
        //finish filling out this page with info from db
        //build axios calls in componentDidMount
        //create filter

        return(
            <body>
                <main>
                <Link to='/wizardOne'><button>Add new property</button></Link>
                {/* build out wizard routes */}
                {/* link add new property to wizOne route */}
                <p>List properties with "desired rent" greater than: $<input onChange={e => this.filterHome(e.target.value)} placeholder='0'></input>
                    <button onClick={this.filterToggle}>Filter</button>
                    <button onClick={this.filterToggle}>Reset</button>
                </p>
                <div>
                    <p>Home Listings</p>
                    {/* {home} */}
                    {displayHome}
                    {/* add alt tag variable once db's built out */}
                    

                    {/* add a componentDidMount to pull a get req for all houses for this userid */}
                </div> 
                </main>
            </body>
        )
    }
}


function mapStateToProps(state){
    const {
            userid, 
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