class Endpoints::V1::Base < Endpoints::Base
  version 'v1', using: :path

  mount Endpoints::V1::InventoryUpdates
end
