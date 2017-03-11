require 'rails_helper'

RSpec.describe BoardsController, type: :controller do
  let(:user) { create(:user) }

  before do
    sign_in(user)
  end

  describe '#index' do
    let(:board) { create(:board) }
    let!(:users_board) { create(:users_board, user: user, board: board) }
    let(:action) { process :index, method: :get }

    it 'should success' do
      action
      expect(response).to have_http_status(:ok)
    end
  end

  describe '#create' do
    let(:params) do
      {
        board: {
          title: 'title',
          columns_attributes: {
            '0' => { 'title' => 'column1' },
            '1' => { 'title' => 'column2' },
          }
        }
      }
    end
    let(:action) { process :create, method: :post, params: params }
    let(:board) { Board.last }

    it 'should success' do
      action
      expect(response).to have_http_status(302)
      expect(board.users.first).to eq(user)
      expect(board.title).to eq('title')
      expect(board.columns[0].title).to eq('column1')
      expect(board.columns[1].title).to eq('column2')
    end
  end

  describe '#update' do
    let(:board) { create(:board) }
    let!(:users_board) { create(:users_board, user: user, board: board) }
    let(:params) do
      {
        id: board.id,
        board: {
          title: 'plan',
          columns_attributes: {
            '0' => { 'title' => 'done', '_destroy' => '0', 'id' => board.columns[0].id }
          }
        }
      }
    end

    let(:action) { process :update, method: :put, params: params }

    it 'should success' do
      action
      board.reload
      expect(response).to have_http_status(302)
      expect(board.title).to eq('plan')
      expect(board.columns[0].title).to eq('done')
    end
  end

  describe '#destroy' do
    let(:board) { create(:board) }
    let!(:users_board) { create(:users_board, user: user, board: board) }
    let(:params) do
      {
        id: board.id
      }
    end

    let(:action) { process :destroy, method: :delete, params: params }

    it 'should success' do
      action
      expect(response).to have_http_status(302)
      expect { board.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
