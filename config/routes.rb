Rails.application.routes.draw do
  root to: 'pages#home'
  get 'yo/yo'
  resources :products, only: %i[create index update destroy]
end