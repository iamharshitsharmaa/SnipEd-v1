import { X, Send } from "lucide-react"
import { useState } from "react"

interface Message {
  id: string
  sender: string
  text: string
  timestamp: string
}

interface MessageOverlayProps {
  isOpen: boolean
  onClose: () => void
  reelId: string
}

export function MessageOverlay({ isOpen, onClose, reelId }: MessageOverlayProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "User1",
      text: "Great video! 👏",
      timestamp: "2m ago"
    },
    {
      id: "2",
      sender: "User2",
      text: "Thanks for sharing this!",
      timestamp: "5m ago"
    }
  ])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: "You",
      text: newMessage,
      timestamp: "Just now"
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-neutral-900 rounded-lg w-full max-w-md">
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="text-lg font-bold">Comment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-800 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 p-3 rounded-lg ${
                message.sender === "You" 
                  ? "bg-blue-600 ml-auto" 
                  : "bg-neutral-800/50"
              } max-w-[80%]`}
            >
              <div className="flex justify-between items-start">
                <span className="font-bold">{message.sender}</span>
                <span className="text-xs text-neutral-300 ml-2">{message.timestamp}</span>
              </div>
              <p className="mt-1 text-neutral-100 break-words">{message.text}</p>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-neutral-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-neutral-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}