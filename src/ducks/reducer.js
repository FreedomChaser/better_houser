//set up reducer middleware so I can send an axios.post from here with all the info
//stored from wizards
//set up userid and recommended rent

const initialState = {
    userid: '',
    property_name: '',
    property_description: '',
    address: '', 
    city: '',
    usState: '',
    zip: 0,
    img_url: '',
    img_alt: '',
    loan_amount: 0,
    monthly_mortgage: 0,
    desired_rent: 0,
    recommended_rent: 0
}

const UPDATE_USERID = 'UPDATE_USERID'
const UPDATE_PROPERTY_NAME = 'UPDATE_PROPERTY_NAME'
const UPDATE_PROPERTY_DESCRIPTION = 'UPDATE_PROPERTY_DESCRIPTION'
const UPDATE_ADDRESS = 'UPDATE_ADDRESS'
const UPDATE_CITY = 'UPDATE_CITY'
const UPDATE_US_STATE = 'UPDATE_US_STATE'
const UPDATE_ZIP = 'UPDATE_ZIP'
const UPDATE_IMG_URL = 'UPDATE_IMG_URL'
const UPDATE_IMG_ALT = 'UPDATE_IMG_ALT'
const UPDATE_LOAN_AMOUNT = 'UPDATE_LOAN_AMOUNT'
const UPDATE_MONTHLY_MORTGAGE = 'UPDATE_MONTHLY_MORTGAGE'
const UPDATE_DESIRED_RENT = 'UPDATE_DESIRED_RENT'
const UPDATE_RECOMMENDED_RENT = 'UPDATE_RECOMMENDED_RENT'

export function updateUserid(userid){
    return{
        type: UPDATE_USERID,
        payload: userid
    }
}
export function updatePropertyName(property_name){
    return{
        type: UPDATE_PROPERTY_NAME,
        payload: property_name
    }
}
export function updatePropertyDescription(property_description){
    return{
        type: UPDATE_PROPERTY_DESCRIPTION,
        payload: property_description
    }
}
export function updateAddress(address){
    return{
        type: UPDATE_ADDRESS,
        payload: address
    }
}
export function updateCity(city){
    return{
        type: UPDATE_CITY,
        payload: city
    }
}
export function updateState(usState){
    return{
        type: UPDATE_US_STATE,
        payload: usState
    }
}
export function updateZip(zip){
    return{
        type: UPDATE_ZIP,
        payload: zip
    }
}
export function updateImgUrl(img_url){
    return{
        type: UPDATE_IMG_URL,
        payload: img_url
    }
}
export function updateImgAlt(img_alt){
    return{
        type: UPDATE_IMG_ALT,
        payload: img_alt
    }
}
export function updateLoanAmount(loan_amount){
    return{
        type: UPDATE_LOAN_AMOUNT,
        payload: loan_amount
    }
}
export function updateMonthlyMortgage(monthly_mortgage){
    return{
        type: UPDATE_MONTHLY_MORTGAGE,
        payload: monthly_mortgage
    }
}
export function updateDesiredRent(desired_rent){
    return{
        type: UPDATE_DESIRED_RENT,
        payload: desired_rent
    }
}
export function updateRecommendedRent(recommended_rent){
    return{
        type: UPDATE_RECOMMENDED_RENT,
        payload: recommended_rent
    }
}

function reducer(state = initialState, action){
    switch(action.type){
        case UPDATE_USERID:
            return Object.assign({}, state, {userid: action.payload})

        case UPDATE_PROPERTY_NAME:
            return Object.assign({}, state, {property_name: action.payload})
    
        case UPDATE_PROPERTY_DESCRIPTION:
            return Object.assign({}, state, {property_description: action.payload})
    
        case UPDATE_ADDRESS:
            return Object.assign({}, state, {address: action.payload})
    
        case UPDATE_CITY:
            return Object.assign({}, state, {city: action.payload})
    
        case UPDATE_US_STATE:
            return Object.assign({}, state, {usState: action.payload})
    
        case UPDATE_ZIP:
            return Object.assign({}, state, {zip: action.payload})
    
        case UPDATE_IMG_URL:
            return Object.assign({}, state, {img_url: action.payload})
    
        case UPDATE_IMG_ALT:
            return Object.assign({}, state, {img_alt: action.payload})
    
        case UPDATE_LOAN_AMOUNT:
            return Object.assign({}, state, {loan_amount: action.payload})
    
        case UPDATE_MONTHLY_MORTGAGE:
            return Object.assign({}, state, {monthly_mortgage: action.payload})
    
        case UPDATE_DESIRED_RENT:
            return Object.assign({}, state, {desired_rent: action.payload})

        case UPDATE_RECOMMENDED_RENT:
            return Object.assign({}, state, {recommended_rent: action.payload})

    default: return state
    }
}

export default reducer