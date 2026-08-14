-- Permite que o participante edite suas próprias evidências (RLS faltava para UPDATE).
CREATE POLICY own_evidences_update ON public.evidences
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
