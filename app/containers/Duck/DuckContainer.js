import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Duck } from 'components'
import { withRouter } from 'react-router-dom'

const { func, object, bool, number } = PropTypes

class DuckContainer extends Component {
  static propTypes = {
    duck: object.isRequired,
    numberOfLikes: number,
    isLiked: bool.isRequired,
    hideLikeCount: bool.isRequired,
    hideReplyBtn: bool.isRequired,
    handleDeleteLike: func.isRequired,
    addAndHandleLike: func.isRequired,
    history: object.isRequired,
  }

  static defaultProps = {
    hideReplyBtn: false,
    hideLikeCount: true,
  }

  goToProfile (e) {
    e.stopPropagation()
    this.props.history.push('/' + this.props.duck.uid)
  }

  handleClick (e) {
    e.stopPropagation()
    this.props.history.push('/duckDetail/' + this.props.duck.duckId)
  }

  render () {
    return (
      <div>
        <Duck
          goToProfile={this.goToProfile}
          onClick={this.props.hideReplyBtn === true ? null : this.handleClick}
          {...this.props} />
      </div>
    )
  }
}

function mapStateToProps ({ ducks, likeCount, usersLikes }, props) {
  return {
    duck: ducks[props.duckId],
    hideLikeCount: props.hideLikeCount,
    hideReplyBtn: props.hideReplyBtn,
    isLiked: usersLikes[props.duckId] === true,
    numberOfLikes: likeCount[props.duckId],
  }
}

export default connect(
  mapStateToProps
)(withRouter(DuckContainer))
