-- Arquivos anexados às evidências da trilha
ALTER TABLE public.evidences
ADD COLUMN IF NOT EXISTS attachments jsonb NOT NULL DEFAULT '[]'::jsonb;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'evidence-files',
  'evidence-files',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY evidence_files_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'evidence-files'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY evidence_files_select ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'evidence-files');

CREATE POLICY evidence_files_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'evidence-files'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
