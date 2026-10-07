CREATE TABLE IF NOT EXISTS users (
  id         uuid PRIMARY KEY,
  theme      text CHECK (theme IN ('dark', 'light')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
