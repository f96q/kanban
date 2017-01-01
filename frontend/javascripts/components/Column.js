import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import Task from './Task'

export default class Column extends Component {
  addTask(e) {
    this.props.actions.openNewTaskModal(this.props.column.id, e.clientX, e.clientY)
  }

  onDragOver(e) {
    e.preventDefault()
  }

  closestTask(target) {
    let index = this.props.column.tasks.length
    this.props.column.tasks.forEach((task, i) => {
      if (findDOMNode(this.refs[`task-${task.id}`]).contains(target)) {
        index = i
        return
      }
    })
    return index
  }

  onDrop(e) {
    e.preventDefault()
    const index = this.closestTask(e.target)
    this.props.actions.dropTask(this.props.dragStartColumnId, this.props.dragStartId, this.props.column.id, index)
  }

  render() {
    const tasks = this.props.column.tasks.map((task) => {
      return (
        <Task key={task.id} ref={`task-${task.id}`} columnId={this.props.column.id} task={task} dragStartColumnId={this.props.dragStartColumnId} dragStartId={this.props.dragStartId} actions={this.props.actions} />
      )
    })
    tasks.push((<div className="Column-dropzone" key={`dropzone-${this.props.column.id}`}></div>))
    return (
      <div className="Column">
        <div className="Column-title" onClick={::this.addTask}>{this.props.column.title}</div>
        <div className="Column-tasks" onDragOver={::this.onDragOver} onDrop={::this.onDrop}>{tasks}</div>
      </div>
    )
  }
}
