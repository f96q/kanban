Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    resources :boards, only: [:show]
    resources :tasks, only: [:create, :update, :destroy] do
      member do
        put :position
      end
    end
  end

  resources :boards

  root 'boards#index'
end
