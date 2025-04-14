import {
  Navbar,
  Hero,
  Highlights,
  Model,
  Features,
  Footer,
} from "./components";
import TheMagic from "./components/TheMagic";

function App() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <TheMagic />
      <Footer />
    </main>
  );
}

export default App;
