import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { FavoriteHeroContext, FavoriteHeroProvider } from "./FavoriteHeroContext";
import type { Hero } from "../types/hero.interface";
import { useContext } from "react";

const hero: Hero = {
  id: "1",
  name: "Clark Kent",
  slug: "clark-kent",
  alias: "Superman",
  powers: ["Super strength", "Flight"],
  description: "Protector of Earth.",
  strength: 10,
  intelligence: 8,
  speed: 9,
  durability: 10,
  team: "Justice League",
  image: "1.jpeg",
  firstAppearance: "1938",
  status: "Active",
  category: "Hero",
  universe: "DC",
};

const FavoritesTestConsumer = () => {
  const { favoriteCount, isFavorite, toggleFavorite } =
    useContext(FavoriteHeroContext);

  return (
    <>
      <p>Favoritos: {favoriteCount}</p>
      <p>{isFavorite(hero) ? "Es favorito" : "No es favorito"}</p>
      <button onClick={() => toggleFavorite(hero)}>Cambiar favorito</button>
    </>
  );
};

describe("FavoriteHeroProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("inicia vacío y agrega o quita un favorito", () => {
    render(
      <FavoriteHeroProvider>
        <FavoritesTestConsumer />
      </FavoriteHeroProvider>,
    );

    expect(screen.getByText("Favoritos: 0")).toBeTruthy();
    expect(screen.getByText("No es favorito")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Cambiar favorito" }));

    expect(screen.getByText("Favoritos: 1")).toBeTruthy();
    expect(screen.getByText("Es favorito")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Cambiar favorito" }));

    expect(screen.getByText("Favoritos: 0")).toBeTruthy();
    expect(screen.getByText("No es favorito")).toBeTruthy();
  });
});

