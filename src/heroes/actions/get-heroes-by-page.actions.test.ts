import axiosMockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { heroApi } from "../api/hero.api";
import { getHeroesByPageAction } from "./get-heroes-by-page.actions";

const BASE_URL = import.meta.env.VITE_API_URL;
const mock = new axiosMockAdapter(heroApi);

const hero = {
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

describe("getHeroesByPageAction", () => {
  beforeEach(() => {
    mock.reset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("returns the first page with default limit and category", async () => {
    mock.onGet("/").reply(200, {
      total: 1,
      pages: 1,
      heroes: [hero],
    });

    const response = await getHeroesByPageAction(1);

    expect(mock.history.get).toHaveLength(1);
    expect(mock.history.get[0].params).toEqual({
      limit: 6,
      offset: 0,
      category: "all",
    });
    expect(response).toEqual({
      total: 1,
      pages: 1,
      heroes: [{ ...hero, image: `${BASE_URL}/images/1.jpeg` }],
    });
  });

  test("uses the requested page, limit, and category", async () => {
    mock.onGet("/").reply(200, {
      total: 1,
      pages: 1,
      heroes: [hero],
    });

    await getHeroesByPageAction(3, 4, "villain");

    expect(mock.history.get[0].params).toEqual({
      limit: 4,
      offset: 8,
      category: "villain",
    });
  });

  test("logs and rethrows API errors", async () => {
    mock.onGet("/").reply(500, { message: "API unavailable" });
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(getHeroesByPageAction(1)).rejects.toMatchObject({
      response: { status: 500 },
    });
    expect(consoleError).toHaveBeenCalledOnce();
  });
});
