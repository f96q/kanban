class BoardsController < ApplicationController
  before_action :set_board, only: [:update, :edit]

  def new
    @board = Board.new
  end

  def create
    @board = Board.new(board_params)
    @board.user_boards.build(user: current_user)
    if @board.save
      redirect_to edit_board_path(@board), flash: {success: 'Updated'}
    else
      render :new
    end
  end

  def update
    if @board.update(board_params)
      redirect_to edit_board_path(@board), flash: {success: 'Updated'}
    else
      render :edit
    end
  end

  def edit
  end

  def show
  end

  def set_board
    @board = Board.find(params[:id])
  end

  def board_params
    params.require(:board).permit(:title, columns_attributes: [:id, :title, :_destroy])
  end
end
