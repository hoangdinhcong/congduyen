-- Create guests table
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  side TEXT NOT NULL CHECK (side IN ('bride', 'groom', 'both')),
  tags TEXT[] DEFAULT '{}',
  unique_invite_id TEXT NOT NULL UNIQUE,
  rsvp_status TEXT NOT NULL DEFAULT 'pending' CHECK (rsvp_status IN ('pending', 'attending', 'declined')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on unique_invite_id for faster lookups
CREATE INDEX IF NOT EXISTS guests_unique_invite_id_idx ON guests (unique_invite_id);

-- Create index on side for filtering
CREATE INDEX IF NOT EXISTS guests_side_idx ON guests (side);

-- Create index on rsvp_status for filtering and statistics
CREATE INDEX IF NOT EXISTS guests_rsvp_status_idx ON guests (rsvp_status);

-- Create function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER update_guests_updated_at
BEFORE UPDATE ON guests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
