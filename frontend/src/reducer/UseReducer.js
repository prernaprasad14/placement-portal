export const initialState= 'USER';

export const reducer = (state, action) => {
    if(action.type === 'LOGGEDIN'){
        console.log("role:1 "+state)
        return action.role;
    }
    action.role = "USER"
    console.log("role:2 "+state)
    return action.role;
}
