import Navbar from "@/components/Navbar";
import TicTacToe from "./ticTacToe";

export default function Home () {
    return (
        <div
            // style={{
            //     backgroundColor: "var(--background)",
            //     color: "var(--foreground)",
            //     minHeight: "100vh",
            // }}
        >       
            <Navbar />
            <h1>This is home page</h1>
            <TicTacToe />
        </div>
    )
};