import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Hero from './components/Hero';
import Interiors from './components/Interiors';
import Navbar from './components/Navbar';
import Reviews from './components/Reviews';
import { site } from './data/site';
import { useScrollProgress } from './hooks/useScrollProgress';

export default function App() {
  const progress = useScrollProgress();

  return (
    <>
      <div className="progress" style={{ width: `${progress}%` }} />
      <div className="site-bg" aria-hidden="true">
        <img src={site.siteBackground} alt="" />
        <div className="site-bg__veil" />
      </div>

      <div className="site-content">
        <Navbar />
        <main>
          <Hero />
          <Gallery />
          <Interiors />
          <Reviews />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
