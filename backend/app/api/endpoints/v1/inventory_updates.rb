class Endpoints::V1::InventoryUpdates < Endpoints::V1::Base
  resource :stock_updates do

    desc 'Receives inventory updates and processes them'
    post do
      InventoryManager.process_update!(params[:store], params[:model], params[:inventory].to_i)
    end
  end
end
