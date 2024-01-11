import Search from "../Search/Search";
import Pokelist from "../Pokelist/pokelist";
function Pokedex() {
  return (
    <>
      <div className="h-screen w-full border-4 border-red-800 flex flex-col items-center py-4">
        <div className="h-[20vh] w-[80%] mx-auto   flex  flex-col items-center   ">
          <h1 className="text-3xl mb-6">Pokedex</h1>
          <Search />

        </div>
        <Pokelist />
      </div>
    </>
  )
}

export default Pokedex;