import Config

config :rest,
  http_port: String.to_integer(System.get_env("PORT") || "4001"),
  redis_uri: System.get_env("REDIS_URI") || "redis://redis:6379",
  spotify_client_id: System.get_env("SPOTIFY_CLIENT_ID"),
  spotify_client_secret: System.get_env("SPOTIFY_CLIENT_SECRET"),
  spotify_refresh_token: System.get_env("SPOTIFY_REFRESH_TOKEN")
