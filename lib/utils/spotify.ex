defmodule Rest.Utils.Spotify do
  def get_token() do
    {:ok, token_data} = Redix.command(:redix, ["GET", "spotify/token"])

    url = "https://accounts.spotify.com/api/token"

    body =
      Plug.Conn.Query.encode(%{
        "grant_type" => "refresh_token",
        "refresh_token" => Application.fetch_env!(:rest, :spotify_refresh_token),
        "client_id" => Application.fetch_env!(:rest, :spotify_client_id),
        "client_secret" => Application.fetch_env!(:rest, :spotify_client_secret)
      })

    headers = [{"Content-Type", "application/x-www-form-urlencoded"}]

    if token_data == nil do
      case HTTPoison.post(url, body, headers) do
        {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          {:ok, data} = Poison.decode(body)

          data["access_token"]

          Redix.command(:redix, ["SET", "spotify/token", data["access_token"], "EX", 3600])
      end
    end

    token_data
  end

  def build_pretty_spotify(data) do
    {:ok,
     %{
       track_title: get_track_title(data),
       artists: get_track_artists(data),
       track_url: get_track_url(data),
       album_title: get_album_title(data),
       album_url: get_album_url(data),
       album_art_url: get_album_art_url(data)
     }}
  end

  defp get_track_title(%{"item" => %{"name" => name}}), do: name
  defp get_track_title(_data), do: nil

  defp get_track_artists(%{"item" => %{"artists" => artists}}),
    do: artists |> Enum.map(fn artist -> artist["name"] end)

  defp get_track_artists(_data), do: nil

  defp get_track_url(%{"item" => %{"external_urls" => %{"spotify" => url}}}), do: url
  defp get_track_url(_data), do: nil

  defp get_album_title(%{"item" => %{"album" => %{"name" => name}}}), do: name
  defp get_album_title(_data), do: nil

  defp get_album_url(%{"item" => %{"album" => %{"external_urls" => %{"spotify" => url}}}}),
    do: url

  defp get_album_url(_data), do: nil

  defp get_album_art_url(%{"item" => %{"album" => %{"images" => images}}}),
    do: images |> Enum.at(0) |> Map.get("url")

  defp get_album_art_url(_data), do: nil
end
