Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'

  resources :home, only: %i(index create)
  resources :questions, only: %i(index)

  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :questions
    end
  end
end
