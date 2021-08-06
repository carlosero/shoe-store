class InventoryChannel < ApplicationCable::Channel

  # sends updates through WS to the frontend
  def subscribed
    stream_from InventoryManager::INVENTORY_WS_CHANNEL
  end
end
