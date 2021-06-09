import React, {useEffect,useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {loginStatusContext} from '../App'
 
function Logout() {

    
    const {dispatch,} = useContext(loginStatusContext)

    const hist  = useHistory()
    const logoutHandler =  ()=>{
        axios.get('/logout',{
                            headers:{
                            "Content-Type":"application/json"
                            },
                            withCredentials:"include"
                })
                .then((response) => {
                    if(response.status===200){
                        dispatch({type:'USER_OK',payload:{flg:false,name:null}})
                        hist.push('/')
                    } 
                    else alert("Logout failed")
                })
                .catch(error=>{
                    console.log(error)
            })
    }

    useEffect(() => {
        logoutHandler()
        
    }, [])

    return (
        <>
            
        </>
    )
}

export default Logout
