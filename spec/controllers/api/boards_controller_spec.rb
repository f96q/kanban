require 'rails_helper'

RSpec.describe Api::BoardsController, type: :controller do
  let(:user) { create(:user) }
  let(:board) { create(:board) }
  let!(:users_board) { create(:users_board, user: user, board: board) }

  before do
    sign_in(user)
  end

  describe '#show' do
    let(:params) { { id: board.id } }
    let(:action) { process :show, method: :get, params: params, format: :json }

    it 'should success' do
      action
      expect(response).to have_http_status(:ok)
    end
  end
end
