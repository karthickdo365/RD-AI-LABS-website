import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { COMPANY } from '../data'

/** Floating WhatsApp chat button, visible on every page. */
export default function WhatsAppButton() {
  return (
    <motion.a
      href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent('Hi RD AI Labs, I would like to discuss a project.')}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.4, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,.8)] sm:bottom-7 sm:right-7"
    >
      <span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        style={{ animation: 'pulse-ring 2s ease-out infinite' }}
        aria-hidden
      />
      <FaWhatsapp size={30} className="relative" />
    </motion.a>
  )
}
