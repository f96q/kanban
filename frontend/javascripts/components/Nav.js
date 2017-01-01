import React, { Component } from 'react'

export default class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
        <span className="navbar-brand">{this.props.board.title}</span>
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/users/sign_out">LogOut</a>
          </li>
        </ul>
      </nav>
    )
  }
}
