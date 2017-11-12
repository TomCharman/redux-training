import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Authenticate } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as userActionCreators from 'redux/modules/users'

class AuthenticateContainer extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    fetchAndHandleAuthedUser: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  handleAuth = (e) => {
    e.preventDefault()
    this.props.fetchAndHandleAuthedUser()
      .then(() => this.props.history.push('feed'))
  }

  render = () => {
    return (
      <Authenticate
        isFetching={this.props.isFetching}
        error={this.props.error}
        onAuth={this.handleAuth} />
    )
  }
}

function mapStateToProps (state) {
  return {
    isFetching: state.isFetching,
    error: state.error,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(userActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AuthenticateContainer))
