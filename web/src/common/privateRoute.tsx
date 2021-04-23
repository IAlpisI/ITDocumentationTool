import React, { FunctionComponent, ReactChild, ReactChildren } from 'react'
import { Redirect } from 'react-router';
import { Route, RouteComponentProps } from 'react-router-dom';
import * as H from 'history';


interface AuxProps {
    children: any;
  }

  type Props = { 
      component?: React.ComponentType
      children?: any
      path?:string | string []
      exact?:boolean
      history?:H.History
      location?:H.Location
      match?: any

     }

// function getCookie(name:string) {
//     var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
//     console.log(document.cookie);
//     return match ? match[1] : null;
// }

const PrivateRoute = ({children, ...rest}:Props) => {
    return (
        <Route {...rest} render={() => {
            return true ? children : <Redirect to='/login' />
        }} />
    )
}

export default PrivateRoute
