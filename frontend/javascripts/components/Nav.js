import React, { Component } from 'react'

export default class Nav extends Component {
  onClickDropDown() {
    if (this.props.boards.length == 0) {
      return
    }
    this.props.actions.toggleDropDownNavi()
  }

  onClickIncrementPomodoro() {
    this.props.actions.incrementPomodoro()
  }

  onClickResetPomodoro() {
    this.props.actions.resetPomodoro()
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
          <li className="nav-item">
            <div className="btn-group">
              <button className="btn btn-success" type="button" onClick={::this.onClickIncrementPomodoro}>Count</button>
              <button className="btn btn-warning" type="button" onClick={::this.onClickResetPomodoro}>Reset</button>
            </div>
          </li>
          <li className="nav-item">
            <span className="nav-link active">{this.props.counter}</span>
          </li>
          <li className="nav-item float-sm-right">
            <a className="nav-link" href="/users/sign_out">LogOut</a>
          </li>
        </ul>
      </nav>
    )
  }
}
