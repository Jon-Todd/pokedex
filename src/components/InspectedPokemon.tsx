import { PokeAPI } from "pokeapi-types";
import { FC, useRef, useState } from "react";

interface InspectedPokemonProps {
  inspectedPoke: PokeAPI.Pokemon;
  closeDialog: () => void;
}

type Moves = any;

export const InspectedPokemon:FC<InspectedPokemonProps> = ({ inspectedPoke, closeDialog }) => {
  const dialogRef = useRef<any>(null);
  const { name, sprites, weight } = inspectedPoke;

  return (
    <dialog className="inspected-poke" ref={dialogRef}>
      <svg
        onClick={() => closeDialog()}
        className="close-icon"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="100"
        height="100"
        viewBox="0 0 50 50"
      >
        <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>
      </svg>
      <img src={sprites.front_default} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>Name: {name}</p>
        <p>Weight: {weight}</p>
      </div>
    </dialog>
  );
};
