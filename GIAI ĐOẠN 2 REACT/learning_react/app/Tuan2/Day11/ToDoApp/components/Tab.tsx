export default function BtnTab(props: {
    nameTab:string 
    soLuong:number
    onClick:()=>void
}) {
  return (
    <button onClick={props.onClick}>{props.nameTab}({props.soLuong})</button>
  );
}
