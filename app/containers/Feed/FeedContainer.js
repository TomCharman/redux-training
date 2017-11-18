import React, { Component } from 'react'
import { Feed } from 'components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as FeedActionCreators from 'redux/modules/feed'

class FeedContainer extends Component {
  static propTypes = {
    newDucksAvailable: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    setAndHandleFeedListener: PropTypes.func.isRequired,
    resetNewDucksAvailable: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    // set a listener to ducks
    this.props.setAndHandleFeedListener()
  }

  render () {
    return (
      <Feed
        newDucksAvailable={this.props.newDucksAvailable}
        error={this.props.error}
        isFetching={this.props.isFetching}
        resetNewDucksAvailable={this.props.resetNewDucksAvailable} />
    )
  }
}

function mapStateToProps ({feed}) {
  const { newDucksAvailable, error, isFetching } = feed
  return {
    newDucksAvailable,
    error,
    isFetching,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(FeedActionCreators, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedContainer)
