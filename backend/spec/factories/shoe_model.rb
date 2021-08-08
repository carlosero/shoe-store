FactoryBot.define do
  factory :shoe_model do
    name { Faker::Commerce.product_name }
  end
end
