import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  FiAlertCircle,
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiPhone,
  FiX,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

const EASE = [0.22, 1, 0.36, 1]

const FOCUS =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2'

const LABEL = 'block text-sm font-semibold text-slate-900'

const INPUT_CLASS =
  'mt-2 block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-slate-950 focus:bg-white focus:ring-4 focus:ring-slate-950/10'

// Soft translucent panel (used for contact details)
const GLASS =
  'rounded-2xl border border-white/70 bg-white/60 shadow-[0_10px_30px_-18px_rgba(60,40,80,.35)] backdrop-blur-md'

// Solid white card (used for the main form)
const WHITE_CARD =
  'rounded-3xl border border-white/80 bg-white shadow-[0_24px_60px_-28px_rgba(40,30,70,.45)]'

const SUBMIT_BTN =
  'group inline-flex min-h-12 shrink-0 items-center justify-center gap-2.5 rounded-full bg-slate-950 px-7 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-slate-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 ' +
  FOCUS

// Warm orange -> peach -> blue/purple gradient, fading to cream at the bottom
const SECTION_BG = {
  background:
    'linear-gradient(to bottom, rgba(251,244,239,0) 70%, #fbf4ef 100%),' +
    'radial-gradient(60% 75% at 0% 45%, rgba(255,172,64,.85) 0%, rgba(255,172,64,0) 70%),' +
    'radial-gradient(55% 65% at 42% 60%, rgba(250,140,120,.7) 0%, rgba(250,140,120,0) 72%),' +
    'radial-gradient(45% 55% at 82% 62%, rgba(176,160,224,.6) 0%, rgba(176,160,224,0) 72%),' +
    'radial-gradient(55% 75% at 100% 10%, rgba(100,150,240,.8) 0%, rgba(100,150,240,0) 72%),' +
    '#f6e9e2',
}

const STATUS_STYLES = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  error: 'border-red-200 bg-red-50 text-red-900',
  info: 'border-sky-200 bg-sky-50 text-sky-900',
}

const ROW =
  'group flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/70 ' +
  FOCUS

function IconBox({ icon: Icon, className = 'bg-slate-950' }) {
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white ${className}`}
    >
      <Icon size={18} aria-hidden="true" />
    </span>
  )
}

function Arrow() {
  return (
    <FiArrowUpRight
      size={17}
      className="shrink-0 text-slate-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-950"
      aria-hidden="true"
    />
  )
}

// One row inside the contact-details panel
function InfoRow({ icon, iconClass, label, href, external, children }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={ROW}
    >
      <IconBox icon={icon} className={iconClass} />

      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          {label}
        </span>
        <span className="mt-0.5 block break-words text-[15px] font-semibold leading-6 text-slate-950">
          {children}
        </span>
      </span>

      <Arrow />
    </a>
  )
}

function StatusMessage({ status }) {
  if (!status.message) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-start gap-2.5 rounded-lg border p-3.5 text-sm leading-6 ${
        STATUS_STYLES[status.type] || STATUS_STYLES.info
      }`}
    >
      {status.type === 'success' ? (
        <FiCheckCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      ) : (
        <FiAlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
      )}
      <span>{status.message}</span>
    </div>
  )
}

