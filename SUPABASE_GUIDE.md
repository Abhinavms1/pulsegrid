# Supabase Database Upgrade Guide

To store real user data and ensure the Admin Dashboard works perfectly on Vercel, you need to migrate from your local SQLite `dev.db` to a free Cloud PostgreSQL database using Supabase.

It is extremely easy. Follow these exact steps:

## Step 1: Create a Free Supabase Project
1. Go to [Supabase.com](https://supabase.com/) and create a free account.
2. Click **"New Project"**.
3. Name it `pulsegrid`.
4. Enter a strong database password (SAVE THIS PASSWORD).
5. Choose a region near you (e.g., Mumbai, India).
6. Click **"Create new project"**. It will take about 2 minutes to set up.

## Step 2: Get your Database URL
1. In your Supabase dashboard, go to **Settings (the gear icon on the left bottom)** -> **Database**.
2. Scroll down to the **Connection String** section.
3. Select **URI**.
4. Copy the URL. It will look something like this:
   `postgresql://postgres.xxxx:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres`
5. *Replace `[YOUR-PASSWORD]` in the string with the password you created in Step 1.*

## Step 3: Add it to Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click on your `pulsegrid` project.
2. Go to **Settings** -> **Environment Variables**.
3. Under "Key", type: `DATABASE_URL`
4. Under "Value", paste your Supabase Connection String.
5. Click **Save**.

## Step 4: Update the Code
Once you have done the above, you need to tell your code to use Postgres instead of SQLite.

1. Open `prisma/schema.prisma` in your code.
2. Change `provider = "sqlite"` to `provider = "postgresql"`.
3. Add the URL back:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```
4. Push your code to GitHub. Vercel will automatically rebuild the site, connect to your new Supabase database, and your Admin Dashboard will be 100% live and ready for production!
