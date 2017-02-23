class RemovePointToTasks < ActiveRecord::Migration[5.0]
  def change
    remove_column :tasks, :estimated_point
    remove_column :tasks, :point
  end
end
