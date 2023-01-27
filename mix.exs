defmodule Rest.MixProject do
  use Mix.Project

  def project do
    [
      app: :rest,
      version: "0.1.0",
      elixir: "~> 1.12",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger, :corsica],
      mod: {Rest, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:plug_cowboy, "~> 2.0"},
      {:poison, "~> 4.0"},
      {:corsica, "~> 1.0"},
      {:gen_registry, "~> 1.0"},
      {:redix, "~> 1.1"},
      {:httpoison, "~> 2.0"},
      {:dotenv, "~> 3.0.0"}
    ]
  end
end
