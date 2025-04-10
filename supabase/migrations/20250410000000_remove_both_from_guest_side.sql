-- Remove the 'both' option from the guest side check constraint
ALTER TABLE guests DROP CONSTRAINT guests_side_check;
ALTER TABLE guests ADD CONSTRAINT guests_side_check CHECK (side IN ('bride', 'groom'));

-- Update any existing guests with 'both' side to 'bride' (default choice)
UPDATE guests SET side = 'bride' WHERE side = 'both';
