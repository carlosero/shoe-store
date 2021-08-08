class Inventory < ApplicationRecord
  belongs_to :store
  belongs_to :shoe_model

  scope :low_on_stock, -> { where("stock < 10") }
  scope :with_maximum_stock, -> { where(stock: 100) }

  scope :with_enough_stock, -> { where("stock >= 50") }

  scope :with_stores_and_models, -> { includes(:store, :shoe_model) }
end
