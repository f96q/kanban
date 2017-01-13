json.extract! @board, :title

json.columns do
  json.array! @board.columns do |column|
    json.extract! column, :id, :title
    json.tasks do
      json.array! column.tasks.order(position: :asc) do |task|
        json.extract! task, :id, :title, :description, :color
      end
    end
  end
end
