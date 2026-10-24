export default function NutBamLoading(props: {
  tenNut: string;
  onLoading?: () => void;
  type?: "submit" | "button"
}) {
  return <button onClick={props.onLoading} type={props.type ?? "button"}>{props.tenNut}</button>;
}
