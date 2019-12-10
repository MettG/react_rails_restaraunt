
breakfast = Menu.create(name:"breakfast")
lunch = Menu.create(name:"lunch")
dinner = Menu.create(name:"dinner")

8.times do 
	Item.create(
		name: Faker::Food.dish,
		description: Faker::Food.description,
		price: Faker::Number.decimal(l_digits: 2),
		menu_id: lunch.id
	)
	Item.create(
		name: Faker::Food.dish,
		description: Faker::Food.description,
		price: Faker::Number.decimal(l_digits: 2),
		menu_id: breakfast.id
	)
	Item.create(
		name: Faker::Food.dish,
		description: Faker::Food.description,
		price: Faker::Number.decimal(l_digits: 2),
		menu_id: dinner.id
	)
end

puts "Data seeded"

