import { useState } from "react";

const sports = [
  { id: "baseball", emoji: "⚾", name: "野球", en: "BASEBALL", color: "#E8C547",
    points: ["スイング軌道", "リリースポイント", "体重移動", "フォロースルー"] },
  { id: "volleyball", emoji: "🏐", name: "バレー", en: "VOLLEYBALL", color: "#FF6B35",
    points: ["腕の振り", "ジャンプ高さ", "体の回転", "着地姿勢"] },
  { id: "basketball", emoji: "🏀", name: "バスケ", en: "BASKETBALL", color: "#E84747",
    points: ["シュートフォーム", "肘の角度", "リリース点", "フォロースルー"] },
  { id: "soccer", emoji: "⚽", name: "サッカー", en: "SOCCER", color: "#1A6FE0",
    points: ["キックフォーム", "軸足位置", "インパクト", "フォロースルー"] },
  { id: "track", emoji: "🏃", name: "陸上", en: "TRACK", color: "#E0E0E0",
    points: ["腕振り", "ストライド", "着地位置", "体幹姿勢"] },
];

const analysisResults = [
  { label: "スイング軌道", score: 88, comment: "ほぼ理想的な弧を描いています", status: "good" },
  { label: "体重移動", score: 72, comment: "もう少し前足への移動を意識して", status: "warn" },
  { label: "リリースポイント", score: 91, comment: "タイミングが安定してきました", status: "good" },
  { label: "フォロースルー", score: 65, comment: "肩の開きが早い傾向があります", status: "warn" },
];

