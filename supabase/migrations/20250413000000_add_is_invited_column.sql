-- Add is_invited column to guests table
ALTER TABLE guests ADD COLUMN is_invited BOOLEAN NOT NULL DEFAULT FALSE;

-- Add index on is_invited for faster filtering
CREATE INDEX IF NOT EXISTS guests_is_invited_idx ON guests (is_invited);

-- Comment for the column
COMMENT ON COLUMN guests.is_invited IS 'Indicates if the invitation link has been sent to this guest';