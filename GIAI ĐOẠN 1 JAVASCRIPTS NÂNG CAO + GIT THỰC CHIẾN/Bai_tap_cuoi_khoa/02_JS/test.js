// // async function LayBaiVietAPI() {
// //     try {
// //         const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts`);
// //         const responseUsers = await fetch(`https://jsonplaceholder.typicode.com/users`);
// //         if(!responseUsers.ok || !responsePosts.ok) throw new Error(`[Home] Lỗi lấy dữ liệu từ users ${responseUsers.status} , post:${responsePosts.status}`);
// //         const dataPosts = await responsePosts.json();
// //         const dataUsers = await responseUsers.json();
// //         const newdata = dataPosts.map((x) => {
// //             const find =dataUsers.find((y) => y.id === x.userId)
// //             if(find){
// //                 return {...x ,username:find.username}
// //             }
// //         })
// //         console.log(newdata);
// //     } catch (error) {
// //         console.log("Loi da chay o error"+error);
// //     }
// // }
// // LayBaiVietAPI();

// async function GanDuLieuApiChoPost() {
//   try {
//     const responsePosts = await fetch(
//       `https://jsonplaceholder.typicode.com/posts`,
//     );
//     const responseUsers = await fetch(
//       `https://jsonplaceholder.typicode.com/users`,
//     );
//     const responseComment = await fetch(`https://jsonplaceholder.typicode.com/comments`)
//     if (!responseUsers.ok || !responsePosts.ok || !responseComment.ok)
//       throw new Error(
//         `[Home] Lỗi lấy dữ liệu từ users ${responseUsers.status} , post:${responsePosts.status} , comment:${responseComment.status}`,
//       );
//     const dataPosts = await responsePosts.json();
//     const dataUsers = await responseUsers.json();
//     const dataComments = await responseComment.json();
//     const infoPostAndUserName = {
//       posts: dataPosts.map((post) => {
//         const findComment = dataComments.filter((comment) => comment.postId === post.id)
//         console.log(findComment);
//         if(findComment){
//             return {...post , save:false, comment:findComment};
//         }
//         else{
//             return null;
//         }
//       } ),
//       users: dataUsers
//     };
//     // console.log(infoPostAndUserName);
//     // Sau khi lấy dữ liệu xong thì đưa vào localStorage
//   } catch (error) {
//     console.log("[Catch] Lỗi:" + error);
//   }
// }
// GanDuLieuApiChoPost()
const mang1=[{Ten:"DuyAnh" , age:20} ,{Ten:"Thach" , age:20}]
const mang2=[{job:"tutor" , age:20}]
const mang3 =mang1.map((x) =>{
    const find = mang2.find((y) => y.age ===x.age);
    if(find){
        return {...x , job:find.job}; 
    }
    else{
        return null;
    }
})
console.log(mang3);
let mang =[1,2,3,4];
mang.map((x) => x*2);
console.log(mang);
