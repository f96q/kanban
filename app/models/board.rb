class Board < ApplicationRecord
  has_many :columns, inverse_of: :board
  has_many :user_boards
  has_many :users, through: :user_boards
  validates :title, presence: true

  accepts_nested_attributes_for :columns, allow_destroy: true
end
