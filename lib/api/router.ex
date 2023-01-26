defmodule Rest.Api.Router do
  import Plug.Conn

  alias Rest.Router.Util

  use Plug.Router

  plug(Corsica,
    origins: "*",
    max_age: 600,
    allow_methods: :all,
    allow_headers: :all
  )

  plug(:match)
  plug(:dispatch)

  match "/health" do
    send_resp(conn, 200, "OK")
  end

  match _ do
    Util.not_found(conn)
  end
end
