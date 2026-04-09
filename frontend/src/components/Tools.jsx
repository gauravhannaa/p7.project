import { useInView } from 'react-intersection-observer';

const Tools = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const toolsList = [
    { name: 'Kali Linux', icon: '🐧', description: 'Penetration Testing OS' },
    { name: 'Burp Suite', icon: '🔍', description: 'Web Security Testing' },
    { name: 'Nmap', icon: '🌐', description: 'Network Discovery' },
    { name: 'Metasploit', icon: '💣', description: 'Exploit Framework' },
    { name: 'Wireshark', icon: '📡', description: 'Packet Analysis' },
    { name: 'John the Ripper', icon: '🔑', description: 'Password Cracking' },
  ];
  
  return (
    <section id="tools" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-hacker-green mb-8 text-center glow-text">
          &lt; Security Tools /&gt;
        </h2>
        <div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {toolsList.map((tool, idx) => (
            <div 
              key={tool.name}
              className={`bg-card-bg/50 backdrop-blur-sm border border-hacker-green/20 rounded-lg p-6 text-center transition-all duration-500 delay-${idx * 100} hover:border-hacker-green/60 hover:scale-105 ${
                inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <div className="text-4xl mb-3">{tool.icon}</div>
              <h3 className="text-xl font-bold text-hacker-green mb-2">{tool.name}</h3>
              <p className="text-gray-400 text-sm">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tools;