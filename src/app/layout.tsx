import './globals.css'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'

const plus_jakarta_sans = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Candidate College Sandbox',
  description: 'Candidate College is an Education Platform that works to facilitate students in Indonesia at home and aboard to achieve a quality education system.',
  authors: [{
    name: 'Web Developer Candidate College',
    url: 'https://sandbox.candidatecollegeind.com'
  }],
  icons: 'https://i.postimg.cc/vZMVCm7g/LOGO-CC.png',
  keywords: [
    'Dashboard, Writer, Blog, Article, Artikel, College','Kampus', 'Fasilitas', 'Students', 'Student', 'Mahasiswa', 'Indonesia', 'Candidate College', 'Education System', 'Education in Indonesia', 'Candidate College', 'Event', 'UTBK', 'Tes TOEFL', 'Internship', 'Magang', 'Platform Edukasi',
  ],
  publisher: "Rumah Web",
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  referrer: 'origin',
  robots: 'index, follow',
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c2330" },
    { media: "(prefers-color-scheme: light)", color: "#1B4E6B" }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={plus_jakarta_sans.className}>{children}</body>
    </html>
  )
}
