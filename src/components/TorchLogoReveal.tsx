import { useState } from "react";

export default function TorchLogoReveal() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="relative w-full flex-1 min-h-[350px] lg:min-h-[400px] flex flex-col items-center justify-center space-y-8 select-none mt-4">
      {/* Custom Mechanical Toggle Switch */}
      <div className="toggle-container">
        <input
          className="toggle-input"
          type="checkbox"
          checked={isOn}
          onChange={(e) => setIsOn(e.target.checked)}
        />
        <div className="toggle-handle-wrapper">
          <div className="toggle-handle">
            <div className="toggle-handle-knob"></div>
            <div className="toggle-handle-bar-wrapper">
              <div className="toggle-handle-bar"></div>
            </div>
          </div>
        </div>
        <div className="toggle-base">
          <div className="toggle-base-inside"></div>
        </div>
      </div>

      {/* Logo container */}
      <div className="relative w-full max-w-sm h-[420px] flex items-center justify-center">
        {/* Glowing Logo */}
        <div
          className="absolute inset-0 bg-white transition-all duration-500 ease-out"
          style={{
            maskImage: "url(/images/logo.png)",
            WebkitMaskImage: "url(/images/logo.png)",
            maskSize: "contain",
            WebkitMaskSize: "contain",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            opacity: isOn ? 0.95 : 0,
            transform: isOn ? "scale(1.05) rotate(0deg)" : "scale(0.9) rotate(-5deg)",
            filter: isOn ? "drop-shadow(0 0 25px rgba(255,255,255,0.15))" : "none",
          }}
        />

        {/* Offline Placeholder */}
        <div
          className={`absolute inset-0 border border-dashed border-white/5 rounded-3xl flex items-center justify-center transition-opacity duration-500 ${
            isOn ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <span className="text-[10px] eyebrow text-white/10 uppercase tracking-widest">
            Offline
          </span>
        </div>
      </div>
    </div>
  );
}
