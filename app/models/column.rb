class Column < ApplicationRecord
  belongs_to :board, inverse_of: :columns
  has_many :tasks

  validates :title, presence: true
end
