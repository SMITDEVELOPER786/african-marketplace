-- Seed initial categories
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Grains & Cereals', 'grains-cereals', 'Rice, millet, sorghum, and other grains', 1),
  ('Spices & Seasonings', 'spices-seasonings', 'Traditional African spices and seasonings', 2),
  ('Flours & Starches', 'flours-starches', 'Cassava, yam, plantain flour and more', 3),
  ('Oils & Fats', 'oils-fats', 'Palm oil, shea butter, and cooking oils', 4),
  ('Dried Fish & Meat', 'dried-fish-meat', 'Smoked and dried proteins', 5),
  ('Vegetables & Fruits', 'vegetables-fruits', 'Fresh and dried produce', 6),
  ('Beverages', 'beverages', 'Traditional drinks and beverages', 7),
  ('Snacks', 'snacks', 'African snacks and treats', 8),
  ('Sauces & Condiments', 'sauces-condiments', 'Ready-made sauces and condiments', 9),
  ('Frozen Foods', 'frozen-foods', 'Frozen African foods', 10)
ON CONFLICT (slug) DO NOTHING;
