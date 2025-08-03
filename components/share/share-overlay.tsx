import { X, Twitter, Facebook, Link2, Instagram, Mail } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"

// WhatsApp icon as a React component (SVG)
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="none" width={24} height={24} {...props}>
    <circle cx="16" cy="16" r="16" fill="#25D366"/>
    <path d="M23.5 8.5a9.94 9.94 0 0 0-7.5-3.5c-5.5 0-10 4.5-10 10 0 1.8.5 3.5 1.4 5l-1.5 4.5 4.6-1.5c1.4.8 3.1 1.3 4.9 1.3 5.5 0 10-4.5 10-10 0-2.7-1.1-5.2-2.9-7.3zM16 24c-1.5 0-3-.4-4.3-1.1l-.3-.2-2.7.9.9-2.6-.2-.3C8.4 19 8 17.5 8 16c0-4.4 3.6-8 8-8 2.1 0 4.1.8 5.6 2.3A7.93 7.93 0 0 1 24 16c0 4.4-3.6 8-8 8zm4.2-6.2c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.6.1-.2.2-.7.7-.9.9-.2.2-.3.2-.6.1-.2-.1-.8-.3-1.5-.9-.6-.5-1-1.2-1.1-1.4-.1-.2 0-.4.1-.5.1-.1.2-.2.3-.3.1-.1.1-.2.2-.3.1-.1.1-.2.2-.3.1-.1.1-.2.1-.3 0-.1 0-.2-.1-.3-.1-.1-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.5.2-.2.2-.7.7-.7 1.7 0 1 .7 2 1.1 2.5.4.5 1.6 2.1 3.9 2.8.5.1.9.2 1.2.1.4-.1 1.2-.5 1.4-1 .2-.5.2-.9.1-1z" fill="#fff"/>
  </svg>
)

interface ShareOption {
  icon: React.ComponentType<any>
  label: string
  action: () => void
  color?: string
}

interface ShareOverlayProps {
  isOpen: boolean
  onClose: () => void
  reelId: string
}

export function ShareOverlay({ isOpen, onClose, reelId }: ShareOverlayProps) {
  const [copied, setCopied] = useState(false)

  const getShareUrl = () => {
    const baseUrl = window.location.origin
    return `${baseUrl}/reel/${reelId}`
  }

  const shareOptions: ShareOption[] = [
    {
      icon: Twitter,
      label: "Twitter",
      color: "#1DA1F2",
      action: () => window.open(`https://twitter.com/intent/tweet?text=Check out this video!&url=${encodeURIComponent(getShareUrl())}`)
    },
    {
      icon: Facebook,
      label: "Facebook",
      color: "#4267B2",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`)
    },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      color: "#25D366",
      action: () => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this video! ${getShareUrl()}`)}`)
    },
    {
      icon: Instagram,
      label: "Instagram",
      color: "#E4405F",
      action: () => {
        toast.error("Instagram sharing is not supported directly. Copy the link instead!")
      }
    },
    {
      icon: Mail,
      label: "Email",
      color: "#EA4335",
      action: () => window.open(`mailto:?subject=${encodeURIComponent("Check out this video!")}&body=${encodeURIComponent(getShareUrl())}`)
    },
    {
      icon: Link2,
      label: "Copy Link",
      action: () => {
        navigator.clipboard.writeText(getShareUrl()).then(() => {
          setCopied(true)
          toast.success("Link copied to clipboard!")
          setTimeout(() => setCopied(false), 2000)
        }).catch(() => {
          toast.error("Failed to copy link")
        })
      }
    }
  ]

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div 
        className="bg-neutral-900 rounded-lg w-full max-w-md animate-in fade-in-50 slide-in-from-bottom-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="text-lg font-bold">Share this video</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
            aria-label="Close share dialog"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-3 gap-4">
          {shareOptions.map((option) => (
            <button
              key={option.label}
              onClick={option.action}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-neutral-800/60 transition-all hover:scale-105"
              aria-label={`Share on ${option.label}`}
            >
              <div 
                className="p-2 rounded-full transition-colors"
                style={{ color: option.color }}
              >
                <option.icon size={24} />
              </div>
              <span className="text-sm text-center">
                {option.label === "Copy Link" && copied ? "Copied!" : option.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}