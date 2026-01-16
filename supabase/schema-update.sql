-- Enable UUID extension if not exists
create extension if not exists "uuid-ossp";

-- Update profiles table to add entitlements column if it doesn't exist
-- This is safe to run multiple times
do $$
begin
  -- Check if entitlements column exists
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
    and table_name = 'profiles'
    and column_name = 'entitlements'
  ) then
    -- Add entitlements column
    alter table public.profiles add column entitlements text[] default array[]::text[];
  end if;

  -- Check if created_at column exists
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
    and table_name = 'profiles'
    and column_name = 'created_at'
  ) then
    alter table public.profiles add column created_at timestamp with time zone default timezone('utc'::text, now()) not null;
  end if;

  -- Check if updated_at column exists
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
    and table_name = 'profiles'
    and column_name = 'updated_at'
  ) then
    alter table public.profiles add column updated_at timestamp with time zone default timezone('utc'::text, now()) not null;
  end if;
end $$;

-- Create table for lead captures (only if it doesn't exist)
create table if not exists public.lead_captures (
  id uuid default uuid_generate_v4() primary key,
  email text not null,
  source text not null, -- e.g., 'homepage_lead_magnet'
  consent_given boolean default false,
  target_product text, -- e.g., 'ios_playbook'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create table for user progress tracking (only if it doesn't exist)
create table if not exists public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  lesson_id text not null, -- e.g., 'mental-model-1', 'architecture-mvvm'
  product_id text not null, -- e.g., 'ios_playbook'
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id, product_id)
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.lead_captures enable row level security;
alter table public.user_progress enable row level security;

-- Drop existing policies if they exist and recreate them
-- This ensures policies are up to date
drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Only service role can access leads" on public.lead_captures;
drop policy if exists "Users can view own progress" on public.user_progress;
drop policy if exists "Users can insert own progress" on public.user_progress;
drop policy if exists "Users can delete own progress" on public.user_progress;

-- Recreate policies
create policy "Users can view own profile"
on public.profiles for select
using ( auth.uid() = id );

create policy "Users can update own profile"
on public.profiles for update
using ( auth.uid() = id );

create policy "Only service role can access leads"
on public.lead_captures
for all
using (auth.role() = 'service_role');

create policy "Users can view own progress"
on public.user_progress for select
using ( auth.uid() = user_id );

create policy "Users can insert own progress"
on public.user_progress for insert
with check ( auth.uid() = user_id );

create policy "Users can delete own progress"
on public.user_progress for delete
using ( auth.uid() = user_id );

-- Create indexes if they don't exist
create index if not exists user_progress_user_id_idx on public.user_progress(user_id);
create index if not exists user_progress_lesson_id_idx on public.user_progress(lesson_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing; -- Avoid errors if profile already exists
  return new;
end;
$$ language plpgsql security definer;

-- Drop and recreate trigger to ensure it's up to date
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Drop and recreate trigger for updated_at
drop trigger if exists on_profile_updated on public.profiles;
create trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- Success message
do $$
begin
  raise notice '✅ Schema update completed successfully!';
  raise notice '✅ Tables: profiles (updated), lead_captures, user_progress';
  raise notice '✅ RLS policies configured';
  raise notice '✅ Triggers configured';
end $$;
