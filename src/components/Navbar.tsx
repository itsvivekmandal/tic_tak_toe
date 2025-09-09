import ThemeToggle from "./ThemeToggle"

export default function Navbar() {
    return (
        <nav className="flex justify-between p-4">
            <h1>LoopNBit</h1>
            <ThemeToggle />
        </nav>
    )
}