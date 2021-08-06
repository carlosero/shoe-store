class CreateInventories < ActiveRecord::Migration[5.2]
  def change
    create_table :inventories do |t|
      t.references :store, foreign_key: true
      t.references :shoe_model, foreign_key: true
      t.integer :stock

      t.timestamps
    end
  end
end
