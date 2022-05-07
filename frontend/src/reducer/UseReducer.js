export const initialState= 'USER';

export const reducer = (state, action)=>{
    if(action.type === 'LOGGEDIN'){
        console.log("state"+state)
        return action.role;
    }
    return state;
}
