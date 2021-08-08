FactoryBot.define do
  factory :inventory do
    store
    shoe_model
    stock { rand(100) }
  end
end
