import React, { useEffect } from "react"
import PropTypes from 'prop-types'
import { Route, Redirect } from "react-router-dom"

const AppRoute = ({
  settings: settings,
  component: Component,
  layout: Layout,
  isAuthProtected,
  ...rest
}) => {

  useEffect(() => {
    if (settings) {
      localStorage.setItem("Menu", "Settings");
    } else {
      localStorage.setItem("Menu", "Dashboard");
    }
  }, [settings])



  return <Route
    {...rest}
    render={props => {
      if (isAuthProtected && !localStorage.getItem("authUser")) {

        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }}
  />
}

AppRoute.propTypes = {
  isAuthProtected: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any
}

export default AppRoute
