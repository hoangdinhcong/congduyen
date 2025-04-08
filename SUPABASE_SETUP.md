# Supabase Setup Guide

This guide will help you set up your Supabase project for the wedding invitation website.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in or create an account
2. Create a new project with a name of your choice (e.g., "wedding-invitation")
3. Choose a region closest to your target audience
4. Set a secure database password

## 2. Configure Environment Variables

Create or update your `.env.local` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_PASSWORD_HASH=your-bcrypt-hashed-password
```

You can find your Supabase URL and keys in the Supabase dashboard under Project Settings > API.

### Generating Admin Password Hash

To generate the bcrypt hash for your admin password, you can use the following code in a Node.js environment:

```javascript
// Run this in a Node.js environment (e.g., create a script file)
const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'your-secure-password'; // Replace with your desired admin password
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('Your bcrypt hash:', hash);
}

generateHash();
```

Save this as `generate-hash.js` and run it with:

```bash
npm install bcrypt
node generate-hash.js
```

Copy the generated hash to your `.env.local` file as the `ADMIN_PASSWORD_HASH` value.

## 3. Run Database Migrations

You can run the database migrations manually by copying the SQL from `supabase/migrations/20250407000000_create_guests_table.sql` and executing it in the Supabase SQL Editor.

To access the SQL Editor:
1. Go to your Supabase project dashboard
2. Click on "SQL Editor" in the left sidebar
3. Create a new query
4. Paste the contents of the migration file
5. Click "Run" to execute the SQL

Alternatively, if you have the Supabase CLI installed:

```bash
# Install Supabase CLI if you haven't already
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

## 4. Set Up Row-Level Security (RLS)

For production, you should set up Row-Level Security policies to protect your data. Here's an example policy for the `guests` table:

```sql
-- Enable RLS on the guests table
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON guests
  FOR ALL
  TO authenticated
  USING (true);

-- Create a policy that allows guests to view and update only their own RSVP status
CREATE POLICY "Allow guests to view their own RSVP" ON guests
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow guests to update their own RSVP" ON guests
  FOR UPDATE
  TO anon
  USING (unique_invite_id = current_setting('request.headers')::json->>'x-guest-id')
  WITH CHECK (unique_invite_id = current_setting('request.headers')::json->>'x-guest-id');
```

## 5. Adding Test Data

You can add some test guests to your database using the SQL Editor:

```sql
INSERT INTO guests (name, side, tags, unique_invite_id, rsvp_status)
VALUES 
  ('John Smith', 'groom', ARRAY['family', 'close-friend'], 'john-smith-123', 'pending'),
  ('Jane Doe', 'bride', ARRAY['family'], 'jane-doe-456', 'pending'),
  ('Alex Johnson', 'both', ARRAY['colleague'], 'alex-johnson-789', 'pending');
```

## 6. Testing the Connection

After setting up your environment variables, you can test the connection by running the development server:

```bash
npm run dev
```

Visit the following URLs to test different aspects of your application:
- Main page: `http://localhost:3000`
- Admin login: `http://localhost:3000/host/login`
- Personalized invitation: `http://localhost:3000/invite/john-smith-123` (using one of your test guest IDs)

## 7. Troubleshooting

If you encounter issues with the Supabase connection:

1. Verify your environment variables are correctly set in `.env.local`
2. Check the browser console for any errors
3. Ensure your Supabase project is active and the database is online
4. Confirm that the tables have been created correctly in the Supabase dashboard
5. Check that your RLS policies are not too restrictive

For API-specific issues, you can use the Network tab in your browser's developer tools to inspect the requests and responses.
