FactoryGirl.define do
  factory :board do
    title 'todo'

    after(:create) do |board|
      board.columns << create(:column, board: board)
    end
  end
end
