import axios from "axios";
import { useEffect, useState } from "react";
import { InspectedPokemon } from "./components/InspectedPokemon";
import "./styles.css";
import { PokeAPI } from "pokeapi-types";

type Pokemon = PokeAPI.NamedAPIResource;

export const fetchData = () => {
  return axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=151")
    .then((res) => {
      const { results } = res.data;
      return results;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const fetchPokemon = (pokeUrl: string) => {
  return axios
    .get(pokeUrl)
    .then((res) => {
      const { data } = res;
      return data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export default function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [inspectedPoke, setInspectedPoke] = useState<PokeAPI.Pokemon>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchData().then((resPokemon) => {
      setPokemon(resPokemon);
    });
  }, []);

  const clickedPokemon = (clickedPokemon: string) => {
    fetchPokemon(clickedPokemon).then((resPoke: PokeAPI.Pokemon) => {
      setInspectedPoke(resPoke);
      setIsDialogOpen(true);
    });
  };

  return (
    <>
      <div className="pokemon-list flex flex-col">
        {pokemon.map((poke, pokeIdx) => (
          <button className="p-2 border border-gray-100  hover:bg-gray-50 text-left capitalize" key={pokeIdx} onClick={() => clickedPokemon(poke.url)}>
            {poke.name}
          </button>
        ))}
        {isDialogOpen && inspectedPoke && <InspectedPokemon inspectedPoke={inspectedPoke} closeDialog={() => setIsDialogOpen(false)} />}
      </div>
    </>
  );
}
