import './App.css';
import React, {useReducer} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


import Nav from './components/Nav'
import Home from './components/Home'
import Create from './components/Create'
import Signin from './components/Signin'
import ExpensesList from './components/ExpensesList'
import ExpensesAdd from './components/ExpensesAdd'
import Stats from './components/Stats'
import Logout from './components/Logout'


import {LoginStatusReducer} from './components/reducers/LoginStatusReducer'

export const loginStatusContext  = React.createContext()


function App() {
  const [state, dispatch] = useReducer(LoginStatusReducer, {flg:false,name:null})

  return (
    <loginStatusContext.Provider value={{state,dispatch}}>
    <Router>
    <div className="App">
        <Nav/>
        <Switch>
        <Route exact path="/home" component={Home}/>
          <Route exact path="/" component={Home}/>
          <Route exact path="/create" component={Create}/>
          <Route exact path="/signin" component={Signin}/>
          <Route exact path="/expenseslist" component={ExpensesList}/>
          <Route exact path="/expensesadd" component={ExpensesAdd}/>
          <Route exact path="/stats" component={Stats}/>
          <Route exact path="/logout" component={Logout}/>
        </Switch>
    </div>
    </Router>
    </loginStatusContext.Provider>

  );
}

export default App;