const pastVideos = [
  { date: "MAY 26", score: 88, label: "バッティング" },
  { date: "MAY 20", score: 81, label: "バッティング" },
  { date: "MAY 14", score: 76, label: "バッティング" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .form-root {
    font-family: 'DM Sans', sans-serif;
    background: #0A0A0C;
    min-height: 100vh;
    max-width: 390px;
    margin: 0 auto;
    color: #F0EDE8;
    overflow-x: hidden;
    padding-bottom: 100px;
  }

  /* Header */
  .header {
    padding: 52px 28px 20px;
    position: relative; z-index: 1;
  }

  .header-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .date-line {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2.5px;
    color: rgba(255,255,255,0.25);
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .page-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 48px;
    line-height: 0.9;
    color: white;
    letter-spacing: 2px;
  }

  .page-title .gold {
    background: linear-gradient(135deg, #C8A84B, #F0D060, #C8A84B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .sport-badge {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 12px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
    cursor: pointer;
  }

  .sport-badge-emoji { font-size: 18px; }
  .sport-badge-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 1px;
    color: var(--sport-color);
    text-transform: uppercase;
  }
  .sport-badge-arrow { font-size: 10px; color: rgba(255,255,255,0.3); }

  /* Gold divider */
  .divider {
    height: 1px;
    background: linear-gradient(90deg, var(--sport-color) 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
    margin: 0 28px 24px;
    opacity: 0.5;
  }

  /* Section */
  .section { padding: 0 28px 24px; }

  .sec-label {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 3px;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
    margin-bottom: 12px;
  }

  /* Viewfinder / Camera UI */
  .viewfinder {
    position: relative;
    width: 100%;
    aspect-ratio: 9/14;
    background: #0E0E10;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.06);
  }

  /* Skeleton figure */
  .skeleton-wrap {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .skeleton-svg {
    width: 55%;
    opacity: 0.18;
    filter: drop-shadow(0 0 12px var(--sport-color));
  }

  /* Corner brackets */
  .corner {
    position: absolute;
    width: 24px; height: 24px;
    border-color: var(--sport-color);
    border-style: solid;
    opacity: 0.7;
  }
  .corner.tl { top: 16px; left: 16px; border-width: 2px 0 0 2px; }
  .corner.tr { top: 16px; right: 16px; border-width: 2px 2px 0 0; }
  .corner.bl { bottom: 16px; left: 16px; border-width: 0 0 2px 2px; }
  .corner.br { bottom: 16px; right: 16px; border-width: 0 2px 2px 0; }

  /* Scan line */
  .scan-line {
    position: absolute;
    left: 16px; right: 16px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--sport-color), transparent);
    opacity: 0.6;
    animation: scan 3s ease-in-out infinite;
  }

  @keyframes scan {
    0% { top: 20%; }
    50% { top: 80%; }
    100% { top: 20%; }
  }

  /* Analysis points overlay */
  .analysis-dot {
    position: absolute;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--sport-color);
    box-shadow: 0 0 8px var(--sport-color);
    transform: translate(-50%, -50%);
    animation: dot-pulse 2s infinite;
  }

  @keyframes dot-pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1.5); opacity: 0.6; }
  }

  .analysis-line {
    position: absolute;
    background: var(--sport-color);
    opacity: 0.4;
    transform-origin: left center;
  }

  /* Viewfinder HUD */
  .vf-top-hud {
    position: absolute;
    top: 16px; left: 50%; transform: translateX(-50%);
    display: flex; gap: 12px; align-items: center;
    z-index: 2;
  }

  .hud-badge {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 1.5px;
    color: var(--sport-color);
    background: rgba(0,0,0,0.6);
    padding: 4px 8px;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.08);
    text-transform: uppercase;
  }

  .rec-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #E84747;
    animation: blink 1s infinite;
    display: inline-block;
    margin-right: 4px;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.2; }
  }

  .vf-bottom-hud {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.85));
    padding: 24px 16px 16px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    z-index: 2;
  }

  .vf-score-big {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    line-height: 1;
    background: linear-gradient(135deg, #C8A84B, #F0D060);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .vf-score-label {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 1.5px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .vf-sport-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px;
    font-weight: 900;
    font-style: italic;
    color: white;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  /* Capture button */
  .capture-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 20px;
  }

  .capture-btn {
    width: 72px; height: 72px;
    border-radius: 50%;
    border: 3px solid var(--sport-color);
    background: transparent;
    cursor: pointer;
    position: relative;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    box-shadow: 0 0 20px rgba(200,168,75,0.2);
  }

  .capture-btn-inner {
    width: 52px; height: 52px;
    border-radius: 50%;
    background: var(--sport-color);
    transition: all 0.2s;
  }

  .capture-btn:active .capture-btn-inner { transform: scale(0.9); }

  .capture-side-btn {
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .capture-side-btn:hover { border-color: var(--sport-color); }

  /* Analysis results */
  .result-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .result-item {
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    position: relative;
    overflow: hidden;
  }

  .result-item::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--item-color, #E8C547);
  }

  .result-score-ring {
    width: 46px; height: 46px;
    border-radius: 50%;
    border: 2px solid var(--item-color, #E8C547);
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    background: rgba(255,255,255,0.02);
  }

  .result-score-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    color: var(--item-color, #E8C547);
    line-height: 1;
  }

  .result-info { flex: 1; min-width: 0; }

  .result-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: white;
    text-transform: uppercase;
    margin-bottom: 3px;
  }

  .result-comment {
    font-size: 11px;
    color: rgba(255,255,255,0.35);
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .result-bar-wrap {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: rgba(255,255,255,0.04);
  }

  .result-bar-fill {
    height: 100%;
    background: var(--item-color, #E8C547);
    opacity: 0.4;
    transition: width 0.6s cubic-bezier(.4,0,.2,1);
  }

  /* AI summary */
  .ai-summary {
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-left: 3px solid var(--sport-color);
    border-radius: 4px;
    padding: 18px;
    position: relative;
    overflow: hidden;
  }

  .ai-summary::after {
    content: '◈';
    position: absolute;
    right: 16px; bottom: 10px;
    font-size: 60px;
    color: rgba(255,255,255,0.02);
    line-height: 1;
  }

  .ai-tag {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 2px;
    color: var(--sport-color);
    text-transform: uppercase;
    display: flex; align-items: center; gap: 6px;
    margin-bottom: 10px;
  }

  .ai-live-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--sport-color);
    animation: blink 2s infinite;
  }

  .ai-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 17px;
    font-weight: 600;
    font-style: italic;
    color: rgba(255,255,255,0.8);
    line-height: 1.5;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  /* Past videos */
  .past-row {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .past-row::-webkit-scrollbar { display: none; }

  .past-card {
    flex-shrink: 0;
    width: 100px;
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s;
  }

  .past-card:hover { border-color: var(--sport-color); }

  .past-thumb {
    width: 100%; height: 70px;
    background: linear-gradient(135deg, #1A1A1C, #111014);
    display: flex; align-items: center; justify-content: center;
    font-size: 28px;
    position: relative;
  }

  .past-thumb-score {
    position: absolute;
    bottom: 4px; right: 6px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    color: var(--sport-color);
  }

  .past-card-info {
    padding: 8px;
  }

  .past-card-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: rgba(255,255,255,0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .past-card-date {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 1px;
    margin-top: 2px;
  }

  /* Bottom nav */
  .bottom-nav {
    position: fixed;
    bottom: 0; left: 50%; transform: translateX(-50%);
    width: 100%; max-width: 390px;
    background: rgba(10,10,12,0.96);
    backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255,255,255,0.06);
    padding: 12px 0 28px;
    display: flex; justify-content: space-around;
    z-index: 10;
  }

  .nav-btn {
    background: none; border: none; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    padding: 4px 14px;
  }

  .nav-label {
    font-family: 'Space Mono', monospace;
    font-size: 7px;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .nav-pip {
    width: 4px; height: 2px; border-radius: 1px;
  }

  /* Tab switcher */
  .tab-row {
    display: flex;
    gap: 2px;
    margin: 0 28px 20px;
    background: #111014;
    border-radius: 4px;
    padding: 3px;
    border: 1px solid rgba(255,255,255,0.06);
  }

  .tab-btn {
    flex: 1;
    padding: 9px;
    border: none;
    border-radius: 2px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    background: transparent;
    color: rgba(255,255,255,0.25);
  }

  .tab-btn.active {
    background: var(--sport-color);
    color: #0A0A0C;
  }
`;

export default function AthleteLogForm() {
  const [selectedSport, setSelectedSport] = useState("baseball");
  const [activeTab, setActiveTab] = useState("capture");
  const [navTab, setNavTab] = useState("form");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);
  const [sportPickerOpen, setSportPickerOpen] = useState(false);

  const sport = sports.find(s => s.id === selectedSport);

  const handleCapture = () => {
    setAnalyzing(true);
    setAnalyzed(false);
    setTimeout(() => { setAnalyzing(false); setAnalyzed(true); setActiveTab("analysis"); }, 1800);
  };

  const overallScore = Math.round(analysisResults.reduce((a, b) => a + b.score, 0) / analysisResults.length);

  return (
    <>
      <style>{css}</style>
      <div className="form-root" style={{ "--sport-color": sport.color }}>

        {/* Header */}
        <div className="header">
          <div className="header-row">
            <div>
              <p className="date-line">2026 / 05 / 27 — WED</p>
              <h1 className="page-title">
                FORM<br /><span className="gold">解析</span>
              </h1>
            </div>
            <div className="sport-badge" onClick={() => setSportPickerOpen(v => !v)}>
              <span className="sport-badge-emoji">{sport.emoji}</span>
              <span className="sport-badge-name">{sport.name}</span>
              <span className="sport-badge-arrow">▾</span>
            </div>
          </div>

          {/* Sport picker dropdown */}
          {sportPickerOpen && (
            <div style={{
              position: "absolute", right: 28, top: 120, zIndex: 20,
              background: "#1A1A1C", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 6, overflow: "hidden", minWidth: 140,
            }}>
              {sports.map(s => (
                <button key={s.id} onClick={() => { setSelectedSport(s.id); setSportPickerOpen(false); }} style={{
                  width: "100%", padding: "12px 16px",
                  background: selectedSport === s.id ? "rgba(255,255,255,0.06)" : "transparent",
                  border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 14, fontWeight: 700, letterSpacing: 1,
                  color: selectedSport === s.id ? s.color : "rgba(255,255,255,0.5)",
                  textTransform: "uppercase",
                }}>
                  <span>{s.emoji}</span>{s.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="divider" />

        {/* Tab switcher */}
        <div className="tab-row">
          {[
            { id: "capture", label: "撮影・解析" },
            { id: "analysis", label: "結果" },
            { id: "history", label: "履歴" },
          ].map(t => (
            <button
              key={t.id}
              className={`tab-btn ${activeTab === t.id ? "active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >{t.label}</button>
          ))}
        </div>

        {/* ── TAB: CAPTURE ── */}
        {activeTab === "capture" && (
          <>
            <div className="section">
              <p className="sec-label">01 — カメラ</p>
              <div className="viewfinder">
                {/* Corner brackets */}
                <div className="corner tl" /><div className="corner tr" />
                <div className="corner bl" /><div className="corner br" />

                {/* Scan line */}
                <div className="scan-line" />

                {/* Skeleton */}
                <div className="skeleton-wrap">
                  <svg className="skeleton-svg" viewBox="0 0 100 220" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50" cy="18" r="10" stroke={sport.color} strokeWidth="1.5"/>
                    <line x1="50" y1="28" x2="50" y2="100" stroke={sport.color} strokeWidth="1.5"/>
                    <line x1="50" y1="45" x2="20" y2="80" stroke={sport.color} strokeWidth="1.5"/>
                    <line x1="50" y1="45" x2="80" y2="80" stroke={sport.color} strokeWidth="1.5"/>
                    <line x1="20" y1="80" x2="15" y2="110" stroke={sport.color} strokeWidth="1.5"/>
                    <line x1="80" y1="80" x2="85" y2="110" stroke={sport.color} strokeWidth="1.5"/>
                    <line x1="50" y1="100" x2="35" y2="160" stroke={sport.color} strokeWidth="1.5"/>
                    <line x1="50" y1="100" x2="65" y2="160" stroke={sport.color} strokeWidth="1.5"/>
                    <line x1="35" y1="160" x2="28" y2="210" stroke={sport.color} strokeWidth="1.5"/>
                    <line x1="65" y1="160" x2="72" y2="210" stroke={sport.color} strokeWidth="1.5"/>
                    {/* Joint dots */}
                    {[[50,28],[50,45],[20,80],[80,80],[15,110],[85,110],[50,100],[35,160],[65,160],[28,210],[72,210]].map(([cx,cy],i) => (
                      <circle key={i} cx={cx} cy={cy} r="2.5" fill={sport.color} opacity="0.8"/>
                    ))}
                  </svg>
                </div>

                {/* Analysis overlay dots */}
                <div className="analysis-dot" style={{ left: "50%", top: "10%" }} />
                <div className="analysis-dot" style={{ left: "30%", top: "32%", animationDelay: "0.5s" }} />
                <div className="analysis-dot" style={{ left: "70%", top: "32%", animationDelay: "1s" }} />
                <div className="analysis-dot" style={{ left: "50%", top: "55%", animationDelay: "1.5s" }} />

                {/* HUD top */}
                <div className="vf-top-hud">
                  <span className="hud-badge">
                    <span className="rec-dot" />REC
                  </span>
                  <span className="hud-badge">AI READY</span>
                  <span className="hud-badge">30fps</span>
                </div>

                {/* HUD bottom */}
                <div className="vf-bottom-hud">
                  <div>
                    <p className="vf-score-label">Last Score</p>
                    <p className="vf-score-big">{overallScore}</p>
                  </div>
                  <p className="vf-sport-label">{sport.name}<br />フォーム解析</p>
                </div>
              </div>

              {/* Analysis points */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                {sport.points.map((pt, i) => (
                  <span key={i} style={{
                    padding: "5px 12px",
                    background: "#111014",
                    border: `1px solid ${sport.color}44`,
                    borderRadius: 2,
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 9,
                    letterSpacing: 1,
                    color: sport.color,
                    textTransform: "uppercase",
                  }}>◈ {pt}</span>
                ))}
              </div>
            </div>

            {/* Capture controls */}
            <div className="capture-row">
              <div className="capture-side-btn">🔄</div>
              <button className="capture-btn" onClick={handleCapture}>
                {analyzing
                  ? <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: sport.color, letterSpacing: 1 }}>解析中…</span>
                  : <div className="capture-btn-inner" />
                }
              </button>
              <div className="capture-side-btn">⚡</div>
            </div>
            <p style={{
              textAlign: "center", marginTop: 10,
              fontFamily: "'Space Mono', monospace",
              fontSize: 9, letterSpacing: 2,
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
            }}>ボタンを押して撮影・解析開始</p>
          </>
        )}

        {/* ── TAB: ANALYSIS ── */}
        {activeTab === "analysis" && (
          <>
            {/* Overall score hero */}
            <div style={{
              margin: "0 28px 24px",
              background: "#111014",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 4,
              padding: "24px",
              display: "flex",
              alignItems: "center",
              gap: 20,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", right: -20, top: -20,
                width: 120, height: 120,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${sport.color}18 0%, transparent 70%)`,
              }} />
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                border: `3px solid ${sport.color}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
                background: `${sport.color}0A`,
                boxShadow: `0 0 24px ${sport.color}30`,
              }}>
                <span style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 36, lineHeight: 1,
                  background: `linear-gradient(135deg, #C8A84B, #F0D060)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>{overallScore}</span>
              </div>
              <div>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 8, letterSpacing: 2,
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase", marginBottom: 6,
                }}>Overall Score</p>
                <p style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 22, fontWeight: 900, fontStyle: "italic",
                  color: "white", textTransform: "uppercase", letterSpacing: 1,
                }}>良好なフォーム</p>
                <p style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: 9, color: "rgba(255,255,255,0.25)",
                  letterSpacing: 1, marginTop: 4,
                }}>MAY 27 · {sport.name} · バッティング</p>
              </div>
            </div>

            {/* Results */}
            <div className="section">
              <p className="sec-label">解析結果</p>
              <div className="result-list">
                {analysisResults.map((r, i) => (
                  <div
                    key={i}
                    className="result-item"
                    style={{ "--item-color": r.status === "good" ? sport.color : "#E84747" }}
                  >
                    <div className="result-score-ring">
                      <span className="result-score-num">{r.score}</span>
                    </div>
                    <div className="result-info">
                      <p className="result-label">{r.label}</p>
                      <p className="result-comment">{r.comment}</p>
                    </div>
                    <div className="result-bar-wrap">
                      <div className="result-bar-fill" style={{ width: `${r.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Summary */}
            <div className="section">
              <p className="sec-label">AIコーチ総評</p>
              <div className="ai-summary">
                <div className="ai-tag">
                  <div className="ai-live-dot" />
                  AI Analysis Complete
                </div>
                <p className="ai-text">
                  スイング軌道・リリースポイントは高水準。<br />
                  体重移動とフォロースルーに改善余地あり。<br />
                  前足への体重移動を意識した反復練習を推奨。
                </p>
              </div>
            </div>
          </>
        )}

        {/* ── TAB: HISTORY ── */}
        {activeTab === "history" && (
          <div className="section">
            <p className="sec-label">過去の解析</p>
            <div className="past-row">
              {pastVideos.map((v, i) => (
                <div key={i} className="past-card">
                  <div className="past-thumb">
                    <span>{sport.emoji}</span>
                    <span className="past-thumb-score">{v.score}</span>
                  </div>
                  <div className="past-card-info">
                    <p className="past-card-label">{v.label}</p>
                    <p className="past-card-date">{v.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Score trend */}
            <div style={{ marginTop: 20, background: "#111014", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 4, padding: 20 }}>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700, fontStyle: "italic", color: "white", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16 }}>
                Score Trend
              </p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 60 }}>
                {pastVideos.map((v, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: sport.color }}>{v.score}</span>
                    <div style={{
                      width: "100%",
                      height: `${(v.score / 100) * 44}px`,
                      background: i === 0 ? sport.color : `${sport.color}44`,
                      borderRadius: "2px 2px 0 0",
                    }} />
                    <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)" }}>{v.date.slice(-2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom nav */}
        <div className="bottom-nav">
          {[
            { icon: "⌂", label: "Home", id: "home" },
            { icon: "✦", label: "Diary", id: "diary" },
            { icon: "◉", label: "Form", id: "form" },
            { icon: "↗", label: "Growth", id: "growth" },
            { icon: "◎", label: "Config", id: "settings" },
          ].map(tab => (
            <button key={tab.id} className="nav-btn" onClick={() => setNavTab(tab.id)}>
              <span style={{ fontSize: 18, color: navTab === tab.id ? sport.color : "rgba(255,255,255,0.2)" }}>
                {tab.icon}
              </span>
              <span className="nav-label" style={{ color: navTab === tab.id ? sport.color : "rgba(255,255,255,0.2)" }}>
                {tab.label}
              </span>
              {navTab === tab.id && <div className="nav-pip" style={{ background: sport.color }} />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
