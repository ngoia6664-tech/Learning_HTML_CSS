export default function PokemonCard({
  pokemon,
}: {
  pokemon: { id: number; name: string; height: number };
}) {
  return (
    <div style={{ border: "1px solid gray", padding: 8, margin: 8 }}>
      <h3>
        #{pokemon.id} {pokemon.name}
      </h3>
      <p>Chiều cao: {pokemon.height}</p>
    </div>
  );
}