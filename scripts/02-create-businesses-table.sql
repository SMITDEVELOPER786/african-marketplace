-- Create businesses table for stores and restaurants
CREATE TABLE IF NOT EXISTS businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_type VARCHAR(20) NOT NULL CHECK (business_type IN ('store', 'restaurant')),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_image_url TEXT,
  country_origin VARCHAR(100),
  cuisine_type VARCHAR(100),
  
  -- Contact information
  email VARCHAR(255),
  phone VARCHAR(20),
  website TEXT,
  
  -- Location
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  country VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  
  -- Business settings
  is_active BOOLEAN DEFAULT true,
  accepts_orders BOOLEAN DEFAULT false,
  offers_delivery BOOLEAN DEFAULT false,
  offers_click_collect BOOLEAN DEFAULT false,
  delivery_radius_km INTEGER,
  min_order_amount DECIMAL(10, 2),
  
  -- Premium features
  is_premium BOOLEAN DEFAULT false,
  premium_expires_at TIMESTAMP WITH TIME ZONE,
  
  -- Ratings
  average_rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_businesses_owner ON businesses(owner_id);
CREATE INDEX IF NOT EXISTS idx_businesses_type ON businesses(business_type);
CREATE INDEX IF NOT EXISTS idx_businesses_active ON businesses(is_active);
CREATE INDEX IF NOT EXISTS idx_businesses_location ON businesses(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_businesses_country_origin ON businesses(country_origin);