export default function Contact() {
  const reduceMotion = useReducedMotion()

  const [form, setForm] = useState(EMPTY_FORM)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [mapOpen, setMapOpen] = useState(false)

  const email = 'contact@rdailabs.com'
  const phone = '+91 77088 91568'
  const address = '366/145/S, 3rd Gandhi Rd, Attur, TN 636102, India'
  const officeCoordinates = '11.598776516480894,78.59249654807462'

  const whatsappNumber = phone.replace(/\D/g, '')

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : null

  const mapsUrl =
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeCoordinates)}`

  const mapsEmbedUrl =
    `https://www.google.com/maps?q=${encodeURIComponent(officeCoordinates)}&output=embed`

  useEffect(() => {
    if (!mapOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setMapOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mapOpen])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    if (status.message) {
      setStatus({ type: '', message: '' })
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (sending) return

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    setSending(true)
    setStatus({ type: '', message: '' })

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: form.name,
            from_email: form.email,
            phone: form.phone,
            message: form.message,
            to_email: email,
          },
          publicKey
        )

        setStatus({
          type: 'success',
          message: 'Your message has been sent successfully. Thank you!',
        })

        setForm(EMPTY_FORM)
      } else {
        const subject = encodeURIComponent(
          `Project enquiry from ${form.name}`
        )

        const body = encodeURIComponent(
          `Name: ${form.name}\n` +
          `Phone: ${form.phone}\n` +
          `Email: ${form.email}\n\n` +
          `Message:\n${form.message}`
        )

        window.location.href =
          `mailto:${email}?subject=${subject}&body=${body}`

        setStatus({
          type: 'info',
          message:
            'Your email application is opening. Send the prepared message to complete your enquiry.',
        })
      }
    } catch (error) {
      console.error('Contact form submission failed:', error)

      setStatus({
        type: 'error',
        message:
          'We could not send your message. Please try again or contact us directly by email.',
      })
    } finally {
      setSending(false)
    }
  }

  const fadeUp = (delay = 0) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.08 },
    transition: { duration: reduceMotion ? 0 : 0.6, delay: reduceMotion ? 0 : delay, ease: EASE },
  })

  return (
    <>
      <section
        id="contact"
        className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
        style={SECTION_BG}
      >
        <div className="container-x relative mx-auto max-w-6xl">
          <div className="grid items-stretch gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
            {/* Left: intro + contact details */}
            <motion.div {...fadeUp()} className="flex min-w-0 flex-col">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                Contact us
              </p>

              <h1 className="mt-4 font-display text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1.1] tracking-tight text-slate-950">
                Let’s build the future together.
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-slate-800">
                Have an idea but not sure how to take it forward? We’re here to help.
                Get in touch with us today—together, we can bring your vision to life
                and turn your ideas into reality.
              </p>

              {/* Contact details — one clean panel with dividers */}
              <div className={`${GLASS} mt-9 divide-y divide-slate-900/10 overflow-hidden`}>
                <InfoRow icon={FiMail} label="Email" href={`mailto:${email}`}>
                  {email}
                </InfoRow>

                <InfoRow
                  icon={FiPhone}
                  label="Phone"
                  href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                >
                  {phone}
                </InfoRow>

                {/* Office — opens the map popup */}
                <button
                  type="button"
                  onClick={() => setMapOpen(true)}
                  className={ROW}
                >
                  <IconBox icon={FiMapPin} />

                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Office
                    </span>
                    <span className="mt-0.5 block break-words text-[15px] font-semibold leading-6 text-slate-950">
                      {address}
                    </span>
                    <span className="mt-0.5 block text-xs font-semibold text-slate-600 underline underline-offset-4">
                      View on map
                    </span>
                  </span>

                  <Arrow />
                </button>

                {whatsappUrl && (
                  <InfoRow
                    icon={FaWhatsapp}
                    iconClass="bg-emerald-500"
                    label="WhatsApp"
                    href={whatsappUrl}
                    external
                  >
                    Chat with us
                  </InfoRow>
                )}
              </div>
            </motion.div>

            {/* Right: form card (stretches to match the left column) */}
            <motion.form
              {...fadeUp(0.08)}
              onSubmit={handleSubmit}
              className={`${WHITE_CARD} flex min-w-0 flex-col gap-5 p-6 sm:p-8 lg:p-9`}
            >
              <div>
                <h2 className="font-display text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                  Send us a message
                </h2>
                <p className="mt-1.5 text-sm text-slate-600">
                  Fields marked with <span className="text-red-600">*</span> are required.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={LABEL}>
                    Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    maxLength={100}
                    className={INPUT_CLASS}
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className={LABEL}>
                    Phone <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    required
                    maxLength={25}
                    className={INPUT_CLASS}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className={LABEL}>
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  maxLength={254}
                  className={INPUT_CLASS}
                />
              </div>

              <div className="flex flex-1 flex-col">
                <label htmlFor="contact-message" className={LABEL}>
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project, goals, or requirements..."
                  required
                  maxLength={5000}
                  className={`${INPUT_CLASS} min-h-[140px] flex-1 resize-y leading-6`}
                />
                <p className="mt-1.5 text-right text-xs text-slate-500">
                  {form.message.length}/5000
                </p>
              </div>

              <StatusMessage status={status} />

              <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-xs text-xs leading-5 text-slate-500">
                  Your details are only used to respond to your enquiry.
                </p>

                <button type="submit" disabled={sending} className={SUBMIT_BTN}>
                  {sending ? 'Sending...' : 'Send message'}
                  <FiArrowRight
                    size={17}
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Map popup */}
      {mapOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setMapOpen(false)
            }
          }}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: EASE }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-map-title"
            className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-4 sm:p-5">
              <div className="flex min-w-0 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-white">
                  <FiMapPin size={18} aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <h2
                    id="contact-map-title"
                    className="font-display text-lg font-semibold text-slate-950"
                  >
                    Find our office
                  </h2>
                  <p className="mt-1 break-words text-sm leading-5 text-slate-600">
                    {address}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMapOpen(false)}
                aria-label="Close map"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 ${FOCUS}`}
              >
                <FiX size={19} aria-hidden="true" />
              </button>
            </div>

            <div className="min-h-[260px] flex-1 bg-slate-100 sm:min-h-[400px]">
              <iframe
                title="Map showing our office location"
                src={mapsEmbedUrl}
                className="block h-full min-h-[300px] w-full border-0 sm:min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <p className="text-xs leading-5 text-slate-600">
                Open Google Maps for directions to the office.
              </p>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 ${FOCUS}`}
              >
                Open Google Maps
                <FiArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}