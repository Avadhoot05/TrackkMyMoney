import React, {useState, useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import axios from 'axios'
import {loginStatusContext} from '../App'

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textColor:{
    color:"#fff",
}
}))

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

function Signin() {
    const classes = useStyles();

    const {dispatch,} = useContext(loginStatusContext)

    const hist = useHistory()
    const [user_info_login, setUserinfoLogin] = useState({email:"", pswd:""})


    const submitHandler = e=>{
        e.preventDefault()

        axios.post("/signin",user_info_login)
        .then(res=>{
            if(res.status===200){
                dispatch({type:'USER_OK',payload:{flg:true,userid:res.data._id,name:res.data.name}})
                console.log("Login Sucessful")
                hist.push('/')
            } 
        })
        .catch(err=>{
            switch (err.response.status) {
                case 420:
                    break;
                
                case 400:
                    break;
                default:
                    return null
            }    
        })
    }
               
    const inputHandler = e=>{
        setUserinfoLogin({...user_info_login, [e.target.name]:e.target.value})
    }

    return (
      <>

      <h1 className={style.title}>Log in</h1>



      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>

          <MuiThemeProvider theme={theme}>
            <form className={classes.form} onSubmit={submitHandler} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="email"
                value={user_info_login.email} 
                onChange={inputHandler}
                placeholder="Email"
                InputProps={{className: classes.textColor}}
                autoFocus/>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="pswd"
                value={user_info_login.pswd} 
                placeholder="Password"
                onChange={inputHandler}
                InputProps={{className: classes.textColor}}
                type="password"/>

              <Button type="submit" fullWidth variant="contained" color="secondary" className={classes.submit}>Log in</Button>
              
              <Grid container direction="row" justify="flex-end" alignItems="center">
                  <h6 className={style.accountsuggest}>Don't have an acoount?</h6>
                  <NavLink className={style.accountsuggestlink} to="/create">Sign up</NavLink>
              </Grid>
            </form>
          </MuiThemeProvider>
        </div>
      </Container>
      </>
    );
}

export default Signin