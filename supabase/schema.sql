-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create a table for user profiles if you want to store extra data, 
-- though we are mainly using auth.users metadata for now.
-- This is just an example if you expand later.
create table public.profiles (
  id uuid references auth.users not null,
  email text,
  is_pro boolean default false,
  stripe_customer_id text,
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
