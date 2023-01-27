defmodule Rest.Api.Routes.V1 do
  alias Rest.Api.Routes.V1.Spotify
  alias Rest.Api.Util

  use Plug.Router

  plug(:match)
  plug(:dispatch)

  forward("/spotify", to: Spotify)

  match _ do
    Util.not_found(conn)
  end
end
