task :inventory_analysis => [:environment] do
  # let's see if there's any store that has more and can give some to another store
  low_stock_moves = {}
  
  Inventory.with_stores_and_models.low_on_stock.each do |inventory|
    inventory_with_availability = Inventory.where(shoe_model: inventory.shoe_model).with_enough_stock.order(stock: :asc).last
    if inventory_with_availability
      low_stock_moves[inventory.store.name] ||= []
      low_stock_moves[inventory.store.name].push({
        model: inventory.shoe_model.name,
        current: inventory.stock,
        from: inventory_with_availability.store.name,
        stock: inventory_with_availability.stock
      })
    end
  end

  if low_stock_moves.present?
    puts "-------------------------------------------------------------------------------------"
    puts "Detected some shoe models that must be shipped over to other stores:"
    puts "-------------------------------------------------------------------------------------"
    low_stock_moves.each do |store_name, model_details|
      suggestion = ""
      suggestion << "#{store_name} is low on the following, which other stores have plenty of:"
      model_details.each do |model_detail|
        suggestion << "\n#{model_detail[:model]} (#{model_detail[:current]}): Please ship #{(model_detail[:stock] * 0.5).to_i} units from store #{model_detail[:from]}"
      end
      puts suggestion
      puts
    end
  end

  # let's see if there's any product that's collecting dust
  has_max_stock_per_store = {}
  Inventory.with_stores_and_models.with_maximum_stock.each do |inventory|
    has_max_stock_per_store[inventory.store.name] ||= []
    has_max_stock_per_store[inventory.store.name].push(inventory.shoe_model.name)
  end

  if has_max_stock_per_store.present?
    puts "-------------------------------------------------------------------------------------"
    puts "There's some products that are in their max capacity, check why they are not selling?"
    puts "-------------------------------------------------------------------------------------"
    has_max_stock_per_store.each do |store_name, bad_products|
      puts "#{store_name}: #{bad_products.join(', ')}."
    end
  end
end
