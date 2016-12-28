class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.integer :position
      t.references :column, null: false
      t.timestamps
    end
    add_foreign_key :tasks, :columns, column: :column_id
  end
end
