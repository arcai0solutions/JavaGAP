-- Migration: Ensure Contacts Persistence
-- Description: Adds a unique constraint on email for contacts to support upserts and ensures foreign key from crm_leads to contacts is set to SET NULL on delete, not CASCADE.

-- 1. Make email unique in contacts table to support UPSERT
alter table contacts add constraint contacts_email_key unique (email);

-- 2. Update crm_leads table to include contact_id (if not already present from previous migration)
--    and ensure that deleting a contact does NOT cascade delete the lead (optional choice, but good for data integrity)
--    BUT user asked that contacts should NOT get deleted if inquiry or lead is deleted.
--    The contacts table is the source of truth.

--    We need to make sure the foreign key in crm_leads allows the lead to exist even if contact is gone? 
--    No, user said "contact details need to be saved regardless". 
--    This means the Contact record is the independent entity.
--    So, deleting a CRM Lead should NOT delete the Contact.
--    This is the default behavior of a foreign key (deleting the child does not delete the parent).
--    So we just need to add the contact_id column to our new schema definition.

-- Add contact_id if it was missing in the previous wipe
alter table crm_leads add column if not exists contact_id uuid references contacts(id) on delete set null;
