import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'

import Home from './../routes/Home'
import CreateGame from './../routes/GameRoutes/CreateGame'
import UpdateGame from './../routes/GameRoutes/UpdateGame'
import IndexGames from './../routes/GameRoutes/IndexGames'
import DeleteGames from './../routes/GameRoutes/DeleteGame'
import ShowGame from './../routes/GameRoutes/ShowGame'

import GamePage from './../routes/CanvasRoutes/GamePage'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],
      update: 'lol'
    }
  }

  setUser = user => this.setState({ user })

  setUpdate = update => this.setState({ update })

  clearUser = () => this.setState({ user: null })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user, update } = this.state
    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container">
          <Route exact path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} exact path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <Route exact path='/' component={Home} />

          <AuthenticatedRoute user={user} exact path='/create-games' render={() => (
            <CreateGame user={user} update={this.setUpdate}/>
          )} />

          <AuthenticatedRoute user={user} exact path='/update-game/:id' render={({ match }) => (
            <UpdateGame user={user} match={match} update={update}/>
          )} />

          <AuthenticatedRoute user={user} exact path='/index-games' render={({ match }) => (
            <IndexGames user={user}/>
          )} />

          <AuthenticatedRoute user={user} exact path='/show-game/:id' render={({ match }) => (
            <ShowGame user={user} match={match}/>
          )} />

          <AuthenticatedRoute user={user} exact path='/delete-games' render={({ match }) => (
            <DeleteGames user={user} match={match}/>
          )} />

          <AuthenticatedRoute user={user} exact path='/play-game' render={() => (
            <GamePage user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
