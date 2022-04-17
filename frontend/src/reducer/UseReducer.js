export const initialState= "user";

export const reducer = (state, action)=>{
    if(action.type === 'user'){
        console.log("action.payload")
        console.log(action.payload)
        return action.payload;
    }
    if(action.type === 'admin'){
        console.log("action.payload")
        console.log(action.payload)
        return action.payload
    }
    if(action.type === 'scholar'){
        console.log("action.payload")
        console.log(action.payload)
        return action.payload
    }
    if(action.type === 'company'){
        console.log("action.payload")
        console.log(action.payload)
        return action.payload
    }
    return state;
}