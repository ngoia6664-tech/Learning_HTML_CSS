let student = [
  { name: "Ngô Duy Anh", subject: { Toán: 9, Lý: 9 }},
  { name: "Ngô Duy An", subject: { Toán: 7, Lý: 10 } },
];
const loc = student.flatMap((x) =>{
    const sbj=Object.values(x.subject);
    const avg =sbj.reduce((acc,cur)=>acc+cur,0)/sbj.length
    return {name:x.name , avg:avg};
})
console.log(loc);
