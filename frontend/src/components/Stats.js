import React from 'react'
import style from '../styles/ExpenseList.module.css'


const Stats = (props) => {

  const {response,filter,type}=props.props

  const amount = {Food:{'₹':0,'$':0},Travel:{'₹':0,'$':0},Accessories:{'₹':0,'$':0},Investment:{'₹':0,'$':0},Other:{'₹':0,'$':0}}

        
  response.map(obj=>{
      amount[obj.itemtype][obj.currency] += Number(obj.amount)
  })

  return(
    filter.type ?(
      <>
        <div className={`${style.briefcardcontainer}`}>
          <h2 className={style.briefcardtitle}>{type}</h2>
          <div className={style.briefcardamtcontainer}>
            <h4 className={style.briefcardamt}>₹ {amount[type]['₹']}</h4>
            <h4 className={style.briefcardamt}>$ {amount[type]['$']}</h4>
          </div>
        </div>
      </>

    ):(
      <>

        <div className={style.briefgrid}>
        <div className={`${style.briefcardcontainer} ${style.briefcardcontainer1}`}>
          <h2 className={style.briefcardtitle}>{'Food'}</h2>
          <div className={style.briefcardamtcontainer}>
            <h4 className={style.briefcardamt}>₹ {amount['Food']['₹']}</h4>
            <h4 className={style.briefcardamt}>$ {amount['Food']['$']}</h4>
          </div>
        </div>

        <div className={`${style.briefcardcontainer} ${style.briefcardcontainer1}`}>
          <h2 className={style.briefcardtitle}>{'Travel'}</h2>
          <div className={style.briefcardamtcontainer}>
            <h4 className={style.briefcardamt}>₹ {amount['Travel']['₹']}</h4>
            <h4 className={style.briefcardamt}>$ {amount['Travel']['$']}</h4>
          </div>
        </div>

        <div className={`${style.briefcardcontainer} ${style.briefcardcontainer1}`}>
          <h2 className={style.briefcardtitle}>{'Accessories'}</h2>
          <div className={style.briefcardamtcontainer}>
            <h4 className={style.briefcardamt}>₹ {amount['Accessories']['₹']}</h4>
            <h4 className={style.briefcardamt}>$ {amount['Accessories']['$']}</h4>
          </div>
        </div>

        <div className={`${style.briefcardcontainer} ${style.briefcardcontainer1}`}>
          <h2 className={style.briefcardtitle}>{'Investment'}</h2>
          <div className={style.briefcardamtcontainer}>
            <h4 className={style.briefcardamt}>₹ {amount['Investment']['₹']}</h4>
            <h4 className={style.briefcardamt}>$ {amount['Investment']['$']}</h4>
          </div>
        </div>

        <div className={`${style.briefcardcontainer} ${style.briefcardcontainer1}`}>
          <h2 className={style.briefcardtitle}>{'Other'}</h2>
          <div className={style.briefcardamtcontainer}>
            <h4 className={style.briefcardamt}>₹ {amount['Other']['₹']}</h4>
            <h4 className={style.briefcardamt}>$ {amount['Other']['$']}</h4>
          </div>
        </div>
          
        </div>

      </>
    )
  )



}

export default Stats

