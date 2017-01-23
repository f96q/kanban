import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Nav from '../components/Nav'
import Board from '../components/Board'
import TaskModal from '../components/TaskModal'
import { getDragStartColumnId, getDragStartId, getTaskModal, getBoard, getBoards, getOpenDropDownNavi, getCounter } from '../reducers'
import * as BoardActions from '../actions'

class App extends Component {
  render() {
    const { dragStartColumnId, dragStartId, taskModal, board, boards, openDropDownNavi, counter, actions } = this.props
    return (
      <div>
        <Nav board={board} boards={boards} openDropDownNavi={openDropDownNavi} counter={counter} actions={actions} />
        <Board dragStartColumnId={dragStartColumnId} dragStartId={dragStartId} board={board} actions={actions} />
        <TaskModal title={taskModal.title}
                   isOpen={taskModal.isOpen}
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
    boards: getBoards(state),
    openDropDownNavi: getOpenDropDownNavi(state),
    counter: getCounter(state),
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
