-- Prints anexados ao feedback do avaliador
ALTER TABLE public.evaluations
ADD COLUMN IF NOT EXISTS attachments jsonb NOT NULL DEFAULT '[]'::jsonb;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'evaluation-prints',
  'evaluation-prints',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY evaluation_prints_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'evaluation-prints'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY evaluation_prints_select ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'evaluation-prints');

CREATE POLICY evaluation_prints_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'evaluation-prints'
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );
