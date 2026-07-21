-- Run in Supabase SQL editor
-- One row per call note; many notes per enquiry

create table if not exists public.enquiry_notes (
  id uuid primary key default gen_random_uuid(),
  enquiry_id uuid not null references public.enquiries (id) on delete cascade,
  html text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists enquiry_notes_enquiry_id_created_at_idx
  on public.enquiry_notes (enquiry_id, created_at desc);

comment on table public.enquiry_notes is 'Staff call notes for admin desk; many per enquiry';
