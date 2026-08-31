-- Vincula evidências ao conteúdo (resource) da trilha
ALTER TABLE evidences ADD COLUMN IF NOT EXISTS resource_id text;

CREATE INDEX IF NOT EXISTS evidences_resource_id_idx ON evidences (resource_id);
