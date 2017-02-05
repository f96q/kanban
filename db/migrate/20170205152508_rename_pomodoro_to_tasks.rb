class RenamePomodoroToTasks < ActiveRecord::Migration[5.0]
  def change
    rename_column :tasks, :estimated_pomodoro, :estimated_point
    rename_column :tasks, :pomodoro, :point
  end
end
