class Endpoints::V1::Inventory < Endpoints::V1::Base
  resource :stock_updates do
    desc 'Receives inventory updates and processes them'
    post do
      InventoryManager.process_update!(params[:store], params[:model], params[:inventory].to_i)
    end
  end

  resource :inventory do
    desc 'Returns the current status of all stores + models'
    get do
      present Store.includes(inventories: :shoe_model), with: Entities::V1::Store
    end
  end
end
