import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updateUserid, updateImgUrl, updateImgAlt} from '../../ducks/reducer'
import axios from 'axios'
// import _ from 'lodash'

class WizThree extends Component{
    constructor(){
        super()

        this.state ={
            img_url: '',
            img_alt: '',
        }
    }

    componentDidMount(){
        if(!this.props.userid){
            axios.get('/api/confirmUser').then(res => {
                this.props.updateUserid(res)
            }).catch(err => {
                this.props.history.push('/')
            })
        }
    }

    propsToState(){
        this.setState({img_url: this.props.img_url, img_alt: this.props.img_alt})
    }

    render(){
        const {updateImgAlt, updateImgUrl} = this.props
        // let displayImg =
        return(
            <body>
            <main>
                <WizHeader/>
                <p>Step 3</p>
                <img src='step_completed.png' alt=''/>
                <img src='step_completed.png' alt=''/>
                <img src='step_active.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                <img src='step_inactive.png' alt=''/>
                {/* 5 dots */}
                {/* output */}
                {/* ask about how state works with a redux method and component */}
                {/* fix preview box*/}
                <img src={this.state.img_url} alt={this.state.img_alt} className='imgOut'/>
                <p>Image url</p>
                <input onChange={e => updateImgUrl(e.target.value)}/>
                <p>Image alt text</p>
                <input onChange={e => updateImgAlt(e.target.value)}/>
                <Link to='/wizardTwo'><button>Previous Step</button></Link>
                <Link to='/wizardFour'><button>Next Step</button></Link>
            </main>
            </body>
        )
    }
}

function mapStateToProps(state){
    const {userid, img_url, img_alt} = state

    return{
        userid,
        img_url,
        img_alt
    }
}

export default connect(mapStateToProps, {updateImgUrl, updateImgAlt, updateUserid}) (WizThree)
