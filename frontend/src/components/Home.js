import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import banner from '../media/banner.webp'
import style from '../styles/Home.module.css'


function Home() {
    return (
            <div className={`container ${style.containeraddn}`}>
            <div className="row justify-content-start">
                <div className="col-6">
                    <img src={banner} className={style.bannerimg} ></img>
                </div>
                <div className="col-6 align-self-center">
                    <h1 className={style.title}>Track<br></br>My<br></br>Money</h1>
                </div>
            </div>
            </div>
    )    
}

export default Home












