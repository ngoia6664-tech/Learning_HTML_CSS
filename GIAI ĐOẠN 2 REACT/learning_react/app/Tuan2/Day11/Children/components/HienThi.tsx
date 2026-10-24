export default function HienThi(props:{
    Name:string;
    email:string;
    age:number;
    job:string;
}) {
    return(
        <div>
            <h2>{props.Name}</h2>
            <p>Email: {props.email}</p>
            <p>Age: {props.age}</p>
            <p>Job: {props.job}</p>
        </div>
    )
}