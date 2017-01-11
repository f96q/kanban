import React, { Component } from 'react'
import Modal from 'react-modal'

export default class TaskModal extends Component {
  onChangeTitle(e) {
    this.props.actions.updateTaskModal('title', e.target.value)
  }

  onChangeDescription(e) {
    this.props.actions.updateTaskModal('description', e.target.value)
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
      description: this.props.task.description
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
    return (
      <Modal className="TaskModal modal-dialog" isOpen={this.props.isOpen} style={style} contentLabel="Modal">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" onClick={::this.close}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-control-label">Title:</label>
              <input type="text" className="form-control" onChange={::this.onChangeTitle} value={this.props.task.title}></input>
            </div>
            <div className="form-group">
               <label className="form-control-label">Description:</label>
               <textarea className="form-control" rows="10" onChange={::this.onChangeDescription} value={this.props.task.description}></textarea>
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
