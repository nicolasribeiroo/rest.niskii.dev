defmodule Rest do
  use Application

  def start(_type, _args) do
    unless Mix.env == :prod do
      Dotenv.load
      Mix.Task.run("loadconfig")
    end

    import Supervisor.Spec, warn: false

    children = [
      Plug.Cowboy.child_spec(
        scheme: :http,
        plug: Rest.Router,
        options: [
          port: Application.fetch_env!(:rest, :http_port),
          dispatch: dispatch(),
          protocol_options: [idle_timeout: :infinity]
        ]
      ),
      {Redix, {Application.fetch_env!(:rest, :redis_uri), [name: :redix]}},
    ]

    IO.puts("Starting Rest App on #{Application.fetch_env!(:rest, :http_port)}")

    opts = [strategy: :one_for_one, name: Rest.Supervisor]
    Supervisor.start_link(children, opts)
  end

  defp dispatch do
    [
      {:_,
       [
         {:_, Plug.Cowboy.Handler, {Rest.Api.Router, []}}
       ]}
    ]
  end
end
