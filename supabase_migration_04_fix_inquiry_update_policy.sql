-- Enable RLS update policy for inquiries
create policy "Authenticated users can update inquiries" on inquiries for update using (auth.role() = 'authenticated');
