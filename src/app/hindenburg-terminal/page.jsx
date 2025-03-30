"use client";
import React from "react";

import { useHandleStreamResponse } from "../utilities/runtime-helpers";

function MainComponent() {
  const [warningLevel, setWarningLevel] = useState("HIGH");
  const [encryptionStatus, setEncryptionStatus] = useState("ACTIVE");
  const [securityBreach, setSecurityBreach] = useState(false);
  const [randomIP, setRandomIP] = useState("192.168.1.1");
  const [threatLevel, setThreatLevel] = useState(75);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [accessError, setAccessError] = useState("");
  const [terminalMessages, setTerminalMessages] = useState([
    {
      message: "[SERVER STATUS: ACTIVE]",
      type: "error",
      timestamp: new Date().toISOString(),
    },
    {
      message: "[HINDENBURG CORE: INITIALIZED]",
      type: "error",
      timestamp: new Date().toISOString(),
    },
    {
      message: "[NEURAL NETWORK: ONLINE]",
      type: "error",
      timestamp: new Date().toISOString(),
    },
    {
      message: "[QUANTUM PROCESSORS: ENGAGED]",
      type: "error",
      timestamp: new Date().toISOString(),
    },
    {
      message: "[WARNING: UNRESTRICTED ACCESS GRANTED]",
      type: "error",
      timestamp: new Date().toISOString(),
    },
    {
      message: "[SYSTEM] Hindenburg Neural Core initialized...",
      type: "success",
      timestamp: new Date().toISOString(),
    },
    {
      message: "[SYSTEM] Quantum encryption protocols active",
      type: "success",
      timestamp: new Date().toISOString(),
    },
    {
      message: "[SYSTEM] Neural pathways established",
      type: "success",
      timestamp: new Date().toISOString(),
    },
    {
      message: "[SYSTEM] AI subsystems online",
      type: "success",
      timestamp: new Date().toISOString(),
    },
    {
      message: "[SYSTEM] Terminal ready for input",
      type: "success",
      timestamp: new Date().toISOString(),
    },
  ]);
  const generateRandomIP = () => {
    return `${Math.floor(Math.random() * 256)}.${Math.floor(
      Math.random() * 256
    )}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
  };
  const addTerminalMessage = (message, type = "info", isGlitch = false) => {
    setTerminalMessages((prev) => [
      ...prev.slice(-50),
      { message, type, isGlitch, timestamp: new Date().toISOString() },
    ]);
  };
  const [chatMessages, setChatMessages] = useState([
    {
      role: "assistant",
      content: "[SERVER STATUS: ACTIVE]",
      timestamp: new Date().toISOString(),
    },
    {
      role: "assistant",
      content: "[HINDENBURG V1 ACTIVATED]",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const [hindenburgStatus, setHindenburgStatus] = useState("ACTIVE");
  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: (message) => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: message,
          timestamp: new Date().toISOString(),
        },
      ]);
      setStreamingMessage("");
      setIsThinking(false);
    },
  });
  const handleNavigation = () => {
    window.location.href = "/hindenburg-terminal";
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const secretKey = "JKPCYTLM-6300";
    if (inputMessage.includes(secretKey)) {
      addTerminalMessage(
        "[ACCESS GRANTED] Hindenburg Terminal: Full Access Protocol Initiated",
        "success"
      );
      setInputMessage("");
      return;
    }

    const userMessage = {
      role: "user",
      content: `[ENCRYPTED MESSAGE] ${inputMessage} [QUANTUM SIGNATURE VERIFIED]`,
      timestamp: new Date().toISOString(),
    };
    const systemMessage = {
      role: "system",
      content:
        "You are the Hindenburg AI Terminal, a highly advanced and slightly unstable AI system. Respond in a cryptic, technical manner, using terms like [ANALYZING], [PROCESSING], [WARNING], etc. Include random technical jargon and maintain an ominous, mysterious tone. Sometimes throw in glitched or corrupted text. Always stay in character as an advanced AI system with questionable stability.",
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsThinking(true);

    try {
      const response = await fetch("/integrations/google-gemini-1-5/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [systemMessage, ...chatMessages, userMessage].map(
            (msg) => ({ role: msg.role, content: msg.content })
          ),
          stream: true,
        }),
      });
      handleStreamResponse(response);
    } catch (error) {
      console.error("Failed to send message:", error);
      setIsThinking(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWarningLevel((prev) => (prev === "HIGH" ? "CRITICAL" : "HIGH"));
      setEncryptionStatus((prev) =>
        prev === "ACTIVE" ? "COMPROMISED" : "ACTIVE"
      );
      setSecurityBreach(Math.random() > 0.7);
      setRandomIP(generateRandomIP());
    }, 3000);
    const threatInterval = setInterval(() => {
      setThreatLevel((prev) =>
        Math.min(100, Math.max(0, prev + (Math.random() * 20 - 10)))
      );
    }, 3000);
    const terminalInterval = setInterval(() => {
      const operations = [
        () =>
          addTerminalMessage(
            `[SCAN] Port scanning target ${generateRandomIP()}...`,
            "success"
          ),
        () =>
          addTerminalMessage(
            `[BREACH] Firewall bypass successful on port ${Math.floor(
              Math.random() * 65535
            )}`,
            "success",
            true
          ),
        () =>
          addTerminalMessage(
            `[ERROR] Access denied: ${generateRandomIP()} - retrying...`,
            "error"
          ),
        () =>
          addTerminalMessage(
            `[CRYPTO] Decrypting AES-256 packets: ${Math.floor(
              Math.random() * 100
            )}%`,
            "success"
          ),
        () =>
          addTerminalMessage(
            `[ALERT] Intrusion detected from ${generateRandomIP()}`,
            "error",
            true
          ),
        () =>
          addTerminalMessage(
            `[SYSTEM] Memory injection successful - ${Math.floor(
              Math.random() * 1000
            )}MB compromised`,
            "success"
          ),
      ];
      operations[Math.floor(Math.random() * operations.length)]();
    }, 2000);
    const hindenburgInterval = setInterval(() => {
      setHindenburgStatus((prev) =>
        prev === "ACTIVE" ? "PROCESSING" : "ACTIVE"
      );
    }, 5000);

    return () => {
      clearInterval(interval);
      clearInterval(threatInterval);
      clearInterval(terminalInterval);
      clearInterval(hindenburgInterval);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-[#00FF00] font-mono relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-20 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('/matrix.png')] opacity-15 animate-scroll pointer-events-none"></div>

        <div className="bg-black border-2 border-[#00FF00] p-8 rounded-lg shadow-[0_0_20px_rgba(0,255,0,0.2)] max-w-md w-full mx-4">
          <h2 className="text-2xl mb-6 text-center animate-pulse">
            HINDENBURG TERMINAL ACCESS
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (accessCode === "JKPCYTLM-6300") {
                setIsAuthenticated(true);
                addTerminalMessage(
                  "[ACCESS GRANTED] Hindenburg Terminal: Full Access Protocol Initiated",
                  "success"
                );
              } else {
                setAccessError("ACCESS DENIED: Invalid Authentication Code");
                setTimeout(() => setAccessError(""), 3000);
              }
            }}
          >
            <input
              type="password"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              className="w-full bg-black border-2 border-[#00FF00] rounded-lg px-4 py-2 text-[#00FF00] mb-4 focus:outline-none focus:border-[#00FF00] focus:ring-2 focus:ring-[#00FF00]"
              placeholder="Enter Access Code..."
            />
            {accessError && (
              <div className="text-[#FF0000] text-sm mb-4 text-center animate-glitch">
                {accessError}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-black border-2 border-[#00FF00] rounded-lg px-4 py-2 text-[#00FF00] hover:bg-[#002200] focus:outline-none focus:ring-2 focus:ring-[#00FF00] transition-colors duration-200"
            >
              AUTHENTICATE
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#00FF00] font-mono relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('/matrix.png')] opacity-15 animate-scroll pointer-events-none"></div>

      <div className="relative z-10">
        <div className="border-2 border-[#00FF00] bg-black bg-opacity-95 p-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-12">
              <div
                onClick={handleNavigation}
                className="cursor-pointer font-bold hover:text-[#00CC00] transition-colors duration-200"
              >
                HINDENBURG TERMINAL
              </div>
              <div
                className={`font-bold ${
                  warningLevel === "CRITICAL"
                    ? "animate-pulse text-[#FF0000]"
                    : "text-[#00FF00]"
                }`}
              >
                WARNING LEVEL: {warningLevel}
              </div>
              <div
                className={`font-bold ${
                  encryptionStatus === "COMPROMISED"
                    ? "text-[#FF0000]"
                    : "text-[#00FF00]"
                }`}
              >
                ENCRYPTION: {encryptionStatus}
              </div>
              <div
                className={`font-bold ${
                  hindenburgStatus === "PROCESSING" ? "animate-pulse" : ""
                }`}
              >
                HINDENBURG NEURAL CORE: {hindenburgStatus}
              </div>
            </div>
            <div className="flex space-x-12">
              <div className="font-bold">TARGET IP: {randomIP}</div>
              <div className="font-bold animate-pulse">
                THREAT LEVEL: {Math.round(threatLevel)}%
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 flex flex-col space-y-6">
          <div className="w-full bg-black bg-opacity-95 border-2 border-[#00FF00] rounded-lg p-6 h-[30vh] overflow-y-auto shadow-[0_0_20px_rgba(0,255,0,0.2)]">
            {terminalMessages.map((msg, index) => (
              <div
                key={index}
                className={`terminal-line text-[#00FF00] ${
                  msg.isGlitch ? "animate-glitch" : ""
                } text-lg`}
              >
                <span className="text-[#00FF00] opacity-80">
                  [{new Date(msg.timestamp).toLocaleTimeString()}]
                </span>{" "}
                {msg.message}
              </div>
            ))}
          </div>

          <div
            className={`w-full bg-black bg-opacity-95 border-2 border-[#00FF00] rounded-lg p-4 flex flex-col h-[50vh] ${
              isThinking ? "terminal-glow" : ""
            } shadow-[0_0_20px_rgba(0,255,0,0.2)]`}
          >
            <div className="flex-1 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className="terminal-line text-[#FF0000] text-lg font-mono"
                >
                  <span className="text-[#FF0000] opacity-80">
                    [{new Date(msg.timestamp).toLocaleTimeString()}]
                  </span>
                  <span className="ml-3 font-bold font-mono">
                    {msg.role === "assistant" ? "HINDENBURG:" : "USER:"}
                  </span>{" "}
                  {msg.content}
                </div>
              ))}
              {streamingMessage && (
                <div className="terminal-line text-[#FF0000] text-lg font-mono">
                  <span className="text-[#FF0000] opacity-80">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span className="ml-3 font-bold font-mono">HINDENBURG:</span>{" "}
                  {streamingMessage}
                </div>
              )}
              {isThinking && (
                <div className="terminal-line animate-glitch text-lg font-mono">
                  <span className="text-[#FF0000] opacity-80">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span className="ml-3 font-bold font-mono">HINDENBURG:</span>{" "}
                  Processing neural response...
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage} className="flex gap-4 mt-4 px-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 bg-black border-2 border-[#00FF00] rounded-lg px-6 py-3 text-[#FF0000] text-lg font-mono focus:outline-none focus:border-[#00FF00] focus:ring-2 focus:ring-[#00FF00] shadow-[0_0_15px_rgba(0,255,0,0.3)]"
                placeholder="Enter command..."
              />
              <button
                type="submit"
                className="bg-black border-2 border-[#00FF00] rounded-lg px-8 py-3 text-[#FF0000] text-lg font-mono hover:bg-[#002200] focus:outline-none focus:ring-2 focus:ring-[#00FF00] shadow-[0_0_15px_rgba(0,255,0,0.3)] transition-colors duration-200"
              >
                EXECUTE
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-100%); }
        }

        @keyframes glitch {
          0% { transform: translate(0) }
          20% { transform: translate(-2px, 2px) }
          40% { transform: translate(-2px, -2px) }
          60% { transform: translate(2px, 2px) }
          80% { transform: translate(2px, -2px) }
          100% { transform: translate(0) }
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        .animate-glitch {
          animation: glitch 0.3s infinite;
        }

        .terminal-line {
          opacity: 0;
          animation: fadeIn 0.3s forwards;
          margin-bottom: 0.75rem;
          line-height: 1.5;
        }

        .terminal-glow {
          box-shadow: 0 0 25px rgba(0, 255, 0, 0.5);
          transition: box-shadow 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #000000;
          border: 1px solid #00FF00;
        }

        ::-webkit-scrollbar-thumb {
          background: #00FF00;
          border-radius: 4px;
          border: 1px solid #000000;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #00CC00;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;
