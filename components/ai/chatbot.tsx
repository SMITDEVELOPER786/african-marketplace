"use client"

import { useState } from "react"
import { useLanguage } from "@/lib/i18n-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, X, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

export function AIChatbot() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([
    {
      role: "assistant",
      content:
        "Bonjour ! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui ?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user" as const, content: input }]
    setMessages(newMessages)
    setInput("")

    setTimeout(() => {
      const responses = [
        "Je peux vous aider à trouver des produits africains authentiques près de chez vous.",
        "Voulez-vous que je vous recommande des restaurants africains populaires ?",
        "Je peux vous aider à suivre vos commandes ou à trouver des offres spéciales.",
        "Avez-vous besoin d'aide pour naviguer sur la plateforme ?",
      ]
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)]
      setMessages([...newMessages, { role: "assistant", content: randomResponse }])
    }, 1000)
  }

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
   <Button
  onClick={() => setIsOpen(true)}
  size="lg"
  className="fixed bottom-4 right-62 sm:bottom-6 sm:right-16 md:bottom-2 md:right-2 lg:right-16 xl:right-20 
             h-14 w-14 rounded-full shadow-lg z-50 bg-[#b5432a] hover:bg-[#a53b24]
             translate-x-0 overflow-hidden"
>
  <MessageCircle className="h-6 w-6 text-white" />
</Button>

      )}

      {/* Chat Window */}
      {isOpen && (
      <Card
  className={cn(
  "fixed bottom-3 right-30 sm:right-4 md:right-6 lg:right-8 w-[54%] sm:w-[90%] md:w-[370px] lg:w-[380px] xl:w-[400px]",
  "max-h-[75vh] flex flex-col rounded-2xl border border-gray-200 shadow-2xl z-50"
)}


>

          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <div className="flex items-center gap-2">
              <Bot className="h-6 w-5 text-primary" />
              <CardTitle className="text-lg mb-1">
                {t("customer.aiAssistant")}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="hover:bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Chat Body */}
          <CardContent className="flex flex-col flex-grow space-y-0">
            {/* Messages (Scrollable Area) */}
           <div
  className="flex-grow overflow-y-auto max-h-[45vh] sm:max-h-[50vh] rounded-lg border p-3 bg-background
             space-y-4 overflow-x-hidden"
>

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-lg px-4 py-2 text-sm break-words leading-relaxed",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Field */}
            <div className="flex items-center gap-2 mt-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t("customer.askQuestion")}
                className="text-sm flex-1"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="shrink-0 bg-[#b5432a] hover:bg-[#a53b24]"
              >
                <Send className="h-4 w-4 text-white" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}

