import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import { MainContainer } from '../containers'

const routes = (
  <Router>
    <Route path='/' component={MainContainer} />
  </Router>
)

export default routes