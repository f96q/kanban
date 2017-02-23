class Task < ApplicationRecord
  acts_as_list scope: :column_id

  validates :title, presence: true
  validates :color, numericality: { only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 4 }

  belongs_to :column
end
