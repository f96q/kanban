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

  style() {
    const color = TASK_COLORS.find(color => color.value == this.props.task.color)
    let style = []
    style.push('Task')
    style.push(`Task--${color.name}`)
    if (this.props.task.point > 0) {
      style.push('Task--completion')
    }
    return style.join(' ')
  }

  render() {
    const point = this.props.task.estimatedPoint == 0 ? null : <span className="Task-point">{this.props.task.estimatedPoint}</span>
    return (
      <div className={this.style()} onClick={::this.edit} draggable="true" onDragStart={::this.onDragStart} onDragEnd={::this.onDragEnd}>
        {point}
        <span className="Task-title">{this.props.task.title}</span>
      </div>
    )
  }
}
