import React from 'react'
import { render as Render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect, useParams } from 'react-router-dom'


/** Universal styles. */
import './universal.scss'

/** Setup page. */
import Setup from './pages/setup'

/** General pages. */
import Home from './pages/home'
import Login from './pages/login'
import Admin from './pages/admin'

/** Library and media pages. */
import Library from './pages/library'
import Media from './pages/media'

/** Status pages. */
import NotFound from './pages/404'
import NotAuthorized from './pages/401'


/**
 * Initialize the React application.
 */

const Application = () => {


  /**
   * PrivateRoute
   */

  function PrivateRoute({children, ...rest}) {

    const authenticated = false

    return <Route {...rest} render={({location}) => 
           authenticated ? (children) : (
           <Redirect to={{ pathname: "/login", state: {from: location} }}/>
           )}/>

  }


  /**
   * AdminRoute
   */

  function AdminRoute({children, ...rest}) {

    const authenticated = false
    const isAdmin = false

    return <Route {...rest} render={({location}) => 
           (authenticated && isAdmin) ? (children) : (
           <NotAuthorized/>
           )}/>

  }


  const LoadLibrary = () => {

    return <Library params={useParams()} />

  }

  const LoadMedia = () => {

    return <Media params={useParams()} />

  }

  const isSetup = true

  if(isSetup) {

    return <Router>
           <Switch>

             <Route exact path="/setup">
               <Redirect to={{ pathname: "/"}}/>
             </Route>

             <PrivateRoute exact path="/">
               <Home/>
             </PrivateRoute>

             <Route exact path="/login">
               <Login/>
             </Route>

             <AdminRoute exact path="/admin">
               <Admin/>
             </AdminRoute>

             <PrivateRoute exact path="/:library">
               <LoadLibrary/>
             </PrivateRoute>

             <PrivateRoute exact path="/:library/:media">
               <LoadMedia/>
             </PrivateRoute>

             <PrivateRoute>
               <NotFound/>
             </PrivateRoute>

           </Switch>
         </Router>

  }else{

    return <Router>
             <Switch>
               <Route exact path="/setup">
                 <Setup/>
               </Route>
               <Redirect to={{ pathname: "/setup"}}/>
             </Switch>
           </Router>

  }

}


/**
 * Render the React application.
 */

Render(<Application/>, document.getElementById('main'));
