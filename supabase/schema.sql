-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create a table for user profiles
-- Stores user entitlements and Stripe customer information
create table public.profiles (
  id uuid references auth.users not null,
  email text,
  entitlements text[] default array[]::text[], -- Array of entitlements (e.g., 'ios_premium', 'android_premium')
  stripe_customer_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- RLS Policies
alter table public.profiles enable row level security;

create policy "Users can view own profile" 
on public.profiles for select 
using ( auth.uid() = id );

create policy "Users can update own profile" 
on public.profiles for update 
using ( auth.uid() = id );

-- Function to handle new user signup
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create table for lead captures
create table public.lead_captures (
  id uuid default uuid_generate_v4() primary key,
  email text not null,
  source text not null, -- e.g., 'homepage_lead_magnet'
  consent_given boolean default false,
  target_product text, -- e.g., 'ios_playbook'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for lead_captures (admin only)
alter table public.lead_captures enable row level security;

create policy "Only service role can access leads"
on public.lead_captures
for all
using (auth.role() = 'service_role');

-- Create table for user progress tracking
create table public.user_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  lesson_id text not null, -- e.g., 'mental-model-1', 'architecture-mvvm'
  product_id text not null, -- e.g., 'ios_playbook'
  completed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id, product_id)
);

-- RLS Policies for user_progress
alter table public.user_progress enable row level security;

create policy "Users can view own progress"
on public.user_progress for select
using ( auth.uid() = user_id );

create policy "Users can insert own progress"
on public.user_progress for insert
with check ( auth.uid() = user_id );

create policy "Users can delete own progress"
on public.user_progress for delete
using ( auth.uid() = user_id );

-- Create index for faster queries
create index user_progress_user_id_idx on public.user_progress(user_id);
create index user_progress_lesson_id_idx on public.user_progress(lesson_id);

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-update updated_at on profiles
create trigger on_profile_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();
