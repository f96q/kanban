import React, { Component } from 'react'

export default class Nav extends Component {
  onClickDropDown() {
    if (this.props.boards.length == 0) {
      return
    }
    this.props.actions.toggleDropDownNavi()
  }

  render() {
    const boards = this.props.boards.map((board) => {
      return (<a key={board.id} className="dropdown-item" href={`/boards/${board.id}`}>{board.title}</a>)
    })
    const open = this.props.openDropDownNavi ? 'open' : ''
    const dropdownToggle = this.props.boards.length == 0 ? '' : 'dropdown-toggle'
    return (
      <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
        <ul className="nav navbar-nav">
          <li className={`nav-item dropdown show ${open}`} onClick={::this.onClickDropDown}>
            <span className={`nav-link active ${dropdownToggle}`}>{this.props.board.title}</span>
            <div className="dropdown-menu">{boards}</div>
            </li>
        </ul>
        <ul className="nav navbar-nav float-sm-right">
          <li className="nav-item">
            <a className="nav-link" href="/boards">Settings</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/users/sign_out" data-method="delete">LogOut</a>
          </li>
        </ul>
      </nav>
    )
  }
}
