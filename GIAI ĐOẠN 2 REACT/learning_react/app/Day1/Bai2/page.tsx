"use client"
import { useState } from "react";

const listBooks = [
    { id: 1, title: "Nhà Giả Kim", author: "Paulo Coelho", year: 1988, price: 100 },
    { id: 2, title: "Đắc Nhân Tâm", author: "Dale Carnegie", year: 1936, price: 150 },
    { id: 3, title: "Tuổi Trẻ Đáng Giá Bao Nhiêu", author: "Rosie Nguyễn", year: 2016, price: 200 },
    { id: 4, title: "Sắt Son Một Lòng", author: "Nguyễn Nhật Ánh", year: 2020, price: 170 },
    { id: 5, title: "Clean Code", author: "Robert C. Martin", year: 2008, price: 200 }
];

function ProFileBook(props: { title: string; author: string; year: number; price: number }) {
    return (
        <div style={styles.card}>
            <h3 style={styles.title}>Tên sách: {props.title}</h3>
            <span style={styles.text}>Tác giả: {props.author}</span>
            <span style={styles.text}>Năm sản xuất: {props.year}</span>
            <span style={styles.price}>Giá: {props.price}$</span>
        </div>
    );
}

export default function Home() {
    const [book, setBook] = useState(listBooks);

    function RemoveBook(id: number) {
        setBook(book.filter((x) => x.id !== id));
    }

    function AddBook() {
        setBook([{ id: Date.now(), title: "Sách mới thêm", author: "Duy Anh", year: 2026, price: 200 },...book]);
    }

    const totalPrice = book.reduce((acc, cur) => acc + cur.price, 0);
    const totalBook = book.length; // Lấy tổng số lượng sách

    return (
        <div style={styles.container}>
            <div style={styles.headerFlex}>
                <h2 style={styles.heading}>Quản Lý Tủ Sách</h2>
                {/* Nút thêm sách */}
                <button style={styles.btnAdd} onClick={() => AddBook()}>
                    ➕ Thêm sách mới
                </button>
            </div>
            
            {/* Lưới hiển thị danh sách sách (Hàng ngang, tự động xuống dòng) */}
            <div style={styles.grid}>
                {book.map((x) => (
                    <div key={x.id} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <ProFileBook 
                            title={x.title}
                            author={x.author}
                            year={x.year}
                            price={x.price}
                        />
                        <button 
                            style={styles.btnDelete} 
                            onClick={() => RemoveBook(x.id)}
                        >
                            Xóa sách 🗑️
                        </button>
                    </div>
                ))}
            </div>

            {/* Thống kê tổng tiền và tổng số sách */}
            <div style={styles.totalBox}>
                <span style={{ fontSize: "15px", color: "#ccc" }}>Tổng số sách: <strong style={{ color: "#fff" }}>{totalBook}</strong>cuốn</span>
                <h3 style={{ margin: "6px 0 0 0" }}>Tổng tiền thanh toán: <span style={{ color: "#10b981" }}>{totalPrice}$</span></h3>
            </div>
        </div>
    );
}

// 🎨 Cục CSS gom chung viết trực tiếp bằng JS Object
const styles = {
    container: {
        maxWidth: "1000px",
        width:"100%",
        margin: "30px auto",
        backgroundColor: "#121212",
        border: "1px solid #2a2a2a",
        borderRadius: "12px",
        padding: "24px",
        color: "#ffffff",
        fontFamily: "sans-serif",
    } as React.CSSProperties,

    headerFlex: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
    } as React.CSSProperties,

    heading: {
        color: "#ffc107",
        fontSize: "24px",
        margin: 0,
    } as React.CSSProperties,

    grid: {
        display: "grid",
        // Dùng auto-fill để lấp đầy hàng ngang, mỗi thẻ tối thiểu 260px, hết chỗ tự xuống dòng
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "16px",
        marginBottom: "24px",
    } as React.CSSProperties,

    card: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        backgroundColor: "#1e1e1e",
        border: "1px solid #333",
        borderRadius: "10px",
        padding: "16px",
        height: "100%",
        boxSizing: "border-box" as const,
    } as React.CSSProperties,

    title: {
        color: "#ffc107",
        fontSize: "18px",
        margin: "0 0 4px 0",
    } as React.CSSProperties,

    text: {
        color: "#ccc",
        fontSize: "14px",
    } as React.CSSProperties,

    price: {
        color: "#10b981",
        fontWeight: "bold",
        fontSize: "15px",
    } as React.CSSProperties,

    btnAdd: {
        backgroundColor: "#f59e0b",
        color: "#000",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "opacity 0.2s",
    } as React.CSSProperties,

    btnDelete: {
        backgroundColor: "#dc2626",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: 500,
        cursor: "pointer",
        transition: "opacity 0.2s",
    } as React.CSSProperties,

    totalBox: {
        borderTop: "1px solid #333",
        paddingTop: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    } as React.CSSProperties,
};