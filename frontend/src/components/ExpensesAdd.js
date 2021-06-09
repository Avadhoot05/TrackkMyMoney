import React,{useState, useEffect,useContext} from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'


import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import lime from '@material-ui/core/colors/lime';

import style from '../styles/ExpenseAdd.module.css'

import axios from 'axios'
import { useHistory } from 'react-router'


import {loginStatusContext} from '../App'

    
const useStyles = makeStyles((theme) => ({

    paper: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 30,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
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
        main: lime[500],
      },
      secondary:{
        main: red[500],
      },
    },
  });


function ExpensesAdd() {

    const classes = useStyles()
    const hist = useHistory()
    const [expenseinfo, setExpenseInfo] = useState({userID:{},date:new Date(),itemname:"",itemtype:"Food",currency:'₹',amount:""})
    const [errorState, setErrorState] = useState({flg:false,msg:""})


    const {state,} = useContext(loginStatusContext)

    useEffect(() => {
        state.flg ? (
            
            setExpenseInfo({...expenseinfo,userID:state.userid})
            ) : hist.push('/signin')
            
    }, [])


    const addbuttonHandler=e=>{
        e.preventDefault()
        console.log(`===${expenseinfo.date}`)
        axios.post("/expensesadd",expenseinfo)
        .then(res=>{
            if(res.status===200){
                setErrorState({flg:true,msg:"Expense added"}) 
            }
            
        })
        .catch(err=>{
            switch (err.response.status) {
                case 500:
                    setErrorState({flg:true,msg:"No user found"})
                    break;
                case 401:
                    setErrorState({flg:true,msg:"Unauthorized: No token found"})
                    break;
            
                default: return null      
            }
            
            hist.push('/signin')
            
        })
    }

    const inputHandler = e=>{
        setErrorState({flg:false,msg:""})
        setExpenseInfo({...expenseinfo, [e.target.name]:e.target.value})
    }

    const handleChange = date => {
        setErrorState({flg:false,msg:""})
        setExpenseInfo({...expenseinfo, date:date}) 
      }

    return (
        state.flg?(
 
            <Container className={style.container} component="main" maxWidth="xs">
                {
                errorState.flg && (<h5 className={style.alert}>{errorState.msg}</h5>)
                }
                <div className={classes.paper}>
                <MuiThemeProvider theme={theme}>
                    <form className={classes.form} onSubmit={addbuttonHandler} noValidate>
                        <Grid container spacing={2} direction="row" justify="space-between">
                            
                                <Grid item xs={5}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker 
                                        fullWidth 
                                        InputProps={{ className: classes.textColor}}
                                        selected={expenseinfo.date}
                                        variant="inline"
                                        views={["year", "month","date"]}
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        value={expenseinfo.date}
                                        onChange={handleChange}/>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                           
                            
                                <Grid item xs={5}>
                                    <FormControl  fullWidth variant="outlined" >
                                        <Select native className={classes.textColor} name="itemtype" onChange={inputHandler} >
                                            <option  className={classes.optionColor} disabled={true} aria-label="None" value="">Item Type</option>
                                            <option className={classes.optionColor} value="Food">Food</option>
                                            <option className={classes.optionColor} value="Travel">Travel</option>
                                            <option className={classes.optionColor} value="Accessories">Acessories</option>
                                            <option className={classes.optionColor} value="Investment">Investment</option>
                                            <option className={classes.optionColor} value="Other">Other</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            
                            
                                <Grid item xs={12}>
                                    <TextField 
                                        name="itemname"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        placeholder="Item Name"
                                        InputProps={{className: classes.textColor}}
                                        value={expenseinfo.itemname}
                                        onChange={inputHandler}/>
                                </Grid>

                                <Grid item xs={3}>
                                    <FormControl  className={style.txtcolor} variant="outlined" >
                                        <Select native name="currency" className={classes.textColor} onChange={inputHandler} >
                                            <option className={classes.optionColor} disabled={true} aria-label="None" value="">Currency</option>
                                            <option className={classes.optionColor} value="₹">₹</option>
                                            <option  className={classes.optionColor} value="$">$</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                
                                <Grid item xs={9}>
                                    <TextField
                                        
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="amount"
                                        placeholder="Amount"
                                        InputProps={{className: classes.textColor}}
                                        value={expenseinfo.amount} 
                                        onChange={inputHandler}/>
                                </Grid>
                        </Grid>

                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>Add</Button>
                    </form>
                    </MuiThemeProvider>
                </div>
                </Container>

        ):null
    )
}

export default ExpensesAdd
