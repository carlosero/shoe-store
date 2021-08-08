class Entities::V1::Store < Entities::Base
  expose :name
  expose :inventories, as: :shoe_models do |store|
    store.inventories.inject({}) do |stock, inventory|
      stock[inventory.shoe_model_id] = Entities::V1::ShoeModelInventory.represent(inventory)
      stock
    end
  end
  expose :updated_at do |store|
    store.updated_at.iso8601
  end
  expose :total_stock do |store|
    store.inventories.sum(:stock)
  end
end
