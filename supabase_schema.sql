-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create specific tables to ensure clean state
drop table if exists crm_leads;
drop table if exists crm_pipelines;
drop table if exists inquiries;
drop table if exists contacts;

-- 1. Inquiries Table (From Website Contact Form)
create table inquiries (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  subject text,
  message text,
  status text default 'new' -- new, read, archived
);

-- 2. Contacts Table (Saved Contacts)
create table contacts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text,
  phone text,
  company text,
  notes text,
  source text default 'website'
);

-- 3. CRM Pipelines (e.g., 'New Lead', 'Contacted', 'Proposal Sent', 'Closed')
create table crm_pipelines (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  "order" integer not null default 0
);

-- 4. CRM Leads (Cards in the Kanban)
create table crm_leads (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null, -- Company name or Deal name
  value numeric, -- Deal value
  pipeline_id uuid references crm_pipelines(id) on delete cascade,
  contact_id uuid references contacts(id),
  "order" integer not null default 0,
  description text
);

-- Insert Default Pipelines
insert into crm_pipelines (name, "order") values
  ('New Leads', 0),
  ('In Discussion', 1),
  ('Proposal Sent', 2),
  ('Closed Won', 3),
  ('Closed Lost', 4);

-- Enable RLS (Row Level Security) - optional for now, but good practice
alter table inquiries enable row level security;
alter table contacts enable row level security;
alter table crm_pipelines enable row level security;
alter table crm_leads enable row level security;

-- Create generic policies (allow all for anon for now to get started quickly, user can lock down later)
-- Ideally, we only allow authenticated users to view/edit, and public to insert inquiries.
create policy "Public can insert inquiries" on inquiries for insert with check (true);
create policy "Authenticated users can view inquiries" on inquiries for select using (auth.role() = 'authenticated');
create policy "Authenticated users can delete inquiries" on inquiries for delete using (auth.role() = 'authenticated');

-- For CRM and Contacts, only authenticated users
create policy "Authenticated users can do everything on contacts" on contacts for all using (auth.role() = 'authenticated');
create policy "Authenticated users can do everything on crm_pipelines" on crm_pipelines for all using (auth.role() = 'authenticated');
create policy "Authenticated users can do everything on crm_leads" on crm_leads for all using (auth.role() = 'authenticated');
