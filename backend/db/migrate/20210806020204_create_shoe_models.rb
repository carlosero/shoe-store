class CreateShoeModels < ActiveRecord::Migration[5.2]
  def change
    create_table :shoe_models do |t|
      t.string :name

      t.timestamps
    end
  end
end
