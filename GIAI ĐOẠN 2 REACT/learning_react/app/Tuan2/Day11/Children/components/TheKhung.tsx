import { ReactNode } from "react";

export default function TheKhung(props: {
  tieuDe: string;
  children: ReactNode;
}) {
  return (
    <div style={{ border: "1px solid gray", padding: 12, margin: 8 }}>
      <h3>{props.tieuDe}</h3>
      {props.children}
    </div>
  );
}