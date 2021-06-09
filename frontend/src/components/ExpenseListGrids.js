import React from 'react'

import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import lime from '@material-ui/core/colors/lime';


import style from '../styles/ExpenseList.module.css'


const theme = createMuiTheme({
  palette: {
    primary: 
    {
      main: lime[500],
    },
    secondary:{
      main: lime[500],
    },
  },
});


export default function ExpenseListGrids(prop) {

const {response} = prop

    const renderData = response.map(obj=>{

      return (

        <MuiThemeProvider theme={theme}>
          <Grid key={obj._id}  item> 
              <CardContent className={style.card} >
                <Typography gutterBottom>{obj.date.date}/{obj.date.month}/{obj.date.year}</Typography>
                <Typography variant="h4" component="h2" color="primary">{obj.itemname}</Typography>
                <Typography className={style.pos}>{obj.itemtype}</Typography>
                <Typography className={style.amounttext} component="p">{obj.currency} {obj.amount}</Typography>
              </CardContent>
            
          </Grid>
        </MuiThemeProvider>
      )
    })

    
    return (
        <div>
            
              <Grid Container className={style.gridcontainer} justify="center" item xs={11}>
                <Grid container justify="center" spacing={1}>
                  {renderData}
                </Grid>
              </Grid>
            
            
        </div>
    )
}


