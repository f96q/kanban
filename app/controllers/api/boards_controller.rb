class Api::BoardsController < Api::ApplicationController
  def show
    @boards = Board.includes(:user_boards).where(user_boards: {user_id: current_user.id})
    @board = @boards.find { |board| board.id.to_s == params[:id] }
    @boards = @boards.reject { |board| board.id == @board.id }
    head :not_found unless @board
  end
end
