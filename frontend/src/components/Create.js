
import React, {useState} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import axios from 'axios'


import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import lime from '@material-ui/core/colors/lime';

import style from '../styles/user.module.css'




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
    textColor:{
        color:"#fff",
    }
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

function Create() {

    const [user_info, setUserinfo] = useState({name:"", email:"", pswd:"", cpswd:""})
    const [pswd_validate, setPswdValidtion] = useState(false)
    const [errorState, setErrorState] = useState({flg:false,msg:""})

    const classes = useStyles();
    const hist = useHistory()

    const submitHandler =  e=>{
            e.preventDefault()

            user_info.pswd.length<6? setPswdValidtion(true): (

            axios.post("/create",user_info)
            .then(res=>{
                if(res.status===200){
                    setErrorState({flg:true ,msg:"User registered succesfully"})
                    setTimeout(() => {
                        hist.push('/signin')
                    }, 2000);
                }   
            })
            .catch(err=>{
                console.log(err.response.status)

                switch (err.response.status) {
                    case 420:
                        setErrorState({flg:true,msg:"User Already Exists"})
                        break;
                    case 422:
                        setErrorState({flg:true,msg:"All fields are required"})
                        break;
                    case 500:
                        setErrorState({flg:true,msg:"Oops! Something went wrong"})
                        break;  
                }      
            })
            )
        }
    

    const inputHandler = e=>{

        setErrorState({flg:false ,msg:""})

        if(e.target.name==='pswd' && e.target.value.length<6){
            setPswdValidtion(true)
        }
        else if(e.target.name==='pswd'){
            setPswdValidtion(false)
        }

        setUserinfo({...user_info, [e.target.name]:e.target.value})
    }

    return (
            <>
            <h1 className={style.title}>Sign Up</h1>
            {
                errorState.flg && (<h5 className={style.alert}>{errorState.msg}</h5>)
            }

            <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <MuiThemeProvider theme={theme}>
                <form className={classes.form} onSubmit={submitHandler} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            name="name"
                            placeholder="Your Name"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            onChange={inputHandler}
                            value={user_info.name}
                            InputProps={{className: classes.textColor}}
                            autoFocus/>
                        </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            placeholder="Email Id"
                            fullWidth
                            id="email"
                            onChange={inputHandler}
                            value={user_info.email}
                            InputProps={{className: classes.textColor}}
                            name="email"/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            placeholder="Password"
                            name="pswd"
                            onChange={inputHandler}
                            value={user_info.pswd}
                            InputProps={{className: classes.textColor}}
                            type="password"
                            id="password"/>
                        {
                            pswd_validate && <h6 className={style.pswdwarning}>Password must be atleast 6 characters long</h6>
                        }
                        
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="cpswd"
                            placeholder="Confirm password"
                            onChange={inputHandler}
                            type="password"
                            value={user_info.cpswd}
                            InputProps={{className: classes.textColor}}
                            id="cpassword"/>
                    </Grid>
                </Grid>

                <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>Sign Up</Button>


                <Grid container direction="row" justify="flex-end" alignItems="center">
                    <h6 className={style.accountsuggest}>Already have an account?</h6>
                    <NavLink className={style.accountsuggestlink} to="/signin">Log in</NavLink>
                </Grid>

                </form>
                </MuiThemeProvider>
            </div>

            </Container>
            </>
    )
}

export default Create


//---------------------------------------------------------



