import React, { Component } from 'react'
import Modal from 'react-modal'
import { TASK_COLORS, MAX_POINT } from '../constants'

export default class TaskModal extends Component {
  onChangeTitle(e) {
    this.props.actions.updateTaskModal('title', e.target.value)
  }

  onChangeDescription(e) {
    this.props.actions.updateTaskModal('description', e.target.value)
  }

  onChangeColor(e) {
    this.props.actions.updateTaskModal('color', e.target.value)
  }

  onChangeEstimatedPoint(e) {
    this.props.actions.updateTaskModal('estimatedPoint', e.target.value)
  }

  onChangePoint(e) {
    this.props.actions.updateTaskModal('point', e.target.value)
  }

  destroy() {
    this.props.actions.destroyTask(this.props.columnId, this.props.task.id)
  }

  save() {
    if (this.props.task.title == '') {
      return
    }
    const task = {
      title: this.props.task.title,
      description: this.props.task.description,
      color: this.props.task.color,
      estimatedPoint: parseInt(this.props.task.estimatedPoint),
      point: parseInt(this.props.task.point)
    }
    if (this.props.task.id) {
      this.props.actions.updateTask(this.props.columnId, this.props.task.id, task)
    } else {
      this.props.actions.createTask(this.props.columnId, task)
    }
    this.close()
  }

  close() {
    this.props.actions.closeTaskModal()
  }

  render() {
    const style = {
      content: {
        marginTop: 65
      }
    }
    const destroyButton = () => {
      return this.props.task.id ? (<button type="button" className="TaskModal-save btn btn-danger" onClick={::this.destroy}>Destroy</button>) : null
    }
    const colors = TASK_COLORS.map((color) => {
      return (<option key={color.name} value={color.value}>{color.name}</option>)
    })
    const points = [...Array(MAX_POINT + 1)].map((_, value) => {
      return (<option key={value} value={value}>{value}</option>)
    })
    return (
      <Modal className="TaskModal modal-dialog" isOpen={this.props.isOpen} style={style} contentLabel="Modal">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={::this.close}>
              <span>&times;</span>
            </button>
            <h5 className="modal-title">{this.props.title}</h5>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-control-label">Title:</label>
              <input type="text" className="form-control" onChange={::this.onChangeTitle} value={this.props.task.title}></input>
            </div>
            <div className="form-group">
               <label className="form-control-label">Description:</label>
               <textarea className="form-control" rows="7" onChange={::this.onChangeDescription} value={this.props.task.description}></textarea>
            </div>
            <div className="form-group">
               <label className="form-control-label">Color:</label>
               <select className="form-control" onChange={::this.onChangeColor} value={this.props.task.color}>{colors}</select>
            </div>
            <div className="form-group">
               <label className="form-control-label">Estimated Point:</label>
               <select className="form-control" onChange={::this.onChangeEstimatedPoint} value={this.props.task.estimatedPoint}>{points}</select>
            </div>
            <div className="form-group">
               <label className="form-control-label">Point:</label>
               <select className="form-control" onChange={::this.onChangePoint} value={this.props.task.point}>{points}</select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={::this.save}>Save</button>
            {destroyButton()}
          </div>
        </div>
      </Modal>
    )
  }
}
