-- Adiciona status ativo/inativo ao perfil do usuário.
-- Execute no SQL Editor do Supabase (projeto growth-lab) se ainda não aplicado.

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS active boolean NOT NULL DEFAULT true;

COMMENT ON COLUMN public.profiles.active IS 'Quando false, o usuário não pode acessar a plataforma.';
