class Column < ApplicationRecord
  belongs_to :board, inverse_of: :columns
  has_many :tasks, dependent: :destroy

  validates :title, presence: true
end
