import { FaWhatsapp } from 'react-icons/fa'

interface WhatsAppButtonProps {
  phone?: string
  message?: string
}

export default function WhatsAppButton({
  phone = '917667456367',
  message = 'Hi, I would like to enquire about your school.',
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="whatsapp-float group"
    >
      <div className="relative flex items-center justify-center">
        {/* Pulse ring */}
        <span className="absolute w-14 h-14 rounded-full bg-green-400 animate-ping opacity-30" />
        {/* Main button */}
        <div className="relative w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300">
          <FaWhatsapp className="text-white text-2xl" />
        </div>
        {/* Tooltip */}
        <span className="absolute right-16 whitespace-nowrap bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          Chat with us
          <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 border-4 border-transparent border-l-gray-900" />
        </span>
      </div>
    </a>
  )
}
