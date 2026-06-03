import Link from 'next/link'
import {
  FaPhone, FaEnvelope, FaMapMarkerAlt,
  FaFacebook, FaInstagram, FaWhatsapp
} from 'react-icons/fa'
import Image from 'next/image'
import Container from './Container'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Notices', href: '/notices' },
  { label: 'Gallery', href: '/gallery' },
]

const moreLinks = [
  { label: 'Videos', href: '/videos' },
  { label: 'Contact', href: '/contact' },
]

// KIRAN PUBLIC SCHOOL — Contact fallback (if Sanity not configured)
const SCHOOL_PHONE = process.env.NEXT_PUBLIC_SITE_PHONE || '9065104078'
const SCHOOL_EMAIL = process.env.NEXT_PUBLIC_SITE_EMAIL || '8541064924suraj@gmail.com'
const SCHOOL_ADDRESS = process.env.NEXT_PUBLIC_SITE_ADDRESS || 'Pachpakari Road, Barharwa, Siwan-845418'
const WHATSAPP_NUMBER = '917667456367'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 dark:bg-gray-950 text-gray-300">
      {/* Top accent bar */}
      <div className="h-1" style={{ background: 'linear-gradient(to right, #1535cc, #6366f1, #f59e0b)' }} />

      <Container>
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* School Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-12 h-12 relative flex-shrink-0 bg-white rounded-xl overflow-hidden p-1 shadow-sm">
                <Image
                  src="/logo/logo.jpeg"
                  alt="KIRAN PUBLIC SCHOOL Logo"
                  fill
                  className="object-contain"
                  onError={() => {}}
                />
              </div>
              <div>
                <span className="font-bold text-base text-white block">KIRAN PUBLIC SCHOOL</span>
                <span className="text-xs text-gray-500">CBSE · English Medium</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-2">
              Nurturing excellence and building futures through quality CBSE education.
              Classes Nursery to Class VIII.
            </p>
            <p className="text-xs text-gold-500 font-semibold mb-5">
              📚 CBSE Board &nbsp;|&nbsp; 🇬🇧 English Medium &nbsp;|&nbsp; 🏫 Nursery–Class VIII
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/reel/1601929144627567/?mibextid=rS40aB7S9Ucbxw6v"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 bg-gray-800 hover:bg-[#1877F2] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[#1877F2]/50"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/sunny_kumar_jha_945418?utm_source=qr&igsh=OGhlaGRrYjZveG9w"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[#bc1888]/50"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 bg-gray-800 hover:bg-[#25D366] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[#25D366]/50"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-base">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-600 group-hover:w-3 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Pages */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-base">More Pages</h3>
            <ul className="space-y-3">
              {moreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-600 group-hover:w-3 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Admission CTA */}
            <div className="mt-6 p-4 bg-gradient-to-br from-navy-900/60 to-primary-900/40 rounded-xl border border-navy-700/30">
              <p className="text-xs text-gray-400 mb-2">Seeking Admission?</p>
              <Link
                href="/contact"
                className="text-sm text-gold-400 hover:text-gold-300 font-semibold transition-colors"
              >
                Contact Us →
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-base">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaPhone className="text-primary-400 mt-1 flex-shrink-0" size={13} />
                <a href={`tel:${SCHOOL_PHONE}`} className="text-gray-400 hover:text-gray-200 text-sm transition-colors">
                  +91 {SCHOOL_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaEnvelope className="text-primary-400 mt-1 flex-shrink-0" size={13} />
                <a href={`mailto:${SCHOOL_EMAIL}`} className="text-gray-400 hover:text-gray-200 text-sm transition-colors break-all">
                  {SCHOOL_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" size={13} />
                <span className="text-gray-400 text-sm leading-relaxed">
                  {SCHOOL_ADDRESS}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-green-500 mt-1 flex-shrink-0" size={13} />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <Container>
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-gray-500 text-sm">
              © {year} KIRAN PUBLIC SCHOOL. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs">
              Powered by Next.js + Sanity CMS &nbsp;|&nbsp; CBSE Affiliated
            </p>
          </div>
        </Container>
      </div>
    </footer>
  )
}
