class InventoryManager
  # main class for managing inventory
  # also sends updates to connected websocket clients

  # main channel to comunicate inventory updates to frontend
  INVENTORY_WS_CHANNEL = 'inventory_updates'

  class << self

    def process_update!(store_name, model_name, stock)
      store = Store.find_or_create_by(name: store_name)
      shoe_model = ShoeModel.find_or_create_by(name: model_name)
      inventory = Inventory.find_or_create_by(store: store, shoe_model: shoe_model)

      inventory.update_attributes(stock: stock)

      broadcast_update(store, shoe_model, inventory)
    end

    # This was my original code
    # def broadcast_update(store, shoe_model, inventory)
    #   # perform update just for this model and store, nothing more
    #   store_update = {
    #     id: store.id,
    #     name: store.name,
    #     shoe_models: { shoe_model.id => { name: shoe_model.name, stock: inventory.stock } }
    #   }
    #   ActionCable.server.broadcast(INVENTORY_WS_CHANNEL, store_update)
    # end

    # This is what I ended up doing after spending hours trying to fix react+state+actioncable+hooks
    def broadcast_update(*args)
      update = Store.includes(inventories: :shoe_model).inject({}) do |stores, store|
        stores[store.id] = Entities::V1::Store.represent(store)
        stores
      end
      ActionCable.server.broadcast(INVENTORY_WS_CHANNEL, update)
    end
  end
end
