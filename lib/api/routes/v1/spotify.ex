defmodule Rest.Api.Routes.V1.Spotify do
  alias Rest.Api.Util
  alias Rest.Utils.Spotify

  use Plug.Router

  plug(:match)
  plug(:dispatch)

  get "/currently_playing" do
    {:ok, spotify_data} = Redix.command(:redix, ["GET", "spotify/current"])

    token = Spotify.get_token()
    url = "https://api.spotify.com/v1/me/player/currently-playing"
    body = [{"Authorization", "Bearer " <> token}]

    if spotify_data == nil do
      case HTTPoison.get(url, body) do
        {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          {:ok, data} = Spotify.build_pretty_spotify(Poison.decode!(body))

          conn
          |> Util.respond({:ok, data})

          Redix.command(:redix, ["SET", "spotify/current", Poison.encode!(data), "EX", 60])
      end
    end

    conn
    |> Util.respond({:ok, Poison.decode!(spotify_data)})
  end

  match _ do
    Util.not_found(conn)
  end
end
