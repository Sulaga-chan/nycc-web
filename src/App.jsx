import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import Team from './pages/Team.jsx'
import Musicians from './pages/Musicians.jsx'
import Gallery from './pages/Gallery.jsx'
import Video from './pages/Video.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  // Casual deterrent: block right-click "Save image as" on images.
  // Note: this does NOT truly protect images — anyone can still grab them via
  // dev tools, the network tab, or a screenshot. It only stops casual saving.
  useEffect(() => {
    const block = (e) => {
      if (e.target.tagName === 'IMG') e.preventDefault()
    }
    document.addEventListener('contextmenu', block)
    return () => document.removeEventListener('contextmenu', block)
  }, [])

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="team" element={<Team />} />
          <Route path="musicians" element={<Musicians />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="video" element={<Video />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}
