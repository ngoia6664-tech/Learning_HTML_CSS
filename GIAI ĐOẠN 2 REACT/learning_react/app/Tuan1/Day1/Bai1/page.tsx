// Nhóm A: props và danh sách

// Bai 1.ProfileCard nhận name, role, online (boolean). Hiện 🟢 nếu online, ⚪ nếu không.
//  Render 3 thẻ với props khác nhau.
const userProfiles = [
    { id: 1, name: "Nguyễn Văn A", role: "Admin", online: true },
    { id: 2, name: "Trần Thị B", role: "Frontend Developer", online: false },
    { id: 3, name: "Lê Văn C", role: "Backend Developer", online: true },
    { id: 4, name: "Phạm Thị D", role: "UI/UX Designer", online: false },
    { id: 5, name: "Hoàng Văn E", role: "Tester", online: true }
];
 function ProfileCard(props:{name:string, role:string , online :boolean}){
    return (
        <div>
            <h3>Ho va ten:{props.name}</h3>
            <p>
            <span>Vai tro:{props.role}</span>
            <span>{props.online? "🟢 online":"⚪ offline"}</span>
            </p>
        </div>
    )
}
export default function Home(){
    return (
        <div style={{
            display :"grid",
            gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",
            gap:"12px",
            alignItems:"center",
            justifyContent:"center"
        }}>
            {userProfiles.map((x) => (
              <div key = {x.id} style={{
                display :"flex",
                padding:"4px 8px",
                backgroundColor:"gray",
                borderRadius:"12px",
              }}>
                <ProfileCard 
                name={x.name}
                role ={x.role}
                online ={x.online}
                />
              </div>  
            ))}
        </div>
    )
}

// bai 2 
// Mảng 5 cuốn sách { id, title, author, year }, component BookCard, render bằng map có key. Thử xóa key rồi xem F12 báo gì.