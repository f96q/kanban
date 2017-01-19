json.boards do
  json.array! @boards do |board|
    json.extract! board, :id, :title
  end
end

json.board do
  json.extract! @board, :id, :title
  json.columns do
    json.array! @board.columns do |column|
      json.extract! column, :id, :title
      json.tasks do
        json.array! column.tasks.order(position: :asc) do |task|
          json.extract! task, :id, :title, :description, :color, :estimated_pomodoro, :pomodoro
        end
      end
    end
  end
end
