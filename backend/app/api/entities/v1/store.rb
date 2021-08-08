class Entities::V1::Store < Entities::Base
  expose :id
  expose :name
  expose :inventories, as: :shoe_models, using: Entities::V1::ShoeModelInventory
end
