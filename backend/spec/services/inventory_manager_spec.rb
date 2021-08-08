require 'rails_helper'

describe InventoryManager do

  describe '#process_update!' do
    let(:store) { create :store }
    let(:shoe_model) { create :shoe_model }

    context 'when theres no inventory' do

      it 'creates the inventory' do
        expect(Inventory.exists?(store_id: store.id, shoe_model: shoe_model)).to be_falsey
        described_class.process_update!(store.name, shoe_model.name, 55)
        inventory = Inventory.last
        expect(inventory.store_id).to eq(store.id)
        expect(inventory.shoe_model_id).to eq(shoe_model.id)
        expect(inventory.stock).to eq(55)
      end
    end

    context 'when theres already an existing inventory' do
      before { create :inventory, store: store, shoe_model: shoe_model, stock: 123 }

      it 'updates the inventory' do
        described_class.process_update!(store.name, shoe_model.name, 25)
        inventory = Inventory.last
        expect(inventory.store_id).to eq(store.id)
        expect(inventory.shoe_model_id).to eq(shoe_model.id)
        expect(inventory.stock).to eq(25)
      end
    end

    it 'broadcasts the new inventory' do
      body = {
        store.id => {
          name: store.name,
          shoe_models: {
            shoe_model.id => { name: shoe_model.name, stock: 35 }
          },
          updated_at: store.updated_at.iso8601,
          total_stock: 35
        }
      }

      assert_broadcast_on(InventoryManager::INVENTORY_WS_CHANNEL, body) do
        described_class.process_update!(store.name, shoe_model.name, 35)
      end
    end
  end
end
