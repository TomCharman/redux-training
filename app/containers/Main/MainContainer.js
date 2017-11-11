import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomeContainer, AuthenticateContainer } from 'containers'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'

class MainContainer extends React.Component {
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={false} />
        <div className={innerContainer}>
          <Switch>
            <Route path='/auth' component={AuthenticateContainer} />
            <Route path='/' component={HomeContainer} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default MainContainer
