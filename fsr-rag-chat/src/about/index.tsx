import { Brain, BookOpen, Calendar, Users, MessageCircle, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  const features = [
    {
      icon: BookOpen,
      title: "Studienordnung & Module",
      description:
        "Fragen zu Modulen, Prüfungsordnungen, Studienablauf und Voraussetzungen werden präzise beantwortet.",
    },
    {
      icon: Calendar,
      title: "Termine & Fristen",
      description: "Informationen zu Prüfungsterminen, Anmeldefristen und wichtigen Deadlines im Semester.",
    },
    {
      icon: Users,
      title: "Fachschaftsrat",
      description: "Alles über den FSR Informatik, Sitzungsprotokolle, Veranstaltungen und Kontaktmöglichkeiten.",
    },
    {
      icon: MessageCircle,
      title: "Allgemeine Fragen",
      description: "Hilfe bei organisatorischen Fragen rund um das Studium an der Fakultät für Informatik.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">

      {/* What is RAG Section */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <Brain className="h-12 w-12 text-primary mx-auto" />
              <h2 className="text-3xl md:text-4xl font-bold">Was ist RAG?</h2>
            </div>
            <Card className="bg-card/50 backdrop-blur">
              <CardContent className="pt-6 space-y-4 text-lg leading-relaxed">
                <p>
                  <span className="font-semibold text-primary">Retrieval-Augmented Generation (RAG)</span> kombiniert
                  die Stärken von Informationsabruf und KI-Textgenerierung.
                </p>
                <p>
                  Der Chatbot durchsucht eine umfangreiche Wissensdatenbank mit Dokumenten des Fachschaftsrats,
                  Studienordnungen und FAQ-Einträgen. Anschließend generiert ein Large Language Model (LLM) präzise
                  Antworten basierend auf den gefundenen Informationen.
                </p>
                <p className="text-muted-foreground">
                  Das Ergebnis: Verlässliche, kontextbezogene Antworten statt allgemeiner KI-Halluzinationen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">Wobei kann ich helfen?</h2>
              <p className="text-xl text-muted-foreground">
                Der Assistent kennt sich aus mit allen Themen rund um das Informatikstudium
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur border-border hover:border-primary/50 transition-colors"
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
