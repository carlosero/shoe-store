class Store < ApplicationRecord
  has_many :inventories
  has_many :shoe_models, through: :inventories
end
