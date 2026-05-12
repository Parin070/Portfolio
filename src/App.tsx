
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Background from './components/Background.tsx';
import Cursor from './components/Cursor.tsx';
import WhoAmI from './components/WhoAmI.tsx';
import Skills from './components/Skills.tsx';
import Projects from './components/Projects.tsx';
import Contact from './components/Contact.tsx';

function App() {
  return (
    <div className="app-container">
      <Background />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <WhoAmI />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
