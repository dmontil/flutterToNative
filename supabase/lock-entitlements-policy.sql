-- Lock entitlements and stripe_customer_id from client updates
drop policy if exists "Users can update own profile" on public.profiles;

create policy "Users can update own profile (non-privileged fields only)" 
on public.profiles for update 
using ( auth.uid() = id )
with check (
  auth.uid() = id
  and entitlements = (
    select p.entitlements from public.profiles p where p.id = auth.uid()
  )
  and stripe_customer_id is not distinct from (
    select p.stripe_customer_id from public.profiles p where p.id = auth.uid()
  )
);
