

export const LoginStatusReducer = (currState, action) => {
    if(action.type==='USER_OK') return {flg:action.payload.flg,userid:action.payload.userid,name:action.payload.name}

    return currState
}

export default LoginStatusReducer
