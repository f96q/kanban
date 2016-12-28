class Board < ApplicationRecord
  has_many :columns
  has_many :user_boards
end
