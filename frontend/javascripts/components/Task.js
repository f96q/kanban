import React, { Component } from 'react'

export default class Task extends Component {
  edit(e) {
    this.props.actions.openEditTaskModal(this.props.columnId, this.props.task.id, e.clientX, e.clientY)
    e.stopPropagation()
  }

  onDragStart() {
    this.props.actions.dragStartTask(this.props.columnId, this.props.task.id)
  }

  onDragEnd() {
    this.props.actions.dragEndTask()
  }

  render() {
    return (
      <div className="Task" onClick={::this.edit} draggable="true" onDragStart={::this.onDragStart} onDragEnd={::this.onDragEnd}>
        <div className="Task-title">{this.props.task.title}</div>
      </div>
    )
  }
}
