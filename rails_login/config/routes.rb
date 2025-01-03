Rails.application.routes.draw do
  resource :session
  resources :passwords, param: :token

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  if Rails.env.test?
    get "/dashboard_selectors", to: "test_helpers#dashboard_selectors"
    get "/login_selectors", to: "test_helpers#login_selectors"
  end

  root "dashboard#index"
end
