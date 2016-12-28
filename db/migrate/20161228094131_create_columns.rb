class CreateColumns < ActiveRecord::Migration[5.0]
  def change
    create_table :columns do |t|
      t.string :title, null: false
      t.references :board, null: false
      t.timestamps
    end
    add_foreign_key :columns, :boards, column: :board_id
  end
end
