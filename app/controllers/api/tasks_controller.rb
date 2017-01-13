class Api::TasksController < Api::ApplicationController
  before_action :set_column, only: [:create]
  before_action :set_task, only: [:update, :destroy, :position]

  def create
    @task = @column.tasks.new(task_params)
    Task.transaction do
      @task.save!
    end
  rescue ActiveRecord::RecordInvalid
    head :internal_server_error
  end

  def update
    head @task.update(task_params) ? :ok : :internal_server_error
  end

  def destroy
    @task.destroy
    head :ok
  end

  def position
    Task.transaction do
      if @task.column_id != params[:column_id].to_i
        @task.remove_from_list
        @task.update(column_id: params[:column_id].to_i)
      end
      @task.insert_at(params[:position].to_i)
    end
    head :ok
  rescue ActiveRecord::RecordInvalid
    head :internal_server_error
  end

  private

  def set_column
    @column = Column.includes(board: [:user_boards]).find_by(board: { user_boards: { user_id: current_user.id } }, id: params[:column_id])
    head :not_found unless @column
  end

  def set_task
    @task = Task.includes(column: {board: [:user_boards]}).find_by(column: { board: { user_boards: { user_id: current_user.id } } }, id: params[:id])
    head :not_found unless @task
  end

  def task_params
    params.require(:task).permit(:title, :description, :color)
  end
end
