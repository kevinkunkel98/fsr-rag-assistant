import { Link } from "react-router-dom"
import infosaurus from "@/assets/infosaurus.png"

export function Header() {
  return (
    <header className="w-full bg-card border-b border-border h-16 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <img
          src={infosaurus}
          alt="Infosaurus"
          className="h-8 w-8 object-contain"
        />
        <span className="font-semibold text-lg">FSR Chat Assistant</span>
      </div>
      <nav>
        <Link to="/about" className="text-sm font-medium text-primary hover:underline">
          About
        </Link>
      </nav>
    </header>
  )
}
