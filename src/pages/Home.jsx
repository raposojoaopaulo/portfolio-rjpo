import Header from '../components/Header';
import Hero from '../components/Hero';
import '../styles/pages/_Home.scss';

export default function Home() {
  return (
    <main className="home">
      <Header />
      <Hero />
    </main>
  );
}
