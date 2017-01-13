import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Nav from '../components/Nav'
import Board from '../components/Board'
import TaskModal from '../components/TaskModal'
import { getDragStartColumnId, getDragStartId, getTaskModal, getBoard } from '../reducers'
import * as BoardActions from '../actions'

class App extends Component {
  render() {
    const { dragStartColumnId, dragStartId, taskModal, board, actions } = this.props
    return (
      <div>
        <Nav board={board} />
        <Board dragStartColumnId={dragStartColumnId} dragStartId={dragStartId} board={board} actions={actions} />
        <TaskModal isOpen={taskModal.isOpen}
                   columnId={taskModal.columnId}
                   task={taskModal.task}
                   actions={actions} />
     </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    dragStartColumnId: getDragStartColumnId(state),
    dragStartId: getDragStartId(state),
    taskModal: getTaskModal(state),
    board: getBoard(state),
    actions: state.actions
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(BoardActions, dispatch) }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
