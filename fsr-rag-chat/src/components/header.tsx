import { Link } from "react-router-dom"
import infosaurus from "@/assets/infosaurus.png"

export function Header() {
  return (
    <header className="w-full bg-card border-b border-border h-16 flex items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <Link to="/" className="pl-2">
          <img
            src={infosaurus}
            alt="Infosaurus"
            className="h-8 w-8 object-contain"
          />
        </Link>
        <span className="font-semibold text-lg">RalfGPT 3.0 Turbo</span>
      </div>
      <nav className="ml-2">
        <Link
          to="/about"
          className="text-bg font-bold text-primary hover:underline pr-2"
        >
          About
        </Link>
      </nav>
    </header>
  )
}
