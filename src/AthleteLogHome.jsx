import { useState } from "react";

const sports = [
  { id: "baseball", emoji: "⚾", name: "野球", en: "BASEBALL", color: "#E8C547", bg: "#1A1600" },
  { id: "volleyball", emoji: "🏐", name: "バレー", en: "VOLLEYBALL", color: "#FF6B35", bg: "#1A0A00" },
  { id: "basketball", emoji: "🏀", name: "バスケ", en: "BASKETBALL", color: "#E84747", bg: "#1A0000" },
  { id: "soccer", emoji: "⚽", name: "サッカー", en: "SOCCER", color: "#1A6FE0", bg: "#00081A" },
  { id: "track", emoji: "🏃", name: "陸上", en: "TRACK", color: "#E0E0E0", bg: "#0A0A0A" },
];

const weekData = [
  { day: "M", score: 72 },
  { day: "T", score: 85 },
  { day: "W", score: 60 },
  { day: "T", score: 92 },
  { day: "F", score: 78 },
  { day: "S", score: 95 },
  { day: "S", score: null },
];

const allSportLogs = {
  baseball: [
    { date: "MAY 26", title: "バッティング練習", mood: "🔥", score: 95 },
    { date: "MAY 25", title: "守備・走塁", mood: "😊", score: 78 },
    { date: "MAY 24", title: "投球フォーム", mood: "😐", score: 60 },
  ],
  volleyball: [
    { date: "MAY 26", title: "スパイク練習", mood: "🔥", score: 91 },
    { date: "MAY 25", title: "レシーブ練習", mood: "😊", score: 80 },
    { date: "MAY 24", title: "サーブ練習", mood: "😐", score: 65 },
  ],
  basketball: [
    { date: "MAY 26", title: "3Pシュート練習", mood: "🔥", score: 88 },
    { date: "MAY 25", title: "ドリブル練習", mood: "😊", score: 75 },
    { date: "MAY 24", title: "ディフェンス", mood: "😐", score: 70 },
  ],
  soccer: [
    { date: "MAY 26", title: "シュート練習", mood: "🔥", score: 93 },
    { date: "MAY 25", title: "パス回し", mood: "😊", score: 82 },
    { date: "MAY 24", title: "フリーキック", mood: "😐", score: 68 },
  ],
  track: [
    { date: "MAY 26", title: "インターバル走", mood: "🔥", score: 90 },
    { date: "MAY 25", title: "スタートダッシュ", mood: "😊", score: 77 },
    { date: "MAY 24", title: "フォーム走", mood: "😐", score: 63 },
  ],
};


