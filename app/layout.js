import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BackToTop from '../components/BackToTop'
import '../styles/globals.css'

export const metadata = {
  title: 'Embedded Projects Hub - Learn Embedded Systems',
  description: 'Open-source embedded systems learning: microcontrollers, IoT, RTOS — free, practical, and engineer-made.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
