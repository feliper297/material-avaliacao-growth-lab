-- Remove limite de tamanho e MIME types do bucket de prints da avaliacao
UPDATE storage.buckets
SET file_size_limit = NULL,
    allowed_mime_types = NULL
WHERE id = 'evaluation-prints';
