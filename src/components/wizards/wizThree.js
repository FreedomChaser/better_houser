import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import WizHeader from './wizHeader'
import {updateUserid, updateImgUrl, updateImgAlt} from '../../ducks/reducer'
import axios from 'axios'

class WizThree extends Component{
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
        const {updateImgAlt, updateImgUrl} = this.props
        return(
            <div>
                <WizHeader/>
                <p>Step 3</p>
                {/* 5 dots */}
                {/* output */}
                {/* ask about how state works with a redux method and component */}
                <img src={this.props.img_url} alt={this.props.img_alt} className='imgOut'/>
                <p>Image url</p>
                <input onChange={e => updateImgUrl(e.target.value)}/>
                <p>Image alt text</p>
                <input onChange={e => updateImgAlt(e.target.value)}/>
                <Link to='/wizardTwo'><button>Previous Step</button></Link>
                <Link to='/wizardFour'><button>Next Step</button></Link>
            </div>
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
