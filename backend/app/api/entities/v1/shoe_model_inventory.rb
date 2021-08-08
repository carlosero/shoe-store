class Entities::V1::ShoeModelInventory < Entities::Base
  expose :id
  expose :name do |inventory|
    inventory.shoe_model.name
  end
  expose :stock
end
