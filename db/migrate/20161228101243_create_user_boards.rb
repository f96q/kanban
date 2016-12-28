class CreateUserBoards < ActiveRecord::Migration[5.0]
  def change
    create_table :user_boards do |t|
      t.references :user, null: false
      t.references :board, null: false
      t.timestamps
    end
    add_foreign_key :users_boards, :users, column: :user_id
    add_foreign_key :users_boards, :boards, column: :board_id
  end
end
