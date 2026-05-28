import { useState } from "react";

const sports = [
  { id: "baseball", emoji: "⚾", name: "野球", en: "BASEBALL", color: "#E8C547" },
  { id: "volleyball", emoji: "🏐", name: "バレー", en: "VOLLEYBALL", color: "#FF6B35" },
  { id: "basketball", emoji: "🏀", name: "バスケ", en: "BASKETBALL", color: "#E84747" },
  { id: "soccer", emoji: "⚽", name: "サッカー", en: "SOCCER", color: "#1A6FE0" },
  { id: "track", emoji: "🏃", name: "陸上", en: "TRACK", color: "#E0E0E0" },
];

const monthlyData = {
  baseball: [62, 68, 71, 75, 72, 80, 78, 85, 83, 88, 91, 95],
  volleyball: [55, 60, 65, 63, 70, 74, 72, 78, 80, 82, 85, 88],
  basketball: [70, 72, 75, 78, 76, 80, 82, 84, 83, 87, 89, 92],
  soccer: [60, 63, 67, 70, 68, 73, 75, 78, 80, 83, 85, 88],
  track: [65, 68, 70, 73, 71, 75, 77, 80, 79, 83, 86, 90],
};

const months = ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

const milestones = [
  { month: "3月", label: "初試合出場", icon: "🏆" },
  { month: "6月", label: "地区大会優勝", icon: "🥇" },
  { month: "9月", label: "自己ベスト更新", icon: "⚡" },
  { month: "12月", label: "年間MVP", icon: "👑" },
];

const bodyData = [
  { label: "身長", value: "172", unit: "cm", change: "+2.0", up: true },
  { label: "体重", value: "65.5", unit: "kg", change: "+1.2", up: true },
  { label: "体脂肪率", value: "12.3", unit: "%", change: "-1.8", up: false },
  { label: "最大心拍数", value: "195", unit: "bpm", change: "+3", up: true },
];

