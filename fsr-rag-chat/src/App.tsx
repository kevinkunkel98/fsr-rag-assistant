import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Chat } from './components/chat'
import { Footer } from './components/footer'
import { Header } from './components/header'

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4 w-full">
          <Chat />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
