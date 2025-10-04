import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2, MessageSquare } from "lucide-react"

// Add a simple toggle switch component
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center cursor-pointer select-none gap-2">
      <span className="font-semibold">Ralf Mode</span>
      <div
        className={`w-10 h-6 flex items-center bg-muted rounded-full p-1 transition-colors ${
          checked ? "bg-primary" : "bg-muted"
        }`}
        onClick={onChange}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            checked ? "translate-x-4" : ""
          }`}
        />
      </div>
    </label>
  )
}

type Message = {
  role: 'user' | 'assistant'
  content: string
}

const MESSAGES_KEY = "fsr-chat-messages"
const INPUT_KEY = "fsr-chat-input"
const RALF_MODE_KEY = "fsr-chat-ralf-mode"

export function Chat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [ralfMode, setRalfMode] = useState(false)

  // Load cached messages, input, and ralf mode on mount
  useEffect(() => {
    const cachedMessages = localStorage.getItem(MESSAGES_KEY)
    const cachedInput = localStorage.getItem(INPUT_KEY)
    const cachedRalfMode = localStorage.getItem(RALF_MODE_KEY)
    if (cachedMessages) setMessages(JSON.parse(cachedMessages))
    if (cachedInput) setMessage(cachedInput)
    if (cachedRalfMode) setRalfMode(cachedRalfMode === "true")
  }, [])

  // Cache messages whenever they change
  useEffect(() => {
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
  }, [messages])

  // Cache input whenever it changes
  useEffect(() => {
    localStorage.setItem(INPUT_KEY, message)
  }, [message])

  // Cache ralf mode whenever it changes
  useEffect(() => {
    localStorage.setItem(RALF_MODE_KEY, ralfMode.toString())
  }, [ralfMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = message.trim()
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setMessage("")
    setIsLoading(true)

    try {
      const res = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Ralf-Mode": ralfMode ? "true" : "false", // Optional: send ralf mode to backend
        },
        body: JSON.stringify(userMessage),
      })

      if (!res.ok) {
        throw new Error("Failed to get response")
      }

      const data = await res.text()
      setMessages(prev => [...prev, { role: 'assistant', content: data }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Error: Failed to connect to the chat API"
      }])
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto min-h-[800px] flex flex-row">
      <Card className="flex-1 flex flex-col relative">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Guten abend, ich bin Ralf. Wie kann ich helfen?
          </CardTitle>
          {/* Toggle rechts, gleiche Höhe wie CardTitle */}
          <div className="ml-auto flex items-center h-full">
            <Toggle checked={ralfMode} onChange={() => setRalfMode(v => !v)} />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 flex-1 flex flex-col h-[700px]">
          <div className="flex-1 overflow-y-auto space-y-4 pr-4 mb-4 max-h-[700px]">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="flex justify-start"
              >
                <div
                  className={`rounded-lg p-4 w-full ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    <span className="font-semibold">{msg.role === 'user' ? 'Du: ' : 'Assistant: ' }</span>
                    {msg.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Stelle mir eine Frage..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !message.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
