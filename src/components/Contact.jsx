import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { COMPANY } from '../data'
import Reveal from './Reveal'

const EMPTY = { name: '', email: '', phone: '', message: '' }

const SECTION_BG = {
  background:
    'radial-gradient(50% 50% at 100% 0%, rgba(111,156,240,.35) 0%, rgba(111,156,240,0) 70%),' +
    'radial-gradient(55% 55% at 0% 100%, rgba(255,179,71,.40) 0%, rgba(255,179,71,0) 70%),' +
    '#fbf1ea',
}

const INPUT =
  'w-full rounded-xl border border-transparent bg-white px-4 py-3.5 text-base text-slate-800 placeholder:text-slate-500 ' +
  'outline-none ring-2 ring-transparent transition duration-200 focus:-translate-y-0.5 focus:ring-slate-900 ' +
  'aria-[invalid=true]:ring-rose-500 motion-reduce:transition-none motion-reduce:focus:translate-y-0'

const CARD =
  'group relative overflow-hidden border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_10px_40px_-20px_rgba(120,70,60,.35)] ' +
  'transition duration-300 hover:bg-white/60 hover:shadow-[0_24px_50px_-18px_rgba(120,70,60,.45)] motion-reduce:transition-none'

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Enter a valid email address.'
  if (!/^[+()\d\s-]{7,18}$/.test(v.phone.trim())) e.phone = 'Enter a valid phone number.'
  if (v.message.trim().length < 10) e.message = 'Tell us a little more (at least 10 characters).'
  return e
}

function Field({ label, name, error, children }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-semibold text-slate-900">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${name}-error`}
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-700"
          >
            <FiAlertCircle /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }))
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) return

    setStatus('sending')
    const {
      VITE_EMAILJS_SERVICE_ID: serviceId,
      VITE_EMAILJS_TEMPLATE_ID: templateId,
      VITE_EMAILJS_PUBLIC_KEY: publicKey,
    } = import.meta.env

    try {
      if (serviceId && templateId && publicKey) {
        // EmailJS is loaded on demand so it doesn't slow the first page load
        const emailjs = (await import('@emailjs/browser')).default
        await emailjs.send(
          serviceId,
          templateId,
          { from_name: values.name, reply_to: values.email, phone: values.phone, message: values.message },
          { publicKey }
        )
      } else {
        // No EmailJS keys yet: open the visitor's email app with the message filled in
        const body = encodeURIComponent(
          `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\n\n${values.message}`
        )
        window.location.href = `mailto:${COMPANY.email}?subject=${encodeURIComponent('Website enquiry from ' + values.name)}&body=${body}`
      }
      setStatus('success')
      setValues(EMPTY)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY.address)}&output=embed`

  const info = [
    { icon: FiMail, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: FiPhone, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone.replace(/\s/g, '')}` },
    { icon: FiMapPin, label: 'Office', value: COMPANY.address },
  ]

  return (
    <section id="contact" className="section relative overflow-hidden" style={SECTION_BG}>
      <div className="container-x relative">
        {/* Heading */}
        <div className="mb-12 lg:mb-16">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:whitespace-nowrap lg:text-5xl">
            Let&apos;s build something great together
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-700 sm:text-lg">
            Tell us about your project and we&apos;ll get back to you within one business day.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              noValidate
              className="space-y-5 rounded-[2rem] border border-white/60 bg-white/30 p-6 shadow-[0_20px_60px_-20px_rgba(120,70,60,.35)] backdrop-blur-xl sm:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" error={errors.name}>
                  <input
                    id="name" name="name" type="text" autoComplete="name" placeholder="Your name"
                    value={values.name} onChange={onChange} className={INPUT}
                    aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                </Field>
                <Field label="Phone" name="phone" error={errors.phone}>
                  <input
                    id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210"
                    value={values.phone} onChange={onChange} className={INPUT}
                    aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                </Field>
              </div>
              <Field label="Email" name="email" error={errors.email}>
                <input
                  id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com"
                  value={values.email} onChange={onChange} className={INPUT}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </Field>
              <Field label="Message" name="message" error={errors.message}>
                <textarea
                  id="message" name="message" rows={5} placeholder="Tell us about your project..."
                  value={values.message} onChange={onChange} className={`${INPUT} resize-none`}
                  aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
                />
              </Field>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-950 disabled:opacity-60 sm:w-auto"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
                <FiSend
                  className={`transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 ${
                    status === 'sending' ? 'animate-pulse' : ''
                  }`}
                />
              </button>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.p
                    key="ok" role="status"
                    initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex items-start gap-2 rounded-xl border border-emerald-600/30 bg-emerald-100/80 p-4 text-sm font-medium text-emerald-900"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 14, delay: 0.1 }}
                      className="mt-0.5 shrink-0"
                    >
                      <FiCheckCircle size={18} />
                    </motion.span>
                    Thank you! Your message has been sent. We&apos;ll reply shortly.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    key="err" role="alert"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex items-start gap-2 rounded-xl border border-rose-600/30 bg-rose-100/80 p-4 text-sm font-medium text-rose-900"
                  >
                    <FiAlertCircle className="mt-0.5 shrink-0" size={18} />
                    Something went wrong. Please try again or email us at {COMPANY.email}.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>

          {/* Info */}
          <div className="space-y-5 lg:col-span-2">
            {info.map((i, idx) => (
              <Reveal key={i.label} delay={idx * 0.08}>
                <div className={`${CARD} flex items-start gap-4 rounded-2xl p-5 hover:translate-x-1.5 motion-reduce:hover:translate-x-0`}>
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-orange-500 via-rose-500 to-indigo-600 transition duration-500 group-hover:scale-y-100 motion-reduce:transition-none"
                  />
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white transition duration-300 group-hover:rotate-6 group-hover:scale-110 motion-reduce:transition-none">
                    <i.icon size={20} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-700">{i.label}</p>
                    {i.href ? (
                      <a href={i.href} className="break-words font-medium text-slate-950 underline-offset-4 hover:text-indigo-700 hover:underline">
                        {i.value}
                      </a>
                    ) : (
                      <p className="font-medium text-slate-950">{i.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.25}>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent('Hi RD AI Labs, I would like to discuss a project.')}`}
                target="_blank" rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#25D366] px-6 py-4 font-semibold text-slate-950 shadow-[0_10px_30px_-10px_rgba(37,211,102,.7)] transition hover:-translate-y-1 hover:brightness-105 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {/* light sweep on hover */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -translate-x-full -skew-x-12 bg-white/40 blur-md transition duration-1000 group-hover:translate-x-[450%] motion-reduce:hidden"
                />
                <FaWhatsapp size={24} className="relative transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="relative">Chat on WhatsApp</span>
              </a>
            </Reveal>

            <Reveal delay={0.3}>
              <div className={`${CARD} rounded-2xl p-5`}>
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <FiClock /> Working hours
                </p>
                <ul className="space-y-2 text-sm">
                  {COMPANY.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4 border-b border-slate-900/10 pb-2 last:border-0 last:pb-0">
                      <span className="text-slate-700">{h.days}</span>
                      <span className="font-medium text-slate-950">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Map */}
        <Reveal className="mt-8">
          <div className="overflow-hidden rounded-3xl border border-white/60 shadow-[0_20px_60px_-20px_rgba(120,70,60,.35)] transition duration-500 hover:shadow-[0_28px_70px_-18px_rgba(120,70,60,.5)]">
            <iframe
              title="RD AI Labs office location"
              src={mapSrc}
              className="h-80 w-full border-0 grayscale-[30%] transition duration-500 hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}