const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .home-root {
    font-family: 'DM Sans', sans-serif;
    background: #0A0A0C;
    min-height: 100vh;
    max-width: 390px;
    margin: 0 auto;
    color: #F0EDE8;
    overflow-x: hidden;
    padding-bottom: 90px;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    height: 340px;
    overflow: hidden;
    background: #0A0A0C;
  }

  /* Giant background word */
  .hero-bg-word {
    position: absolute;
    bottom: -20px; left: -8px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 160px;
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.06);
    letter-spacing: -4px;
    pointer-events: none;
    transition: color 0.4s;
    white-space: nowrap;
    z-index: 0;
  }

  /* Diagonal color band */
  .hero-band {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(
      165deg,
      var(--sport-color) 0%,
      transparent 45%
    );
    opacity: 0.12;
    transition: background 0.4s;
    z-index: 0;
  }

  /* Horizontal repeat text band */
  .ticker-band {
    position: absolute;
    bottom: 48px; left: 0; right: 0;
    background: var(--sport-color);
    padding: 6px 0;
    transform: rotate(-3deg) scaleX(1.1);
    z-index: 2;
    overflow: hidden;
    white-space: nowrap;
  }

  .ticker-inner {
    display: inline-flex;
    gap: 0;
    animation: ticker 12s linear infinite;
  }

  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .ticker-word {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 900;
    color: #0A0A0C;
    letter-spacing: 3px;
    padding: 0 20px;
    text-transform: uppercase;
  }

  .ticker-dot {
    font-size: 8px;
    color: #0A0A0C;
    opacity: 0.5;
    align-self: center;
  }

  /* Hero content */
  .hero-content {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    z-index: 3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 52px 28px 80px;
  }

  .hero-top-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .date-badge {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.4);
    text-transform: uppercase;
  }

  .day-counter {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 2px;
    color: var(--sport-color);
    text-transform: uppercase;
    text-align: right;
  }

  .hero-headline {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-style: italic;
    font-size: 56px;
    line-height: 0.9;
    color: white;
    letter-spacing: -1px;
    text-transform: uppercase;
  }

  .hero-headline .accent {
    color: var(--sport-color);
    -webkit-text-stroke: 0px;
    display: block;
  }

  .hero-headline .outline {
    color: transparent;
    -webkit-text-stroke: 1.5px white;
    display: block;
    opacity: 0.7;
  }

  /* Sport pill row */
  .sport-row {
    display: flex;
    gap: 8px;
    padding: 0 28px;
    margin-top: -1px;
    position: relative; z-index: 4;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .sport-row::-webkit-scrollbar { display: none; }

  .sport-pill {
    display: flex; align-items: center; gap: 6px;
    padding: 8px 14px;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.05);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px; font-weight: 700;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.4);
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    flex-shrink: 0;
    text-transform: uppercase;
  }

  .sport-pill.active {
    background: var(--sport-color);
    border-color: var(--sport-color);
    color: #0A0A0C;
  }

  /* Stats grid */
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    margin: 20px 28px 0;
    background: rgba(255,255,255,0.06);
    border-radius: 4px;
    overflow: hidden;
  }

  .stat-cell {
    background: #111014;
    padding: 16px 14px;
    position: relative;
  }

  .stat-cell::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--sport-color);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .stat-cell.hi::after { opacity: 1; }

  .stat-key {
    font-family: 'Space Mono', monospace;
    font-size: 7px;
    letter-spacing: 1.5px;
    color: rgba(255,255,255,0.25);
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .stat-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    line-height: 1;
    color: white;
    letter-spacing: 0.5px;
  }

  .stat-sub {
    font-size: 9px;
    color: rgba(255,255,255,0.25);
    margin-top: 3px;
    font-weight: 500;
  }

  /* Section headers */
  .sec-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0 28px;
    margin: 28px 0 14px;
  }

  .sec-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 22px;
    font-weight: 900;
    font-style: italic;
    color: white;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .sec-link {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    color: var(--sport-color);
    text-transform: uppercase;
    cursor: pointer;
  }

  /* Week chart */
  .chart-wrap {
    margin: 0 28px;
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 20px;
  }

  .chart-bars {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    height: 72px;
  }

  .bar-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    height: 100%;
    justify-content: flex-end;
  }

  .bar-fill {
    width: 100%;
    border-radius: 2px 2px 0 0;
    min-height: 3px;
    transition: height 0.4s cubic-bezier(.4,0,.2,1);
  }

  .bar-day {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.5px;
  }

  /* Log items */
  .log-list {
    padding: 0 28px;
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: rgba(255,255,255,0.04);
    border-radius: 4px;
    overflow: hidden;
    margin: 0 28px;
  }

  .log-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px;
    background: #111014;
    cursor: pointer;
    transition: background 0.15s;
  }

  .log-item:hover { background: #161618; }

  .log-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    color: rgba(255,255,255,0.1);
    width: 24px;
    flex-shrink: 0;
    text-align: center;
  }

  .log-info { flex: 1; min-width: 0; }

  .log-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: white;
    text-transform: uppercase;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  .log-meta {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.25);
    margin-top: 3px;
    text-transform: uppercase;
  }

  .log-score {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px;
    color: var(--sport-color);
    flex-shrink: 0;
  }

  /* AI card */
  .ai-block {
    margin: 0 28px;
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-left: 3px solid var(--sport-color);
    border-radius: 4px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .ai-block::before {
    content: 'AI';
    position: absolute;
    right: 16px; top: 50%;
    transform: translateY(-50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 80px;
    color: rgba(255,255,255,0.02);
    line-height: 1;
    pointer-events: none;
  }

  .ai-tag {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 2px;
    color: var(--sport-color);
    text-transform: uppercase;
    margin-bottom: 10px;
    display: flex; align-items: center; gap: 6px;
  }

  .ai-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--sport-color);
    animation: blink 2s infinite;
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .ai-msg {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 18px;
    font-weight: 600;
    font-style: italic;
    color: rgba(255,255,255,0.85);
    line-height: 1.4;
    letter-spacing: 0.3px;
    text-transform: uppercase;
  }

  /* Quick actions */
  .actions-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
    margin: 0 28px;
  }

  .action-btn {
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 18px 8px;
    display: flex; flex-direction: column;
    align-items: center; gap: 8px;
    cursor: pointer;
    transition: all 0.2s;
    position: relative; overflow: hidden;
  }

  .action-btn::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: var(--sport-color);
    transform: scaleX(0);
    transition: transform 0.2s;
  }

  .action-btn:hover::after { transform: scaleX(1); }
  .action-btn:hover { background: #161618; }

  .action-icon { font-size: 24px; }

  .action-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.4);
    text-align: center;
    text-transform: uppercase;
  }

  /* Bottom nav */
  .bottom-nav {
    position: fixed;
    bottom: 0; left: 50%; transform: translateX(-50%);
    width: 100%; max-width: 390px;
    background: rgba(10,10,12,0.95);
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
    background: var(--sport-color);
  }
