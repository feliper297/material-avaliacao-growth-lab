CREATE TABLE IF NOT EXISTS public.trail_catalog (
  id text PRIMARY KEY DEFAULT 'default',
  weeks jsonb NOT NULL DEFAULT '[]'::jsonb,
  quizzes jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users (id)
);

ALTER TABLE public.trail_catalog ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS trail_catalog_select ON public.trail_catalog;
DROP POLICY IF EXISTS trail_catalog_insert ON public.trail_catalog;
DROP POLICY IF EXISTS trail_catalog_update ON public.trail_catalog;

CREATE POLICY trail_catalog_select ON public.trail_catalog
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY trail_catalog_insert ON public.trail_catalog
  FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY trail_catalog_update ON public.trail_catalog
  FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());
