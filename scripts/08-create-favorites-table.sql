-- Create favorites table for user wishlists
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure user can favorite either a business or product, not both
  CHECK (
    (business_id IS NOT NULL AND product_id IS NULL) OR
    (business_id IS NULL AND product_id IS NOT NULL)
  ),
  
  -- Prevent duplicate favorites
  UNIQUE(user_id, business_id),
  UNIQUE(user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_business ON favorites(business_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product ON favorites(product_id);
