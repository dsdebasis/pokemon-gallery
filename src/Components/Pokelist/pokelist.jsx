import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";


function Pokelist() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

  const [prevUrl, setPrevUrl] = useState('');
  const [nextUrl, setNextUrl] = useState('');

  async function downloadPokemon() {
    
    const response = await axios.get(pokedexUrl);

    const pokemonResults = response.data.results;

    console.log(response.data);


    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));

    const pokemonData = await axios.all(pokemonResultPromise)
    console.log(pokemonData)
    const res = pokemonData.map(pokeData => {
      const pokemon = pokeData.data;

      return {
        id: pokemon.id,
        name: pokemon.name,
        image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
        types: pokemon.types
      }
    });

    setPokemonList(res);
    // console.log(res);

    
  }
  useEffect(() => {
    downloadPokemon();

  }, [pokedexUrl])

  return (
    <div className="border-2 border-black h-screen w-[90%]  mt-5  text-center rounded-lg shadow-2xl shadow-violet-700 p-2 overflow-auto ">

      <div className=" flex flex-wrap justify-evenly ">
        {(loading) ? 'Loading...' :
          pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)}
      </div>
      <div className="">
        <button disabled={prevUrl==null} onClick={() => setPokedexUrl(prevUrl)} className="border-2 border-blue-500 w-[5rem] h-[2rem] rounded-lg mx-10 bg-slate-500 text-white outline-none ">Previous</button>
        <button disabled={nextUrl == null} onClick={() => setPokedexUrl(nextUrl)} className="border-2 border-blue-500 w-[5rem] h-[2rem] rounded-lg mx-10 bg-slate-500 text-white outline-none">Next</button>
      </div>
    </div>
  )
}

export default Pokelist;