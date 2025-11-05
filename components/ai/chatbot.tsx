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
          className="fixed bottom-17 right-18 sm:right-6 md:right-6 lg:right-8 
                     h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg z-50 
                     bg-[#b5432a] hover:bg-[#a53b24] pr-0"
          aria-label={t("customer.openChat") || "Open chat"}
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card
          className={cn(
            "fixed bottom-4 right-4 left-4 sm:left-auto sm:w-[90vw] md:w-[370px] lg:w-[380px] xl:w-[400px]",
            "max-h-[80vh] sm:max-h-[75vh] flex flex-col rounded-xl sm:rounded-2xl",
            "border border-gray-200 shadow-2xl z-50"
          )}
        >
          {/* Header */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 sm:pb-4 px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              <CardTitle className="text-base sm:text-lg">
                {t("customer.aiAssistant")}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-transparent"
              aria-label={t("customer.closeChat") || "Close chat"}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>

          {/* Chat Body */}
          <CardContent className="flex flex-col flex-grow space-y-0 px-4 sm:px-6 pb-4 sm:pb-6">
            {/* Messages (Scrollable Area) */}
            <div
              className="flex-grow overflow-y-auto max-h-[50vh] sm:max-h-[45vh] rounded-lg border p-3 bg-background
                         space-y-3 sm:space-y-4 overflow-x-hidden"
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
                      "max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 text-sm break-words leading-relaxed",
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
            <div className="flex items-center gap-2 mt-3 sm:mt-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder={t("customer.askQuestion")}
                className="text-sm flex-1 h-10 sm:h-9"
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="shrink-0 h-10 w-10 sm:h-9 sm:w-9 bg-[#b5432a] hover:bg-[#a53b24]"
                aria-label={t("customer.sendMessage") || "Send message"}
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