export interface OpenRouterMessage {
  role: "user" | "assistant" | "system"
  content: string
}

export interface OpenRouterResponse {
  id: string
  model: string
  choices: {
    message: {
      role: string
      content: string
    }
    finish_reason: string
  }[]
}

export async function callOpenRouterAPI(messages: OpenRouterMessage[]): Promise<string> {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || "API request failed")
    }

    const data = await response.json()
    return data.content
  } catch (error) {
    console.error("[v0] OpenRouter API error:", error)
    throw error
  }
}
