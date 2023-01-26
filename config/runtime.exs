import Config

if config_env() == :prod do
  config :rest,
    http_port: String.to_integer(System.get_env("PORT") || "4001")
end