`;

export default function AthleteLogHome() {
  const [selectedSport, setSelectedSport] = useState("baseball");
  const recentLogs = allSportLogs[selectedSport] || allSportLogs.baseball;
  const [activeTab, setActiveTab] = useState("home");

  const sport = sports.find(s => s.id === selectedSport);
  const maxScore = Math.max(...weekData.filter(d => d.score).map(d => d.score));
  const tickerText = Array(12).fill(null).map((_, i) => (
    <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
      <span className="ticker-word">{sport.en}</span>
      <span className="ticker-dot">✦</span>
    </span>
  ));

  return (
    <>
      <style>{css}</style>
      <div className="home-root" style={{ "--sport-color": sport.color }}>

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-band" />
          <div className="hero-bg-word">{sport.en}</div>

          {/* Ticker band */}
          <div className="ticker-band" style={{ background: sport.color }}>
            <div className="ticker-inner">
              {tickerText}{tickerText}
            </div>
          </div>

          <div className="hero-content">
            <div className="hero-top-row">
              <div>
                <p className="date-badge">WED · MAY 27 · 2026</p>
              </div>
              <div>
                <p className="day-counter">DAY 12 🔥</p>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: 1, textAlign: "right", marginTop: 2 }}>STREAK</p>
              </div>
            </div>

            <div>
              <h1 className="hero-headline">
                <span className="outline">今日の練習は</span>
                <span className="accent">そのデータを</span>
                <span style={{ color: "white", display: "block" }}>書き換えるためにある</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Sport pills */}
        <div className="sport-row" style={{ marginTop: 16 }}>
          {sports.map(s => (
            <button
              key={s.id}
              className={`sport-pill ${selectedSport === s.id ? "active" : ""}`}
              style={selectedSport === s.id ? { background: s.color, borderColor: s.color } : {}}
              onClick={() => setSelectedSport(s.id)}
            >
              {s.emoji} {s.name}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="stats-grid">
          {[
            { key: "Streak", val: "12", sub: "連続練習日", hi: true },
            { key: "This Week", val: "5日", sub: "目標まであと1日" },
            { key: "Condition", val: "85", sub: "良好" },
          ].map((s, i) => (
            <div key={i} className={`stat-cell ${s.hi ? "hi" : ""}`}>
              <p className="stat-key">{s.key}</p>
              <p className="stat-val">{s.val}</p>
              <p className="stat-sub">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="sec-header">
          <h2 className="sec-title">Weekly Form</h2>
          <span className="sec-link">All →</span>
        </div>
        <div className="chart-wrap">
          <div className="chart-bars">
            {weekData.map((d, i) => (
              <div key={i} className="bar-col">
                <div
                  className="bar-fill"
                  style={{
                    height: d.score ? `${(d.score / maxScore) * 60}px` : "3px",
                    background: d.score
                      ? d.score >= 90
                        ? sport.color
                        : `${sport.color}88`
                      : "rgba(255,255,255,0.05)",
                  }}
                />
                <span className="bar-day">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI */}
        <div className="sec-header">
          <h2 className="sec-title">Coach AI</h2>
        </div>
        <div className="ai-block">
          <div className="ai-tag">
            <div className="ai-dot" />
            Live Analysis
          </div>
          <p className="ai-msg">
            今週は練習頻度が高く好調。<br />
            木曜が最高値。明日は<br />
            軽めに疲労回復を優先せよ。
          </p>
        </div>

        {/* Logs */}
        <div className="sec-header">
          <h2 className="sec-title">Recent Logs</h2>
          <span className="sec-link">More →</span>
        </div>
        <div className="log-list">
          {recentLogs.map((log, i) => (
            <div key={i} className="log-item">
              <span className="log-num">{i + 1}</span>
              <div className="log-info">
                <p className="log-title">{log.title}</p>
                <p className="log-meta">{log.date} · {log.mood}</p>
              </div>
              <span className="log-score">{log.score}</span>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="sec-header">
          <h2 className="sec-title">Quick Start</h2>
        </div>
        <div className="actions-row">
          {[
            { icon: "📝", label: "日記を書く" },
            { icon: "🎥", label: "フォーム撮影" },
            { icon: "📊", label: "成長を見る" },
          ].map((a, i) => (
            <button key={i} className="action-btn">
              <span className="action-icon">{a.icon}</span>
              <span className="action-label">{a.label}</span>
            </button>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="bottom-nav">
          {[
            { icon: "⌂", label: "Home", id: "home" },
            { icon: "✦", label: "Diary", id: "diary" },
            { icon: "◉", label: "Form", id: "form" },
            { icon: "↗", label: "Growth", id: "growth" },
            { icon: "◎", label: "Config", id: "settings" },
          ].map(tab => (
            <button key={tab.id} className="nav-btn" onClick={() => setActiveTab(tab.id)}>
              <span style={{
                fontSize: 18,
                color: activeTab === tab.id ? sport.color : "rgba(255,255,255,0.2)",
              }}>{tab.icon}</span>
              <span className="nav-label" style={{
                color: activeTab === tab.id ? sport.color : "rgba(255,255,255,0.2)",
              }}>{tab.label}</span>
              {activeTab === tab.id && <div className="nav-pip" />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
