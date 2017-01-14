class Board < ApplicationRecord
  has_many :columns, inverse_of: :board, dependent: :destroy
  has_many :user_boards, dependent: :destroy
  has_many :users, through: :user_boards
  validates :title, presence: true

  accepts_nested_attributes_for :columns, allow_destroy: true
end
