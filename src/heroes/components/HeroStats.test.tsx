import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { FavoriteHeroProvider } from "../context/FavoriteHeroContext";
import { HeroStats } from "./HeroStats";

const { mockUseHeroSummary } = vi.hoisted(() => ({
  mockUseHeroSummary: vi.fn(),
}));

vi.mock("../hooks/useHeroSummary", () => ({
  useHeroSummary: mockUseHeroSummary,
}));

const summary = {
  totalHeroes: 25,
  heroCount: 18,
  villainCount: 7,
  strongestHero: {
    alias: "Superman",
    strength: 10,
  },
  smartestHero: {
    alias: "Batman",
    intelligence: 10,
  },
};

const renderHeroStats = () =>
  render(
    <FavoriteHeroProvider>
      <HeroStats />
    </FavoriteHeroProvider>,
  );

describe("HeroStats", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("muestra Loading mientras se carga el resumen", () => {
    mockUseHeroSummary.mockReturnValue({ data: undefined });

    renderHeroStats();

    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  test("muestra el total de personajes y los héroes más destacados", () => {
    mockUseHeroSummary.mockReturnValue({ data: summary });

    renderHeroStats();

    expect(screen.getByText("25")).toBeTruthy();
    expect(screen.getByText("18 Heroes")).toBeTruthy();
    expect(screen.getByText("7 Villains")).toBeTruthy();
    expect(screen.getByText("Superman")).toBeTruthy();
    expect(screen.getByText("Batman")).toBeTruthy();
  });
});