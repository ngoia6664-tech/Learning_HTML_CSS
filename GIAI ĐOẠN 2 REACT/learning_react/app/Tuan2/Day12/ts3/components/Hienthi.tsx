export default function HienThiPokemon(props: {
  name: string;
  weight: number;
  height:number;
  img:string | null;
}) {
    return(
        <div>
          {props.img && (
            <img src={props.img} alt={props.name} />
          )}
          <h3>{props.name}</h3>
          <p>
            <span>Chiều cao:{props.height}</span>
            <br />
            <span>Cân năng:{props.weight}</span>
          </p>
        </div>
    )
}
