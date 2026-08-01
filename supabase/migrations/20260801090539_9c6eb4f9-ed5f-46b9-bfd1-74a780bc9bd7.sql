CREATE TYPE public.app_role AS ENUM ('author', 'agent', 'rights_manager');
CREATE TYPE public.account_kind AS ENUM ('author', 'agent', 'rights_manager');
CREATE TYPE public.request_status AS ENUM ('pending', 'approved', 'rejected', 'contact_agents');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text NOT NULL DEFAULT '',
  kind public.account_kind NOT NULL DEFAULT 'author',
  pen_name text,
  biography text,
  languages text,
  genres text,
  agency_name text,
  territory text,
  website text,
  rights_handled text,
  phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE TABLE public.book_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  year text,
  genre text,
  language text,
  synopsis text,
  rights_notes text,
  status public.request_status NOT NULL DEFAULT 'pending',
  decision_note text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.book_requests TO authenticated;
GRANT ALL ON public.book_requests TO service_role;
ALTER TABLE public.book_requests ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.collaboration_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_id text NOT NULL,
  book_title text NOT NULL,
  author_name text,
  message text,
  status public.request_status NOT NULL DEFAULT 'pending',
  decision_note text,
  contact_email text,
  contact_phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (agent_id, book_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.collaboration_requests TO authenticated;
GRANT ALL ON public.collaboration_requests TO service_role;
ALTER TABLE public.collaboration_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.has_role(auth.uid(), 'rights_manager'));
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "own roles read" ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'rights_manager'));

CREATE POLICY "author reads own book requests" ON public.book_requests FOR SELECT TO authenticated
  USING (auth.uid() = author_id OR public.has_role(auth.uid(), 'rights_manager'));
CREATE POLICY "author creates own book requests" ON public.book_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = author_id AND public.has_role(auth.uid(), 'author'));
CREATE POLICY "rights manager updates book requests" ON public.book_requests FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'rights_manager')) WITH CHECK (public.has_role(auth.uid(), 'rights_manager'));
CREATE POLICY "author deletes own pending book requests" ON public.book_requests FOR DELETE TO authenticated
  USING (auth.uid() = author_id AND status = 'pending');

CREATE POLICY "agent reads own collab requests" ON public.collaboration_requests FOR SELECT TO authenticated
  USING (auth.uid() = agent_id OR public.has_role(auth.uid(), 'rights_manager'));
CREATE POLICY "agent creates own collab requests" ON public.collaboration_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = agent_id AND public.has_role(auth.uid(), 'agent'));
CREATE POLICY "rights manager updates collab requests" ON public.collaboration_requests FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'rights_manager')) WITH CHECK (public.has_role(auth.uid(), 'rights_manager'));
CREATE POLICY "agent deletes own pending collab requests" ON public.collaboration_requests FOR DELETE TO authenticated
  USING (auth.uid() = agent_id AND status = 'pending');

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_touch BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER book_requests_touch BEFORE UPDATE ON public.book_requests
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER collaboration_requests_touch BEFORE UPDATE ON public.collaboration_requests
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  k public.account_kind;
BEGIN
  k := COALESCE(NULLIF(NEW.raw_user_meta_data ->> 'kind', ''), 'author')::public.account_kind;

  INSERT INTO public.profiles (id, email, full_name, kind, pen_name, biography, languages, genres,
                               agency_name, territory, website, rights_handled, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    k,
    NEW.raw_user_meta_data ->> 'pen_name',
    NEW.raw_user_meta_data ->> 'biography',
    NEW.raw_user_meta_data ->> 'languages',
    NEW.raw_user_meta_data ->> 'genres',
    NEW.raw_user_meta_data ->> 'agency_name',
    NEW.raw_user_meta_data ->> 'territory',
    NEW.raw_user_meta_data ->> 'website',
    NEW.raw_user_meta_data ->> 'rights_handled',
    NEW.raw_user_meta_data ->> 'phone'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, k::text::public.app_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();