require 'rails_helper'

describe Endpoints::V1::Inventory do

  describe 'POST stock_updates' do

    it 'updates the inventory for the provided store, shoe_model and inventory' do
      expect(InventoryManager).to receive(:process_update!).with('Dogecorp', 'Muchsoles', 35)
      post '/api/v1/stock_updates', params: {store: 'Dogecorp', model: 'Muchsoles', inventory: 35}
    end
  end

  describe 'GET inventory' do
    before { create_list(:inventory, 3) }

    it 'returns current entire inventory' do
      body = {}

      Store.includes(inventories: :shoe_model).each do |store|
        body[store.id] = {
          name: store.name,
          shoe_models: {},
          updated_at: store.updated_at.iso8601,
          total_stock: store.inventories.sum(:stock)
        }

        store.inventories.each do |inventory|
          body[store.id][:shoe_models][inventory.shoe_model_id] = {
            name: inventory.shoe_model.name, stock: inventory.stock
          }
        end
      end

      get '/api/v1/inventory'
      expect(response.body).to eq(body.to_json)
    end
  end
end
