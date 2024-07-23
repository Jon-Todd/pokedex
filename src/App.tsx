import axios from "axios";
import { useEffect, useState } from "react";
import { InspectedPokemon } from "./components/InspectedPokemon";
import "./styles.css";

type Pokemon = any;

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
  const [inspectedPoke, setInspectedPoke] = useState<Pokemon>(null);

  useEffect(() => {
    fetchData().then((resPokemon) => {
      setPokemon(resPokemon);
    });
  }, []);

  const clickedPokemon = (clickedPokemon: string) => {
    fetchPokemon(clickedPokemon).then((resPoke) => {
      console.log(resPoke);
      setInspectedPoke(resPoke);
    });
  };

  return (
    <>
      <div className="pokemon-list">
        {pokemon.map((poke, pokeIdx) => (
          <button key={pokeIdx} onClick={() => clickedPokemon(poke.url)}>
            {poke.name}
          </button>
        ))}
        {inspectedPoke && <InspectedPokemon inspectedPoke={inspectedPoke} />}
      </div>
    </>
  );
}
