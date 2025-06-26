import Navbar from './components/Navbar';
import Home from './components/Hero';
import About from './components/About';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Contact from './components/Contact';
import Testimonials from './components/Testimonial';
import Portfolio from './components/Portofolio';
function App() {

  return (
    <>
      <Navbar />
      <Home />
      <About />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
