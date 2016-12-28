class Task < ApplicationRecord
  acts_as_list scope: :column_id
end
