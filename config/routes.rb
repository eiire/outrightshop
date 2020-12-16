Rails.application.routes.draw do
  devise_for :users
  root to: 'pages#home'
  get 'pages/manager'
  get 'pages/operator'
  scope '/api' do
    resources :products, only: %i[create index update destroy]
  end
  scope '/api' do
    resources :roles, only: %i[index]
  end
end