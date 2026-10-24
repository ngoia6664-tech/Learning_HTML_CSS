export default function NutBam(props:{
    tenNut:string,
    khiBam:()=>void
}){
    return(
        <button onClick={props.khiBam}>{props.tenNut}</button>
    )
}