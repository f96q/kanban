class RenameUserBoardsToUsersBoards < ActiveRecord::Migration[5.0]
  def change
    rename_table :user_boards, :users_boards
    add_index :users_boards, [:user_id, :board_id], unique: true
  end
end
