async function LayBaiVietAPI() {
    try {
        const responsePosts = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const responseUsers = await fetch(`https://jsonplaceholder.typicode.com/users`);
        if(!responseUsers.ok || !responsePosts.ok) throw new Error(`[Home] Lỗi lấy dữ liệu từ users ${responseUsers.status} , post:${responsePosts.status}`);
        const dataPosts = await responsePosts.json();
        const dataUsers = await responseUsers.json();
        const newdata = dataPosts.map((x) => {
            const find =dataUsers.find((y) => y.id === x.userId)
            if(find){
                return {...x ,username:find.username}
            }
        })
        console.log(newdata);
    } catch (error) {
        console.log("Loi da chay o error"+error);
    }
}
LayBaiVietAPI();