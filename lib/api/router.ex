defmodule Rest.Api.Router do
  import Plug.Conn

  alias Rest.Api.Routes.V1
  alias Rest.Api.Routes.V1.Spotify
  alias Rest.Api.Util

  use Plug.Router

  plug(Corsica,
    origins: "*",
    max_age: 600,
    allow_methods: :all,
    allow_headers: :all
  )

  plug(:match)
  plug(:dispatch)

  forward("/v1", to: V1)
  forward("/spotify", to: Spotify)

  match "/health" do
    send_resp(conn, 200, "OK")
  end

  match _ do
    Util.not_found(conn)
  end
end
