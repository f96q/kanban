class AddPomodoroToTasks < ActiveRecord::Migration[5.0]
  def change
    add_column :tasks, :estimated_pomodoro, :integer, null: false, default: 0
    add_column :tasks, :pomodoro, :integer, null: false, default: 0
  end
end
