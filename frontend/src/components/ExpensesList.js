import React,{useEffect, useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography'
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import ExpenseListGrids from './ExpenseListGrids'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import red from '@material-ui/core/colors/red';
import lime from '@material-ui/core/colors/lime';

import style from '../styles/ExpenseList.module.css'
import {loginStatusContext} from '../App'
import Stats from './Stats'


const useStyles = makeStyles((theme) => ({
  link: {
    color:"#CDDC39",
    cursor:"pointer",
    textTransform:"uppercase",
    '&:hover': {
       color: "#F44336",
       textDecoration:'none',
    },
  },
    textColor:{
      color:"#fff",
  },      
  optionColor:{
      
      color:"#000",
  },
}));


const theme = createMuiTheme({
  palette: {
    primary: 
    {
      main: red[500],
    },
    secondary:{
      main: lime[500],
    },
  },
});

var type=""


function ExpensesList() {

  const hist = useHistory()
  const classes = useStyles()
  const [response, setRes] = useState([])
  const [datepicker, setDatePicker] = useState(new Date())
  const [filter, setFilter] = useState({date:false,month:false, year:false, type:false})
  const [UserID, setUserID] = useState(null)
  const [stats,setStats] = useState(false)

  const {state,} = useContext(loginStatusContext)


    useEffect(() => state.flg ? setUserID(state.userid) : hist.push('/signin'), [])

    const handleChange = date => {
      setDatePicker(date)
      console.log(date)
    }
    
    const filterResponse = ()=>{

      axios.post('/expenseslist',{datepicker,type,filter,UserID})
      .then(res =>{
        setRes(res.data)
      })
      .catch(err=>{
          console.log(`list error${err}`)
      })
    }


    return (
      state.flg?(
        
        <div className={style.expenseslistcomp}>

              <h1 className={style.title}>See all your expenses here </h1> 
              <div className={style.filtercontainer}>

              <MuiThemeProvider theme={theme}>
              <div className={style.flexcol}>
                <Button onClick={()=>setFilter({...filter, date:!filter.date, month:false, year:false})} 
                        variant="outlined" color="primary">By Date</Button>
                {
                  filter.date && (
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker  
                                          fullWidth 
                                          selected={datepicker}
                                          InputProps={{ className: classes.textColor}}
                                          value={datepicker}
                                          variant="inline"
                                          name="datepicker"
                                          views={["year", "month","date"]}
                                          format="dd/MM/yyyy"
                                          margin="normal"
                                          onChange={handleChange}/>
                                    </MuiPickersUtilsProvider>
                  
                  )
                }
              </div>
              </MuiThemeProvider> 

              <div className={style.flexcol}>
                <Button onClick={()=>setFilter({...filter, date:false, month:!filter.month, year:false})} variant="outlined" color="primary">By Month</Button>
                {
                  (!filter.date && filter.month) && (
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker  
                                      fullWidth 
                                      InputProps={{ className: classes.textColor}}
                                      value={datepicker}
                                      selected={datepicker}
                                      views={["year", "month"]}
                                      variant="inline"
                                      name="datepicker"
                                      margin="normal"
                                      onChange={handleChange}/>
                                </MuiPickersUtilsProvider>
                                )
                }
              </div>
              
              <div className={style.flexcol}>
                <Button onClick={()=>setFilter({...filter, date:false, month:false, year:!filter.year})} variant="outlined" color="primary">By Year</Button>
                {
                  (!filter.date && !filter.month && filter.year) && (
                                                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                      <KeyboardDatePicker  
                                                        fullWidth 
                                                        InputProps={{ className: classes.textColor}}
                                                        value={datepicker}
                                                        selected={datepicker}
                                                        views={["year"]}
                                                        variant="inline"
                                                        name="datepicker"
                                                        margin="normal"
                                                        onChange={handleChange}/>
                                                  </MuiPickersUtilsProvider>
                )
                }
              </div>

              <div className={style.flexcol}>
                <Button onClick={()=>setFilter({...filter, type:!filter.type})} variant="outlined" color="primary">By Type</Button>
                {
                  filter.type && (  
                    <FormControl  fullWidth >
                        <Select native className={classes.textColor} defaultValue={type} name="itemtype" onChange={e=>type=e.target.value} >
                            <option  className={classes.optionColor} disabled={true} aria-label="None" value="">Item Type</option>
                            <option className={classes.optionColor} value="Food">Food</option>
                            <option className={classes.optionColor} value="Travel">Travel</option>
                            <option className={classes.optionColor} value="Accessories">Acessories</option>
                            <option className={classes.optionColor} value="Investment">Investment</option>
                            <option className={classes.optionColor} value="Other">Other</option>
                        </Select>
                    </FormControl>
                  // <select className={`custom-select mr-sm-2 ${style.typeselect}`} defaultValue={type} onChange={e=>type=e.target.value} id="inlineFormCustomSelect">
                    
                  //   <option value="Food">Food</option>
                  //   <option value="Travel">Travel</option>
                  //   <option value="Accessories">Acessories</option>
                  //   <option value="Investment">Investment</option>
                  //   <option value="Other">Other</option>
                  // </select>
                  )
                }
             </div>

                <div>
                <MuiThemeProvider theme={theme}>


                  {
                    (filter.type || filter.date || filter.month || filter.year)?
                    <Button variant="contained" color="secondary" onClick={filterResponse}>Filter</Button>
                    :<Button variant="contained" color="secondary" onClick={filterResponse}>Display All</Button>
                  }
                  
                
                </MuiThemeProvider>
                </div>

                </div>
  
                
                {
                  
                response.length!=0 && (
                  
                <div className={style.linkcont}>

                  <MuiThemeProvider theme={theme}>
                    <Typography className={classes.root}>
                        <Link color="secondary" className={classes.link} onClick={()=>setStats(!stats)}>CLick here for Brief Details</Link>
                    </Typography>
                  </MuiThemeProvider>
                  {
                    
                    stats&& (
                      <>
                        <hr className={style.line}></hr>
                        <Stats props={{response,filter,type}}/>
                      </>
                      
                      
                    )
                  }
                </div>
                )
                }
                
                <>
                <hr className={style.line}></hr>
                {
                  response.length!=0 ? <ExpenseListGrids response={response}/>: <h1 className={style.title}>No data found</h1>
                }
                
                </>
                

            </div>
      ):null
         
    )
    
}

export default ExpensesList