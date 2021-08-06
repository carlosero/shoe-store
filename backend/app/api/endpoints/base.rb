class Endpoints::Base < Grape::API
  format :json
  prefix :api

  mount Endpoints::V1::Base
end
