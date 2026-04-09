import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-hacker-green mb-8 text-center glow-text">
          &lt; About /&gt;
        </h2>
        <div 
          ref={ref}
          className={`bg-card-bg/50 backdrop-blur-sm border border-hacker-green/20 rounded-lg p-6 md:p-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-gray-300 leading-relaxed mb-4">
            I'm <span className="text-hacker-green font-bold">Gaurav Tiwari</span>, a passionate Cyber Security Engineer dedicated to protecting digital assets and 
            securing infrastructure against modern threats. With expertise in penetration testing, security auditing, and implementing robust security measures.
          </p>
          <p className="text-gray-300 leading-relaxed">
            My mission is to make the digital world safer by identifying vulnerabilities before malicious actors can exploit them. 
            I specialize in offensive security, threat hunting, and building security automation tools.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;