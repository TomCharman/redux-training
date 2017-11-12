import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer } from 'containers'
import { Navigation } from 'components'
// possibly want to use later with Firebase?
import { checkIfAuthed } from 'helpers/auth'
import { container, innerContainer } from './styles.css'

const ConditionalRoute = ({ component: Component, condition, redirect, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      condition ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: redirect,
          state: { from: props.location },
        }}/>
      )
    )}/>
  )
}

ConditionalRoute.propTypes = {
  component: PropTypes.func.isRequired,
  condition: PropTypes.bool.isRequired,
  redirect: PropTypes.string.isRequired,
}

class MainContainer extends React.Component {
  static propTypes = {
    isAuthed: PropTypes.bool.isRequired,
  }

  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          <Switch>
            <ConditionalRoute path='/auth'
              component={AuthenticateContainer}
              condition={!this.props.isAuthed}
              redirect='/feed' />
            <ConditionalRoute path='/feed'
              component={FeedContainer}
              condition={this.props.isAuthed}
              redirect='/auth' />
            <Route path='/logout' component={LogoutContainer} />
            <ConditionalRoute path='/'
              component={HomeContainer}
              condition={!this.props.isAuthed}
              redirect='/feed' />
          </Switch>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({isAuthed: state.isAuthed})
)(MainContainer)
