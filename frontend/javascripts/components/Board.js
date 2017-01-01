import React, { Component } from 'react'
import Column from './Column'

export default class Board extends Component {
  constructor(props) {
    super(props)
    this.props.actions.getBoard()
  }

  render() {
    const columns = this.props.board.columns.map((column) => {
      return (
        <Column key={column.id} column={column} actions={this.props.actions} dragStartColumnId={this.props.dragStartColumnId} dragStartId={this.props.dragStartId} />
      )
    })
    return (
      <div className="Board">
        <div className="Board-columns">{columns}</div>
      </div>
    )
  }
}
