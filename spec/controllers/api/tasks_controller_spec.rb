require 'rails_helper'

RSpec.describe Api::TasksController, type: :controller do
  let(:user) { create(:user) }
  let(:board) { create(:board) }
  let!(:users_board) { create(:users_board, user: user, board: board) }

  before do
    sign_in(user)
  end

  describe '#create' do
    let(:column) { board.columns.first }
    let(:params) { { column_id: column.id , task: { title: 'new title', description: 'new description' } } }
    let(:action) { process :create, method: :post, params: params, format: :json }

    it 'should success' do
      action
      expect(response).to have_http_status(:ok)
    end
  end

  describe '#update' do
    let(:task) { board.columns.first.tasks.first }
    let(:params) { { id: task.id, task: { tile: 'update title', description: 'update description' } } }
    let(:action) { process :update, method: :put, params: params }

    it 'should success' do
      action
      expect(response).to have_http_status(:ok)
    end
  end

  describe '#destroy' do
    let(:task) { board.columns.first.tasks.first }
    let(:params) { { id: task.id } }
    let(:action) { process :destroy, method: :delete, params: params }

    it 'should success' do
      action
      expect(response).to have_http_status(:ok)
    end
  end

  describe '#position' do
    let(:column) { board.columns.first }
    let(:task) { column.tasks.first }
    let(:params) { { id: task.id, column_id: column.id, position: 2 } }
    let(:action) { process :position, method: :put, params: params }

    it 'should success' do
      action
      expect(response).to have_http_status(:ok)
    end
  end
end
