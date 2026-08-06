ALTER TABLE public.book_requests
  ADD COLUMN IF NOT EXISTS solicitation text NOT NULL DEFAULT 'unsolicited',
  ADD COLUMN IF NOT EXISTS referral_name text,
  ADD COLUMN IF NOT EXISTS referral_reference text;

ALTER TABLE public.collaboration_requests
  ADD COLUMN IF NOT EXISTS territory text,
  ADD COLUMN IF NOT EXISTS rights_sought text;