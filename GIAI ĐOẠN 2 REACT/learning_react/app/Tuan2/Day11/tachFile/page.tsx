import PokemonCard from "./components/PokemonCard";

const danhSach = [
  { id: 25, name: "pikachu", height: 4 },
  { id: 4, name: "charmander", height: 6 },
  { id: 1, name: "bulbasaur", height: 7 },
];

export default function Home() {
  return (
    <div>
      {danhSach.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}
