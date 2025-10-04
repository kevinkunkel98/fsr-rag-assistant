import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, Loader2, MessageSquare } from "lucide-react"

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export function Chat() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

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
    <Card className="w-full max-w-6xl mx-auto min-h-[800px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" />
          Hello how can I help you?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 flex-1 flex flex-col h-[700px]">
        <div className="flex-1 overflow-y-auto space-y-4 pr-4 mb-4">
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
                  <span className="font-semibold">{msg.role === 'user' ? 'You: ' : 'Assistant: '}</span>
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
            placeholder="Ask a question..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !message.trim()}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
