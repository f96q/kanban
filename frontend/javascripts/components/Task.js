import React, { Component } from 'react'
import { TASK_COLORS } from '../constants/ActionTypes'

export default class Task extends Component {
  edit() {
    this.props.actions.openEditTaskModal(this.props.columnId, this.props.task.id)
  }

  onDragStart() {
    this.props.actions.dragStartTask(this.props.columnId, this.props.task.id)
  }

  onDragEnd() {
    this.props.actions.dragEndTask()
  }

  color() {
    const color = TASK_COLORS.find(color => color.value == this.props.task.color)
    return color.name
  }

  render() {
    return (
      <div className={`Task Task--` + this.color()} onClick={::this.edit} draggable="true" onDragStart={::this.onDragStart} onDragEnd={::this.onDragEnd}>
        <div className="Task-title">{this.props.task.title}</div>
      </div>
    )
  }
}
