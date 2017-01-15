class Api::BoardsController < Api::ApplicationController
  def show
    @board = Board.includes(:user_boards).find_by(user_boards: {user_id: current_user.id}, id: params[:id])
    head :not_found unless @board
  end
end
