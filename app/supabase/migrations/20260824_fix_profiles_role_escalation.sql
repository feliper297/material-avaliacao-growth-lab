-- Impede escalada de privilégio em profiles (INSERT/UPDATE de role=admin pelo cliente).
-- Admin de avaliação: email bootstrap definido no trigger (conta de demo).

CREATE OR REPLACE FUNCTION public.enforce_profile_role()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.email = 'admin@gmail.com' THEN
      NEW.role := 'admin';
    ELSE
      NEW.role := 'learner';
    END IF;
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' THEN
    IF is_admin() THEN
      RETURN NEW;
    END IF;
    NEW.role := OLD.role;
    NEW.user_id := OLD.user_id;
    RETURN NEW;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS enforce_profile_role_trigger ON public.profiles;
CREATE TRIGGER enforce_profile_role_trigger
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_profile_role();

DROP POLICY IF EXISTS profiles_insert ON public.profiles;
DROP POLICY IF EXISTS profiles_update ON public.profiles;

CREATE POLICY profiles_insert ON public.profiles
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY profiles_update_own ON public.profiles
  FOR UPDATE
  USING (user_id = auth.uid() AND NOT is_admin())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY profiles_update_admin ON public.profiles
  FOR UPDATE
  USING (is_admin())
  WITH CHECK (is_admin());

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM authenticated;
