import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Terminal } from "lucide-react";

const CommandTerminal = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "output", content: 'Type "help" to see available commands.' },
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
    inputRef.current?.focus();
  }, [history]);

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    let response = "";
    switch (trimmed) {
      case "help":
        response = "Available commands: ls, whoami, skills, projects, repositories, about, experience, certifications, stats, contact, clear";
        break;
      case "ls":
        response = "projects/  repositories/  about/  experience/  certifications/  stats/  contact/";
        break;
      case "whoami":
        response = "Gaurav Tiwari | DevOps / Cloud / Cybersecurity Engineer | Gurgaon, India";
        break;
      case "skills":
        navigate("/skills"); // we don't have a separate skills page? Actually we show skills on dashboard. But we can navigate to dashboard with hash.
        response = "Opening skills overview... (check main dashboard)";
        break;
      case "projects":
        navigate("/projects");
        response = "Redirecting to Projects page...";
        break;
      case "repositories":
        navigate("/repositories");
        response = "Redirecting to Repositories page...";
        break;
      case "about":
        navigate("/about");
        response = "Redirecting to About page...";
        break;
      case "experience":
        navigate("/experience");
        response = "Redirecting to Experience page...";
        break;
      case "certifications":
        navigate("/certifications");
        response = "Redirecting to Certifications page...";
        break;
      case "stats":
        navigate("/stats");
        response = "Redirecting to GitHub Stats page...";
        break;
      case "contact":
        navigate("/contact");
        response = "Redirecting to Contact page...";
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        response = `Command not found: ${cmd}. Type 'help' for list.`;
    }
    setHistory((prev) => [...prev, { type: "command", content: `$ ${cmd}` }, { type: "output", content: response }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    processCommand(input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="glass-panel p-4 mt-6">
      <div className="flex items-center gap-2 mb-3 border-b border-neon/30 pb-2">
        <Terminal size={18} className="text-neon" />
        <span className="text-sm font-mono">user@portfolio:~$</span>
      </div>
      <div
        ref={outputRef}
        className="h-64 overflow-y-auto font-mono text-sm space-y-1 mb-3 p-2 bg-black/40 rounded"
      >
        {history.map((item, idx) => (
          <div key={idx} className={item.type === "command" ? "text-yellow-300" : "text-gray-300"}>
            {item.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <span className="text-neon">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-neon font-mono"
          autoFocus
        />
      </form>
    </div>
  );
};

export default CommandTerminal;