class Board < ApplicationRecord
  has_many :columns
  has_many :user_boards
  validates :title, presence: true

  accepts_nested_attributes_for :columns, allow_destroy: true
end
