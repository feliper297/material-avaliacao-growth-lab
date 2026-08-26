-- Rollback: restaura policies de profiles anteriores ao hardening de 2026-08-24.

DROP TRIGGER IF EXISTS enforce_profile_role_trigger ON public.profiles;
DROP FUNCTION IF EXISTS public.enforce_profile_role();

DROP POLICY IF EXISTS profiles_insert ON public.profiles;
DROP POLICY IF EXISTS profiles_update_own ON public.profiles;
DROP POLICY IF EXISTS profiles_update_admin ON public.profiles;

CREATE POLICY profiles_insert ON public.profiles
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY profiles_update ON public.profiles
  FOR UPDATE
  USING ((user_id = auth.uid()) OR is_admin());

GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
