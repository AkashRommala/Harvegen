import Navbar from '../components/Navbar'
import BottomNav from '../components/BottomNav'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import { UserProvider } from '../context/UserContext'
import '../styles/globals.css'

export const metadata = {
  title: 'Embedded Projects Hub - Learn Embedded Systems',
  description: 'Open-source embedded systems learning: microcontrollers, IoT, RTOS — free, practical, and engineer-made.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <UserProvider>
          <Navbar />
          <main className="min-h-screen pb-30">
            {children}
          </main>
          <BottomNav />
          <Footer />
          <BackToTop />
        </UserProvider>
      </body>
    </html>
  )
}
