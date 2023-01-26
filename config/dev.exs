import Config

config :rest,
  http_port: String.to_integer(System.get_env("PORT") || "4001")
