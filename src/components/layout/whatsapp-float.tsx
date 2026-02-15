"use client"

import { MessageCircle, X } from "lucide-react"
import { useState } from "react"

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const phoneNumber = "254703445756" // Format: country code + number without leading 0
  const message = "Hello Helvino Technologies! I'm interested in your services."

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => window.open(whatsappUrl, '_blank')}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          className="group relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
          
          {/* Notification Dot */}
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
          
          {/* Hover Tooltip */}
          {isOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-64 bg-white text-gray-800 p-4 rounded-lg shadow-xl">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Helvino Technologies</p>
                  <p className="text-xs text-green-600">Online now</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Hi there! 👋 How can we help you today?
              </p>
              <p className="text-xs text-gray-500">
                Click to chat on WhatsApp
              </p>
            </div>
          )}
        </button>
      </div>

      {/* Ripple Effect */}
      <style jsx>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
