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

## 3. Run Database Migrations

You can run the database migrations manually by copying the SQL from `supabase/migrations/20250407000000_create_guests_table.sql` and executing it in the Supabase SQL Editor.

Alternatively, if you have the Supabase CLI installed:

```bash
supabase link --project-ref your-project-ref
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
CREATE POLICY "Allow guests to view and update their own RSVP" ON guests
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow guests to update their own RSVP" ON guests
  FOR UPDATE
  TO anon
  USING (unique_invite_id = current_setting('request.headers')::json->>'x-guest-id')
  WITH CHECK (unique_invite_id = current_setting('request.headers')::json->>'x-guest-id');
```

## 5. Testing the Connection

After setting up your environment variables, you can test the connection by running the development server:

```bash
npm run dev
```

Your application should now be connected to your Supabase database.
