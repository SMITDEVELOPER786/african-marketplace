-- Insert sample businesses
INSERT INTO businesses (id, name, description, type, country_origin, address, phone, email, image_url, rating, review_count, is_verified)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440001', 'Afro Délices', 'Épicerie africaine authentique proposant des produits frais et de qualité', 'store', 'Sénégal', '123 Rue de la République, Paris', '+33 1 23 45 67 89', 'contact@afrodelices.fr', '/african-market-storefront.jpg', 4.8, 127, true),
  ('550e8400-e29b-41d4-a716-446655440002', 'Saveurs d''Afrique', 'Restaurant africain traditionnel', 'restaurant', 'Côte d''Ivoire', '45 Avenue des Champs, Lyon', '+33 4 12 34 56 78', 'info@saveursafrique.fr', '/african-restaurant-interior.jpg', 4.6, 89, true),
  ('550e8400-e29b-41d4-a716-446655440003', 'Marché Tropical', 'Produits exotiques et africains', 'store', 'Cameroun', '78 Boulevard Saint-Michel, Marseille', '+33 4 98 76 54 32', 'contact@marchetropical.fr', '/tropical-market.jpg', 4.7, 156, true);

-- Insert sample products
INSERT INTO products (id, business_id, name, description, category, price, original_price, image_url, rating, review_count, in_stock, weight, shelf_life, storage_instructions, certifications)
VALUES 
  ('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Fonio Bio du Sénégal', 'Céréale ancestrale africaine, riche en nutriments et sans gluten. Parfait pour accompagner vos plats traditionnels.', 'Céréales', 8.99, 12.99, '/african-grains-fonio.jpg', 4.8, 45, true, '500g', '12 mois', 'Conserver au sec et à l''abri de la lumière', ARRAY['Bio', 'Commerce équitable']),
  ('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Huile de Palme Rouge', 'Huile de palme rouge non raffinée, riche en vitamines et antioxydants', 'Huiles', 12.50, NULL, '/palm-oil-bottle.jpg', 4.6, 32, true, '750ml', '18 mois', 'Conserver à température ambiante', ARRAY['Naturel']),
  ('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Piment Africain Séché', 'Piments séchés pour relever vos plats avec authenticité', 'Épices', 6.99, 8.99, '/african-spices-colorful.jpg', 4.9, 67, true, '100g', '24 mois', 'Conserver dans un endroit sec', ARRAY['Bio']),
  ('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'Riz Jasmin Premium', 'Riz jasmin de qualité supérieure, grains longs et parfumés', 'Céréales', 15.99, NULL, '/african-grains-rice.jpg', 4.7, 28, true, '1kg', '12 mois', 'Conserver au sec', ARRAY['Premium']),
  ('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'Mélange d''Épices Berbère', 'Mélange traditionnel éthiopien pour vos plats épicés', 'Épices', 9.99, NULL, '/spice-mix.jpg', 4.8, 41, true, '150g', '18 mois', 'Conserver à l''abri de la lumière', ARRAY['Artisanal']),
  ('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440003', 'Plantains Frais', 'Plantains mûrs, parfaits pour frire ou cuire', 'Fruits & Légumes', 4.99, NULL, '/plantains.jpg', 4.5, 19, true, '1kg', '7 jours', 'Conserver à température ambiante', ARRAY['Frais']);

-- Insert sample reviews
INSERT INTO reviews (product_id, author, rating, comment, date)
VALUES 
  ('650e8400-e29b-41d4-a716-446655440001', 'Marie Dubois', 5, 'Excellent fonio, très authentique et facile à préparer. Je recommande vivement!', '2024-01-15'),
  ('650e8400-e29b-41d4-a716-446655440001', 'Jean Martin', 5, 'Produit de qualité, livraison rapide. Parfait pour mes recettes sénégalaises.', '2024-01-10'),
  ('650e8400-e29b-41d4-a716-446655440001', 'Sophie Laurent', 4, 'Très bon produit, juste un peu cher mais la qualité est au rendez-vous.', '2024-01-05'),
  ('650e8400-e29b-41d4-a716-446655440003', 'Ahmed Diallo', 5, 'Ces piments sont parfaits! Exactement ce que je cherchais pour mes plats.', '2024-01-20'),
  ('650e8400-e29b-41d4-a716-446655440003', 'Fatou Sow', 5, 'Authentique et très parfumé. Un vrai goût d''Afrique!', '2024-01-18'),
  ('650e8400-e29b-41d4-a716-446655440005', 'Pierre Lefebvre', 5, 'Mélange d''épices exceptionnel, transforme complètement mes plats.', '2024-01-22');
