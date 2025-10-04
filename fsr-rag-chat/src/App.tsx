import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Chat } from './components/chat'
import { Footer } from './components/footer'
import { Header } from './components/header'
import About from './about' // Adjust import if needed

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 w-full">
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
