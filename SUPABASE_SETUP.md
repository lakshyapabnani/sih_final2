# Supabase and Google Sign-In Setup

This app uses Supabase Auth in the browser. Do not put service-role keys, database passwords, or Google Client Secrets in frontend environment variables.

## Environment Variables

Add these variables in Vercel and in your local `.env` file:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Where they come from:

- `VITE_SUPABASE_URL`: Supabase project URL from Project Settings -> API.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Supabase publishable key or anon public key from Project Settings -> API.

Do not create or expose `VITE_SUPABASE_SERVICE_ROLE_KEY`.

## Supabase Setup

1. Create a Supabase project.
2. Open Project Settings -> API.
3. Copy the Project URL into `VITE_SUPABASE_URL`.
4. Copy the publishable key or anon public key into `VITE_SUPABASE_PUBLISHABLE_KEY`.
5. In Vercel, open Project Settings -> Environment Variables.
6. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` for Production. Add them for Preview and Development if needed.
7. Redeploy the Vercel project after saving environment variables.
8. In Supabase, open Authentication -> Providers.
9. Enable Google.
10. Paste the Google Client ID and Google Client Secret from Google Cloud.
11. Open Authentication -> URL Configuration.
12. Set Site URL to your Vercel production origin, for example:

```text
https://your-vercel-app.vercel.app
```

13. Add redirect URLs for production and local development:

```text
https://your-vercel-app.vercel.app/**
http://localhost:5173/**
```

The app uses `window.location.origin` for OAuth redirects, so the same code works locally and on Vercel.

## Google Cloud Setup

1. Create or select a Google Cloud project.
2. Open Google Auth Platform.
3. Configure the OAuth consent screen.
4. Create an OAuth Client.
5. Set Application type to Web application.
6. Add the Vercel production origin to Authorized JavaScript origins:

```text
https://your-vercel-app.vercel.app
```

7. Add local development origin if needed:

```text
http://localhost:5173
```

8. In Supabase Authentication -> Providers -> Google, copy the Callback URL shown by Supabase.
9. Add that Supabase callback URL to Google Cloud Authorized redirect URIs. It usually looks like:

```text
https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
```

10. Copy the Google Client ID and Google Client Secret into Supabase's Google provider settings.

The Google Client Secret must only be stored in Supabase provider settings. Do not put it in `.env`, Vercel frontend variables, GitHub, or source code.

## Profile and Role Table

Run the SQL in:

```text
supabase/profiles.sql
```

It creates `public.profiles` with:

- `id`
- `user_id`
- `email`
- `full_name`
- `role`
- `created_at`
- `updated_at`

The role is saved when a first-time Google user chooses:

- `hospital`
- `vendor`

Row Level Security is enabled. Authenticated users can only read, insert, and update their own profile row.

## App Flow

1. User opens the landing page.
2. User chooses Hospital Portal or Vendor Portal.
3. User clicks Continue with Google.
4. Supabase completes Google OAuth and restores the session.
5. If the user has no profile role, the app shows role selection.
6. The selected role is saved in `public.profiles`.
7. Future logins go directly to the saved role's portal.
8. Hospital users cannot access `/vendor`.
9. Vendor users cannot access `/hospital`.

## Troubleshooting

- If Vercel shows `Supabase is not configured`, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in Vercel and redeploy.
- If Google login fails, confirm Google provider is enabled in Supabase and the Google OAuth Client ID/Secret are saved there.
- If OAuth redirects fail, confirm the Supabase callback URL is listed in Google Authorized redirect URIs.
- If profile role saving fails, run `supabase/profiles.sql` and confirm RLS policies exist.
