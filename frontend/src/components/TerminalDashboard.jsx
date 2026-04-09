import React, { useState, useEffect, useRef } from 'react';
import { fetchSkills, fetchExperiences, fetchProjects, fetchReports } from '../api';

const TerminalDashboard = () => {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', content: 'Welcome to Gaurav Tiwari\'s Security Terminal' },
    { type: 'system', content: 'Type "help" for available commands' },
    { type: 'input', content: '$ ' }
  ]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState({});
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Load data on mount
  useEffect(() => {
    loadSkills();
    loadExperiences();
    loadProjects();
    loadReports();
  }, []);

  const loadSkills = async () => {
    try {
      const { data } = await fetchSkills();
      setSkills(data);
    } catch (error) {
      console.error('Error loading skills:', error);
    }
  };

  const loadExperiences = async () => {
    try {
      const { data } = await fetchExperiences();
      setExperiences(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    }
  };

  const loadProjects = async () => {
    try {
      const { data } = await fetchProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const loadReports = async () => {
    try {
      const { data } = await fetchReports();
      setReports(data);
    } catch (error) {
      console.error('Error loading reports:', error);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input on mount and click
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = async (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const args = trimmed.split(' ');
    const mainCmd = args[0];

    // Add command to history
    setHistory(prev => [...prev, { type: 'command', content: `$ ${cmd}` }]);

    // Process command
    let output = '';

    switch (mainCmd) {
      case 'help':
        output = `
Available commands:
  about       - Show professional summary
  skills      - List technical skills with percentages
  experience  - Show work experience
  projects    - List projects with links
  reports     - Show certificates & reports
  contact     - Display contact information
  clear       - Clear terminal screen
  whoami      - Display user info
  ls          - List available sections
  stats       - Show GitHub-like stats (simulated)
        `;
        break;

      case 'whoami':
        output = `
Username: gauravhanna
Role: Customer & Technical Support Engineer
Expertise: L1/L2 Support, Windows, Networking, Security
Location: Gurgaon, India
Status: Available for remote work
        `;
        break;

      case 'about':
        output = `
Gaurav Tiwari - Customer & Technical Support Engineer
Hands-on experience in L1/L2 desktop support, Windows troubleshooting,
end-user assistance, and onsite IT operations at Maruti Suzuki India Ltd.
Skilled in SLA-based support, hardware/software troubleshooting,
networking (TCP/IP, DNS, DHCP), and security fundamentals.
Certified in Cyber Security by IBM and Advanced Software Engineering by Walmart.
        `;
        break;

      case 'skills':
        if (skills.length === 0) {
          output = 'Loading skills... Please wait.';
        } else {
          output = skills.map(s => `${s.name}: ${s.percentage}%`).join('\n');
        }
        break;

      case 'experience':
        if (experiences.length === 0) {
          output = 'Loading experience... Please wait.';
        } else {
          output = experiences.map(exp => `
[${exp.company}] - ${exp.role}
${exp.startDate} to ${exp.isCurrent ? 'Present' : exp.endDate}
Responsibilities:
${exp.responsibilities.map(r => `  • ${r}`).join('\n')}
`).join('\n---\n');
        }
        break;

      case 'projects':
        if (projects.length === 0) {
          output = 'No projects added yet. Use admin dashboard to add.';
        } else {
          output = projects.map(p => `
📁 ${p.title}
${p.description}
Demo: ${p.demoLink || 'N/A'} | GitHub: ${p.githubLink || 'N/A'}
`).join('\n');
        }
        break;

      case 'reports':
        if (reports.length === 0) {
          output = 'No reports uploaded yet.';
        } else {
          output = reports.map(r => `📄 ${r.title}: ${r.description} - ${r.pdfUrl !== '#' ? 'Download' : 'Link not available'}`).join('\n');
        }
        break;

      case 'contact':
        output = `
Email: gauravhanna2003@gmail.com
Phone: +91 9664609473
GitHub: github.com/gauravhannaa
LinkedIn: linkedin.com/in/gaurav-tiwari
        `;
        break;

      case 'ls':
        output = 'about/  skills/  experience/  projects/  reports/  contact/';
        break;

      case 'stats':
        output = `
GitHub Stats (simulated):
Total Repos: 8
Commits this year: 234
Pull Requests: 12
Skills mastered: ${skills.length}
Projects completed: ${projects.length}
        `;
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        output = `Command not found: ${cmd}. Type 'help' for available commands.`;
    }

    setHistory(prev => [...prev, { type: 'output', content: output }]);
    setHistory(prev => [...prev, { type: 'input', content: '$ ' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!command.trim()) return;
    executeCommand(command);
    setCommand('');
  };

  return (
    <div className="min-h-screen bg-black text-hacker-green font-mono p-4" onClick={handleClick}>
      <div className="max-w-5xl mx-auto">
        <div className="border border-hacker-green/30 rounded-lg p-4 bg-black/90">
          <div className="flex items-center gap-2 border-b border-hacker-green/30 pb-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm ml-2">gaurav@cyber-terminal:~</span>
          </div>

          <div className="terminal-output mb-4" style={{ minHeight: '60vh', maxHeight: '70vh', overflowY: 'auto' }}>
            {history.map((item, idx) => (
              <div key={idx} className="mb-1">
                {item.type === 'input' && <span className="text-hacker-green">{item.content}</span>}
                {item.type === 'command' && <span className="text-yellow-400">{item.content}</span>}
                {item.type === 'output' && (
                  <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm mt-1 ml-4">
                    {item.content}
                  </pre>
                )}
                {item.type === 'system' && (
                  <div className="text-blue-400 italic">🔹 {item.content}</div>
                )}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-hacker-green">$</span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-hacker-green font-mono"
              autoFocus
            />
          </form>

          <div className="text-xs text-gray-500 mt-4 border-t border-hacker-green/20 pt-2">
            Type 'help' to begin | <span className="text-hacker-green">gauravhanna@cyber-portfolio</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalDashboard;