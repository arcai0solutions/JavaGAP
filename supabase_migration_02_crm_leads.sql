-- Migration: Update crm_leads table
-- Description: Recreates the crm_leads table to replace 'title' and 'value' with 'company_name', 'contact_name', 'email', and 'phone'.

-- 1. Drop the existing crm_leads table
drop table if exists crm_leads;

-- 2. Recreate crm_leads with new schema
create table crm_leads (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text,
  pipeline_id uuid references crm_pipelines(id) on delete cascade,
  "order" integer not null default 0,
  description text
);

-- 3. Re-enable RLS
alter table crm_leads enable row level security;

-- 4. Re-create Policy
create policy "Authenticated users can do everything on crm_leads" on crm_leads for all using (auth.role() = 'authenticated');
