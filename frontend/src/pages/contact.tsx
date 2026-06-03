import Head from 'next/head'
import Container from '@/components/layout/Container'
import SectionTitle from '@/components/common/SectionTitle'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { useFetch } from '@/hooks/useFetch'
import { fetchContact } from '@/lib/sanity'
import type { Contact } from '@/types'
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp,
  FaFacebook, FaInstagram,
} from 'react-icons/fa'
import { useState } from 'react'

// KIRAN PUBLIC SCHOOL — Hardcoded fallback contact details
const SCHOOL_PHONE = process.env.NEXT_PUBLIC_SITE_PHONE || '9065104078'
const SCHOOL_EMAIL = process.env.NEXT_PUBLIC_SITE_EMAIL || '8541064924suraj@gmail.com'
const SCHOOL_ADDRESS = process.env.NEXT_PUBLIC_SITE_ADDRESS || 'Pachpakari Road, Barharwa, Siwan-845418'
const WHATSAPP_NUMBER = '917667456367'

interface FormData {
  name: string
  phone: string
  email: string
  message: string
}

function buildWhatsAppUrl(form: FormData): string {
  const text = [
    'Hello KIRAN PUBLIC SCHOOL',
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Email: ${form.email.trim()}`,
    `Message: ${form.message.trim()}`,
  ].join('\n')

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

function getWhatsAppUrl(phone?: string, message?: string) {
  if (!phone) return '#'
  const url = `https://wa.me/${phone.replace(/\D/g, '')}`
  return message ? `${url}?text=${encodeURIComponent(message)}` : url
}

export default function ContactPage() {
  const { data: contactData, loading, error } = useFetch<Contact>(() => fetchContact(), [])
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', email: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (submitMessage) setSubmitMessage('')
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const trimmedForm = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    }

    if (!trimmedForm.name || !trimmedForm.phone || !trimmedForm.email || !trimmedForm.message) {
      setSubmitMessage('Please fill in all required fields before sending.')
      return
    }

    setSubmitting(true)
    setSubmitMessage('Opening WhatsApp with your enquiry...')

    const waUrl = buildWhatsAppUrl(trimmedForm)
    window.open(waUrl, '_blank', 'noopener,noreferrer')

    window.setTimeout(() => {
      setSubmitting(false)
      setSubmitMessage('WhatsApp opened in a new tab. Please press Send there.')
      setFormData({ name: '', phone: '', email: '', message: '' })
    }, 600)
  }

  // Resolve display values (CMS > hardcoded fallback)
  const displayPhone = contactData?.phone || SCHOOL_PHONE
  const displayEmail = contactData?.email || SCHOOL_EMAIL
  const displayAddress = contactData?.address
    ? `${contactData.address}${contactData.city ? ', ' + contactData.city : ''}${contactData.state ? ', ' + contactData.state : ''}${contactData.pincode ? ' - ' + contactData.pincode : ''}`
    : SCHOOL_ADDRESS
  const displayWaNumber = WHATSAPP_NUMBER

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error loading Contact Information</h1>
            <p className="text-gray-500">Please check your Sanity CMS connection.</p>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Contact Us — KIRAN PUBLIC SCHOOL | Barharwa, Siwan</title>
        <meta
          name="description"
          content="Contact KIRAN PUBLIC SCHOOL in Barharwa, Siwan. Phone: 9065104078. For admissions, enquiries, or any questions — we are here to help."
        />
      </Head>

      {/* Page Header */}
      <section className="page-header text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <SectionTitle
              title="Contact Us"
              subtitle="Reach out for admissions, enquiries, or any questions. We'd love to hear from you!"
              centered={false}
              light
            />
          </div>
        </Container>
      </section>

      <section className="section-padding bg-slate-50 dark:bg-gray-950">
        <Container>
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

              {/* ── Left: Contact Information ── */}
              <div className="lg:col-span-2 space-y-5">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Get In Touch
                </h2>

                {/* Phone */}
                <ContactInfoCard
                  icon={<FaPhone />}
                  title="Phone"
                  gradient="from-blue-500 to-blue-700"
                >
                  <a
                    href={`tel:${displayPhone}`}
                    className="text-navy-700 dark:text-primary-400 font-semibold hover:underline"
                  >
                    +91 {displayPhone}
                  </a>
                </ContactInfoCard>

                {/* Email */}
                <ContactInfoCard
                  icon={<FaEnvelope />}
                  title="Email"
                  gradient="from-emerald-500 to-emerald-700"
                >
                  <a
                    href={`mailto:${displayEmail}`}
                    className="text-navy-700 dark:text-primary-400 font-semibold hover:underline break-all"
                  >
                    {displayEmail}
                  </a>
                </ContactInfoCard>

                {/* WhatsApp */}
                <ContactInfoCard
                  icon={<FaWhatsapp />}
                  title="WhatsApp"
                  gradient="from-green-500 to-green-700"
                >
                  <a
                    href={getWhatsAppUrl(
                      displayWaNumber,
                      contactData?.whatsappMessage ||
                        'Hi, I would like to enquire about admission at KIRAN PUBLIC SCHOOL.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-sm transition-colors"
                  >
                    <FaWhatsapp /> Chat with us
                  </a>
                </ContactInfoCard>

                {/* Address */}
                <ContactInfoCard
                  icon={<FaMapMarkerAlt />}
                  title="Address"
                  gradient="from-red-500 to-red-700"
                >
                  <p className="text-gray-700 dark:text-gray-300">{displayAddress}</p>
                </ContactInfoCard>

                {/* Office Hours */}
                {contactData?.officeHours && contactData.officeHours.length > 0 ? (
                  <ContactInfoCard
                    icon={<FaClock />}
                    title="Office Hours"
                    gradient="from-purple-500 to-purple-700"
                  >
                    <div className="space-y-1.5">
                      {contactData.officeHours.map((hour, idx) => (
                        <div key={idx} className="flex justify-between text-sm gap-4">
                          <span className="font-medium text-gray-700 dark:text-gray-300">{hour.day}</span>
                          <span className="text-gray-500 dark:text-gray-400">{hour.time}</span>
                        </div>
                      ))}
                    </div>
                  </ContactInfoCard>
                ) : (
                  <ContactInfoCard
                    icon={<FaClock />}
                    title="Office Hours"
                    gradient="from-purple-500 to-purple-700"
                  >
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between gap-4">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Mon – Sat</span>
                        <span className="text-gray-500 dark:text-gray-400">8:00 AM – 2:00 PM</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="font-medium text-gray-700 dark:text-gray-300">Sunday</span>
                        <span className="text-gray-500 dark:text-gray-400">Closed</span>
                      </div>
                    </div>
                  </ContactInfoCard>
                )}

                {/* Social Links */}
                {contactData?.socialLinks && (
                  <div className="flex gap-3 pt-2">
                    {contactData.socialLinks.facebook && (
                      <a href={contactData.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center text-white transition-colors hover:scale-110">
                        <FaFacebook />
                      </a>
                    )}
                    {contactData.socialLinks.instagram && (
                      <a href={contactData.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                        className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-xl flex items-center justify-center text-white transition-colors hover:scale-110">
                        <FaInstagram />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* ── Right: Form + Map ── */}
              <div className="lg:col-span-3 space-y-6">

                {/* ── Contact Form → WhatsApp Redirect ── */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-card border border-gray-100 dark:border-gray-700 p-7">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Send an Enquiry
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-2">
                    <FaWhatsapp className="text-green-500" />
                    Submitting will open <strong>WhatsApp</strong> with your message pre-filled.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Student/Parent Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="contact-name"
                          value={formData.name}
                          onChange={handleFormChange}
                          placeholder="Student or parent full name"
                          required
                          autoComplete="name"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="contact-phone"
                          value={formData.phone}
                          onChange={handleFormChange}
                          placeholder="10-digit mobile number"
                          required
                          autoComplete="tel"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="your@email.com"
                        required
                        autoComplete="email"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        id="contact-message"
                        value={formData.message}
                        onChange={handleFormChange}
                        placeholder="e.g., I would like to enquire about admission for my child in Class I..."
                        rows={5}
                        required
                        minLength={3}
                        className="input-field resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      id="contact-submit"
                      className="w-full justify-center py-3.5 inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:scale-100 text-base shadow-lg"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Opening WhatsApp...
                        </>
                      ) : (
                        <>
                          <FaWhatsapp size={20} />
                          Submit on WhatsApp
                        </>
                      )}
                    </button>

                    {submitMessage && (
                      <p
                        className={`text-sm text-center font-medium ${
                          submitting
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                        aria-live="polite"
                      >
                        {submitMessage}
                      </p>
                    )}

                    <p className="text-xs text-center text-gray-400 dark:text-gray-500">
                      You'll be redirected to WhatsApp with your message pre-filled. No account needed.
                    </p>
                  </form>
                </div>


              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}

function ContactInfoCard({
  icon,
  title,
  gradient,
  children,
}: {
  icon: React.ReactNode
  title: string
  gradient: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5 flex gap-4 items-start shadow-card">
      <div
        className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white flex-shrink-0`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{title}</p>
        {children}
      </div>
    </div>
  )
}
