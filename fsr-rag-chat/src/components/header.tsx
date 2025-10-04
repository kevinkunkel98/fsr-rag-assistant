import { Link } from "react-router-dom"
import infosaurus from "@/assets/infosaurus.png"

export function Header() {
  return (
    <header className="w-full bg-card border-b border-border h-16 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Link to="/">
          <img
            src={infosaurus}
            alt="Infosaurus"
            className="h-8 w-8 object-contain"
          />
        </Link>
        <span className="font-semibold text-lg">FSR Chat Assistant</span>
      </div>
      <nav className="ml-2">
        <Link
          to="/about"
          className="text-sm font-bold text-primary hover:underline"
        >
          About
        </Link>
      </nav>
    </header>
  )
}
