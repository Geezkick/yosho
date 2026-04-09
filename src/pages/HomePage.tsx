import { Hero, TechSpecs, UnstoppableSection } from '../components/UI'
import { BentoGrid } from '../components/BentoGrid'

const HomePage = () => {
  return (
    <main>
      <Hero />
      <TechSpecs />
      <UnstoppableSection />
      <BentoGrid />

      <section className="home-cta glass" style={{ margin: '100px 40px', padding: '100px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-hero)', fontSize: '48px', marginBottom: '20px' }}>ELITE COLLECTIVE</h2>
        <p style={{ opacity: 0.6, maxWidth: '600px', margin: '0 auto 40px' }}>
          The journey doesn't end at the finish line. Join the global YoSho community 
          and unlock exclusive access to the future of sports.
        </p>
        <button className="btn-shop-now rainbow">JOIN THE INNER CIRCLE</button>
      </section>
    </main>
  )
}

export default HomePage
