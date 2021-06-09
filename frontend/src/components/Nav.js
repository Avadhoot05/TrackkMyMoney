import React,{useContext} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'
import {loginStatusContext} from '../App'

import style from '../styles/nav.module.css'
    


function Nav() {

    const {state,} = useContext(loginStatusContext)
    return (
        <div className={`row ${style.navrow}`} >
            <div className="col-12 col-sm-12 col-md-8">

                <ul className={style.navlist}>
                    
                    <li className={style.listitem}>
                        <NavLink to="/home" className={style.listitem} >Home</NavLink>
                    </li>
                    {
                    state.flg?
                    <>
                        <li className={style.listitem}>
                            <NavLink to="/expenseslist" className={style.listitem}>Show</NavLink>
                        </li>
                        <li className={style.listitem}>
                            <NavLink to="/expensesadd" className={style.listitem}>Add</NavLink>
                        </li>
                        <li className={style.listitem}>
                            <NavLink to="/logout" className={style.listitem}>Log out</NavLink>
                        </li>
                    </>:
                    <>
                        <li className={style.listitem}>
                            <NavLink to="/signin" className={style.listitem}>Login</NavLink>
                        </li>
                        
                        <li className={style.listitem}>
                            <NavLink to="/create" className={style.listitem}>Sign up</NavLink>
                        </li>
                    </>
                    } 
                </ul>

            </div>
            <div className="col-12 col-sm-12 col-md-4">
                {
                    state.flg && <h4 className={style.username}>Hello, {state.name}</h4>
                }
                 
            </div>
        </div>

    )
}

export default Nav









// <>
// <nav className="navbar navbar-expand-lg navbar-light bg-light">

// <div class="row justify-content-between">
//     <div className="col-4">
//         <NavLink to="/" className="navbar-brand" >Home</NavLink>
//     </div>
//     <div className="col-4">
        
//         <ul className="navbar-nav">

//             {/* if user logged in then show logout button otherwise login and signup button */}
//             {
//             state.flg?
//             <>
            
//             <li className="nav-item">
//                 <NavLink to="/expenseslist" className="nav-link">Expenses List</NavLink>
//             </li>
//             <li className="nav-item">
//                 <NavLink to="/expensesadd" className="nav-link">Expenses Add</NavLink>
//             </li>

            
//                 <li className="nav-item">
//                     <NavLink to="/logout" className="nav-link">Log out</NavLink>
//                 </li>
                
//             </>
//             :(  
//             <>
//                 <li className="nav-item active">
//                     <NavLink to="/signin" className="nav-link">Login</NavLink>
//                 </li>
//                 <li className="nav-item"> 
//                     <NavLink to="/create" className="nav-link">Sign up</NavLink>
//                 </li> 
//             </>
//             )
//             } 
//         </ul>
    
//     </div>

//     <div className="col-4">
//         <ul>
//             <li className={`nav-item ${style.username}`}>
//                 <h5 className={style.username}>{state.name}</h5>
//             </li>
//         </ul>
//     </div>

//     </div>
// </nav>
// </>



