import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer } from 'containers'
import { Navigation } from 'components'
// possibly want to use later with Firebase?
// import { checkIfAuthed } from 'helpers/auth'
import { container, innerContainer } from './styles.css'
import { bindActionCreators } from 'redux'
import * as userActionCreators from 'redux/modules/users'
import { formatUserInfo } from 'helpers/utils'
import { firebaseAuth } from 'config/constants'

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
    authUser: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (this.props.location.pathname === '/') {
          this.props.history.push('/feed')
        }
      } else {
        this.props.removeFetchingUser()
      }
    })
  }

  render () {
    return this.props.isFetching === true
      ? null
      : <div className={container}>
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
            <ConditionalRoute exact={true} path='/'
              component={HomeContainer}
              condition={!this.props.isAuthed}
              redirect='/feed' />
            {/* A slightly dodgy way to redirect anything else to home / feed */}
            <ConditionalRoute
              component={HomeContainer}
              condition={false}
              redirect={this.props.isAuthed ? '/feed' : '/'} />
          </Switch>
        </div>
      </div>
  }
}

export default connect(
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}),
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(withRouter(MainContainer))