const skillData = {
  baseball: [
    { label: "バッティング", now: 88, start: 62 },
    { label: "守備", now: 82, start: 70 },
    { label: "投球", now: 75, start: 55 },
    { label: "走力", now: 79, start: 65 },
    { label: "メンタル", now: 91, start: 60 },
  ],
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .growth-root {
    font-family: 'DM Sans', sans-serif;
    background: #0A0A0C;
    min-height: 100vh;
    max-width: 390px;
    margin: 0 auto;
    color: #F0EDE8;
    overflow-x: hidden;
    padding-bottom: 100px;
  }

  .growth-root::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0;
  }

  /* Header */
  .header {
    padding: 52px 28px 20px;
    position: relative; z-index: 1;
  }

  .date-line {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2.5px;
    color: rgba(255,255,255,0.2);
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

  .gold {
    background: linear-gradient(135deg, #C8A84B, #F0D060, #C8A84B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, var(--sport-color) 0%, rgba(255,255,255,0.05) 50%, transparent 100%);
    margin: 0 28px 24px;
    opacity: 0.5;
  }

  /* Sport pills */
  .sport-scroll {
    display: flex; gap: 8px;
    padding: 0 28px 20px;
    overflow-x: auto;
    scrollbar-width: none;
    position: relative; z-index: 1;
  }
  .sport-scroll::-webkit-scrollbar { display: none; }

  .sport-pill {
    display: flex; align-items: center; gap: 5px;
    padding: 7px 12px;
    border-radius: 2px;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.04);
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px; font-weight: 700;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.3);
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

  /* Section */
  .section {
    padding: 0 28px 28px;
    position: relative; z-index: 1;
  }

  .sec-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 14px;
  }

  .sec-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 20px;
    font-weight: 900;
    font-style: italic;
    color: white;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .sec-sub {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 1.5px;
    color: var(--sport-color);
    text-transform: uppercase;
    cursor: pointer;
  }

  /* Summary cards */
  .summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 24px;
    position: relative; z-index: 1;
    padding: 0 28px;
  }

  .summary-card {
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 16px;
    position: relative;
    overflow: hidden;
  }

  .summary-card.wide {
    grid-column: span 2;
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .summary-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: var(--sport-color);
    opacity: 0.6;
  }

  .summary-key {
    font-family: 'Space Mono', monospace;
    font-size: 7px;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .summary-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 36px;
    line-height: 1;
    background: linear-gradient(135deg, #C8A84B, #F0D060);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .summary-sub {
    font-size: 10px;
    color: rgba(255,255,255,0.25);
    margin-top: 4px;
    font-weight: 500;
  }

  .summary-change {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-top: 6px;
  }

  /* Line chart */
  .chart-card {
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 20px;
  }

  .chart-period-row {
    display: flex;
    gap: 4px;
    margin-bottom: 16px;
  }

  .period-btn {
    padding: 5px 12px;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: rgba(255,255,255,0.25);
    cursor: pointer;
    letter-spacing: 1px;
    transition: all 0.15s;
  }

  .period-btn.active {
    background: var(--sport-color);
    border-color: var(--sport-color);
    color: #0A0A0C;
  }

  .line-chart-wrap {
    position: relative;
    height: 120px;
  }

  .chart-svg {
    width: 100%; height: 100%;
    overflow: visible;
  }

  .month-labels {
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }

  .month-label {
    font-family: 'Space Mono', monospace;
    font-size: 7px;
    color: rgba(255,255,255,0.15);
    letter-spacing: 0;
  }

  /* Milestone timeline */
  .milestone-row {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .milestone-row::-webkit-scrollbar { display: none; }

  .milestone-card {
    flex-shrink: 0;
    width: 110px;
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 14px 12px;
    position: relative;
    overflow: hidden;
  }

  .milestone-card::before {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: var(--sport-color);
    opacity: 0.5;
  }

  .milestone-icon {
    font-size: 24px;
    margin-bottom: 8px;
    display: block;
  }

  .milestone-month {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 1px;
    color: var(--sport-color);
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .milestone-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: rgba(255,255,255,0.7);
    letter-spacing: 0.3px;
  }

  /* Skill bars */
  .skill-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .skill-item {}

  .skill-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 6px;
  }

  .skill-name {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: rgba(255,255,255,0.7);
    text-transform: uppercase;
  }

  .skill-scores {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .skill-start {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 0.5px;
  }

  .skill-arrow { color: rgba(255,255,255,0.2); font-size: 10px; }

  .skill-now {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    line-height: 1;
    color: var(--sport-color);
  }

  .skill-track {
    height: 4px;
    background: rgba(255,255,255,0.05);
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }

  .skill-bar-start {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    background: rgba(255,255,255,0.1);
    border-radius: 2px;
  }

  .skill-bar-now {
    position: absolute;
    top: 0; left: 0;
    height: 100%;
    border-radius: 2px;
    transition: width 0.6s cubic-bezier(.4,0,.2,1);
  }

  /* Body data */
  .body-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .body-card {
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 14px;
    position: relative;
    overflow: hidden;
  }

  .body-key {
    font-family: 'Space Mono', monospace;
    font-size: 7px;
    letter-spacing: 2px;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .body-val-row {
    display: flex;
    align-items: baseline;
    gap: 4px;
    margin-bottom: 6px;
  }

  .body-val {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    line-height: 1;
    color: white;
    letter-spacing: 0.5px;
  }

  .body-unit {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 1px;
  }

  .body-change {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.5px;
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
`;

export default function AthleteLogGrowth() {
  const [selectedSport, setSelectedSport] = useState("baseball");
  const [period, setPeriod] = useState("1Y");
  const [navTab, setNavTab] = useState("growth");

  const sport = sports.find(s => s.id === selectedSport);
  const data = monthlyData[selectedSport];
  const maxVal = Math.max(...data);
  const minVal = Math.min(...data);

  // Build SVG polyline
  const W = 300, H = 100;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - minVal) / (maxVal - minVal)) * (H - 10) - 5;
    return [x, y];
  });
  const polyline = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const areaPath = `M${pts[0][0]},${H} ` + pts.map(([x, y]) => `L${x},${y}`).join(" ") + ` L${pts[pts.length-1][0]},${H} Z`;

  const firstScore = data[0];
  const lastScore = data[data.length - 1];
  const improvement = lastScore - firstScore;

  const skills = skillData["baseball"];

  return (
    <>
      <style>{css}</style>
      <div className="growth-root" style={{ "--sport-color": sport.color }}>

        {/* Header */}
        <div className="header">
          <p className="date-line">2026 / 05 / 27 — WED</p>
          <h1 className="page-title">
            成長<br /><span className="gold">RECORD</span>
          </h1>
        </div>

        <div className="divider" />

        {/* Sport pills */}
        <div className="sport-scroll">
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

        {/* Summary cards */}
        <div className="summary-grid">
          <div className="summary-card">
            <p className="summary-key">Overall Score</p>
            <p className="summary-val">{lastScore}</p>
            <p className="summary-sub">現在のスコア</p>
            <p className="summary-change" style={{ color: "#4AE880" }}>▲ +{improvement} pts</p>
          </div>
          <div className="summary-card">
            <p className="summary-key">Practice Days</p>
            <p className="summary-val">143</p>
            <p className="summary-sub">今年の練習日数</p>
            <p className="summary-change" style={{ color: sport.color }}>目標まで +22日</p>
          </div>
          <div className="summary-card wide">
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <p className="summary-key" style={{ textAlign: "center" }}>Streak</p>
              <p style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 52, lineHeight: 1,
                background: "linear-gradient(135deg, #C8A84B, #F0D060)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>12</p>
              <p className="summary-sub">連続日数</p>
            </div>
            <div style={{ flex: 1 }}>
              <p className="summary-key">This Year Progress</p>
              <div style={{ height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, marginTop: 8, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: "58%",
                  background: `linear-gradient(90deg, ${sport.color}88, ${sport.color})`,
                  borderRadius: 3,
                }} />
              </div>
              <p style={{ fontFamily: "'Space Mono', monospace", fontSize: 8, color: "rgba(255,255,255,0.2)", letterSpacing: 1, marginTop: 6 }}>
                143 / 250 DAYS TARGET
              </p>
              <p style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 15, fontWeight: 700, fontStyle: "italic",
                color: "rgba(255,255,255,0.6)", marginTop: 8,
                textTransform: "uppercase", letterSpacing: 0.5,
              }}>
                年初比 +{improvement}pts 成長
              </p>
            </div>
          </div>
        </div>

        {/* Line chart */}
        <div className="section">
          <div className="sec-header">
            <h2 className="sec-title">Score Timeline</h2>
            <span className="sec-sub">2026</span>
          </div>
          <div className="chart-card">
            <div className="chart-period-row">
              {["1M","3M","6M","1Y"].map(p => (
                <button key={p} className={`period-btn ${period === p ? "active" : ""}`} onClick={() => setPeriod(p)}>{p}</button>
              ))}
            </div>
            <div className="line-chart-wrap">
              <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={sport.color} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={sport.color} stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={sport.color} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={sport.color} stopOpacity="1" />
                  </linearGradient>
                </defs>
                {/* Grid lines */}
                {[0.25,0.5,0.75].map((f,i) => (
                  <line key={i} x1="0" y1={H*f} x2={W} y2={H*f} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                ))}
                {/* Area fill */}
                <path d={areaPath} fill="url(#areaGrad)" />
                {/* Line */}
                <polyline points={polyline} fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {/* Milestone markers */}
                {[2,5,8,11].map(i => (
                  <circle key={i} cx={pts[i][0]} cy={pts[i][1]} r="4" fill={sport.color} />
                ))}
                {/* Latest point glow */}
                <circle cx={pts[11][0]} cy={pts[11][1]} r="6" fill={sport.color} opacity="0.3" />
                <circle cx={pts[11][0]} cy={pts[11][1]} r="3.5" fill={sport.color} />
              </svg>
            </div>
            <div className="month-labels">
              {months.filter((_, i) => i % 2 === 0).map(m => (
                <span key={m} className="month-label">{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="section">
          <div className="sec-header">
            <h2 className="sec-title">Milestones</h2>
            <span className="sec-sub">2026</span>
          </div>
          <div className="milestone-row">
            {milestones.map((m, i) => (
              <div key={i} className="milestone-card">
                <span className="milestone-icon">{m.icon}</span>
                <p className="milestone-month">{m.month}</p>
                <p className="milestone-label">{m.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skill radar bars */}
        <div className="section">
          <div className="sec-header">
            <h2 className="sec-title">Skill Growth</h2>
            <span className="sec-sub">年初 → 現在</span>
          </div>
          <div className="skill-list">
            {skills.map((s, i) => (
              <div key={i} className="skill-item">
                <div className="skill-top">
                  <span className="skill-name">{s.label}</span>
                  <div className="skill-scores">
                    <span className="skill-start">{s.start}</span>
                    <span className="skill-arrow">→</span>
                    <span className="skill-now">{s.now}</span>
                  </div>
                </div>
                <div className="skill-track">
                  <div className="skill-bar-start" style={{ width: `${s.start}%` }} />
                  <div className="skill-bar-now" style={{
                    width: `${s.now}%`,
                    background: `linear-gradient(90deg, ${sport.color}55, ${sport.color})`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Body data */}
        <div className="section">
          <div className="sec-header">
            <h2 className="sec-title">Body Data</h2>
            <span className="sec-sub">今年の変化</span>
          </div>
          <div className="body-grid">
            {bodyData.map((b, i) => (
              <div key={i} className="body-card">
                <p className="body-key">{b.label}</p>
                <div className="body-val-row">
                  <span className="body-val">{b.value}</span>
                  <span className="body-unit">{b.unit}</span>
                </div>
                <p className="body-change" style={{ color: b.up ? "#4AE880" : "#E84747" }}>
                  {b.up ? "▲" : "▼"} {b.change} {b.unit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* AI comment */}
        <div className="section">
          <div style={{
            background: "#111014",
            border: "1px solid rgba(255,255,255,0.06)",
            borderLeft: `3px solid ${sport.color}`,
            borderRadius: 4,
            padding: 20,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", right: -10, top: -10,
              width: 100, height: 100, borderRadius: "50%",
              background: `radial-gradient(circle, ${sport.color}10 0%, transparent 70%)`,
            }} />
            <p style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 8, letterSpacing: 2,
              color: sport.color, textTransform: "uppercase",
              marginBottom: 10, display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: sport.color, display: "inline-block",
                animation: "blink 2s infinite",
              }} />
              AI Growth Analysis
            </p>
            <p style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 17, fontWeight: 600, fontStyle: "italic",
              color: "rgba(255,255,255,0.8)",
              lineHeight: 1.5, letterSpacing: 0.3,
              textTransform: "uppercase",
            }}>
              年初から+{improvement}ptの成長。<br />
              特にメンタル面が+31ptと突出。<br />
              投球力を強化すると総合力が上がる。
            </p>
          </div>
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
