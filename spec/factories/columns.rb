FactoryGirl.define do
  factory :column do
    title 'today'

    after(:create) do |column|
      column.tasks << create(:task, column: column)
    end
  end
end
