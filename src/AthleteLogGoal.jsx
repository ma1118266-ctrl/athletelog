import { useState } from "react";

const sports = [
  { id: "baseball", emoji: "⚾", name: "野球", en: "BASEBALL", color: "#E8C547" },
  { id: "volleyball", emoji: "🏐", name: "バレー", en: "VOLLEYBALL", color: "#FF6B35" },
  { id: "basketball", emoji: "🏀", name: "バスケ", en: "BASKETBALL", color: "#E84747" },
  { id: "soccer", emoji: "⚽", name: "サッカー", en: "SOCCER", color: "#1A6FE0" },
  { id: "track", emoji: "🏃", name: "陸上", en: "TRACK", color: "#E0E0E0" },
];

const presetGoals = [
  { id: 1, icon: "🏆", title: "地区大会優勝", deadline: "2026.08.15", progress: 68, category: "試合" },
  { id: 2, icon: "⚡", title: "フォームスコア90達成", deadline: "2026.07.01", progress: 85, category: "技術" },
  { id: 3, icon: "🔥", title: "連続練習100日", deadline: "2026.09.01", progress: 12, category: "習慣", streak: true },
  { id: 4, icon: "💪", title: "体重+3kg筋肉増量", deadline: "2026.12.31", progress: 40, category: "フィジカル" },
];

const categoryColors = {
  "試合": "#E8C547",
  "技術": "#1A6FE0",
  "習慣": "#4AE880",
  "フィジカル": "#FF6B35",
};

const bigGoalSteps = [
  { label: "甲子園出場", done: false, current: false },
  { label: "地区大会優勝", done: false, current: true },
  { label: "県大会ベスト8", done: true, current: false },
  { label: "地区予選突破", done: true, current: false },
  { label: "レギュラー獲得", done: true, current: false },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500&family=Space+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .goal-root {
    font-family: 'DM Sans', sans-serif;
    background: #0A0A0C;
    min-height: 100vh;
    max-width: 390px;
    margin: 0 auto;
    color: #F0EDE8;
    overflow-x: hidden;
    padding-bottom: 100px;
  }

  .goal-root::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0;
  }

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

  .sec-action {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 1.5px;
    color: var(--sport-color);
    text-transform: uppercase;
    cursor: pointer;
    background: none; border: none;
    padding: 0;
  }

  /* BIG GOAL HERO */
  .big-goal-card {
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 6px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .big-goal-bg-text {
    position: absolute;
    bottom: -16px; right: -8px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 100px;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255,255,255,0.03);
    line-height: 1;
    pointer-events: none;
    letter-spacing: -2px;
  }

  .big-goal-tag {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 2px;
    color: var(--sport-color);
    text-transform: uppercase;
    display: flex; align-items: center; gap: 6px;
    margin-bottom: 12px;
  }

  .big-goal-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--sport-color);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.7); }
  }

  .big-goal-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 36px;
    font-weight: 900;
    font-style: italic;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1;
    margin-bottom: 6px;
  }

  .big-goal-deadline {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: rgba(255,255,255,0.25);
    letter-spacing: 1.5px;
    margin-bottom: 20px;
    text-transform: uppercase;
  }

  .big-goal-progress-wrap {
    margin-bottom: 8px;
  }

  .big-goal-progress-top {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 8px;
  }

  .big-goal-pct {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    line-height: 1;
    background: linear-gradient(135deg, #C8A84B, #F0D060);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .big-goal-days {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: rgba(255,255,255,0.25);
    letter-spacing: 1px;
    text-align: right;
  }

  .big-goal-bar-track {
    height: 6px;
    background: rgba(255,255,255,0.05);
    border-radius: 3px;
    overflow: hidden;
  }

  .big-goal-bar-fill {
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(90deg, var(--sport-color) 0%, #F0D060 100%);
    box-shadow: 0 0 10px rgba(200,168,75,0.4);
    transition: width 0.6s cubic-bezier(.4,0,.2,1);
  }

  /* Roadmap / steps */
  .roadmap {
    display: flex;
    flex-direction: column;
    gap: 0;
    margin-top: 20px;
  }

  .roadmap-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    position: relative;
    padding-bottom: 18px;
  }

  .roadmap-item:last-child { padding-bottom: 0; }

  .roadmap-line-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    padding-top: 2px;
  }

  .roadmap-node {
    width: 20px; height: 20px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 9px;
    flex-shrink: 0;
    transition: all 0.2s;
    position: relative; z-index: 1;
  }

  .roadmap-node.done {
    background: var(--sport-color);
    color: #0A0A0C;
    font-weight: 700;
  }

  .roadmap-node.current {
    background: transparent;
    border: 2px solid var(--sport-color);
    box-shadow: 0 0 10px rgba(200,168,75,0.4);
  }

  .roadmap-node.current::after {
    content: '';
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--sport-color);
    animation: pulse 1.5s infinite;
  }

  .roadmap-node.future {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
  }

  .roadmap-connector {
    width: 1px;
    flex: 1;
    min-height: 18px;
    margin-top: 2px;
  }

  .roadmap-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding-top: 2px;
  }

  /* Goal cards */
  .goal-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .goal-card {
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 16px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .goal-card:hover { border-color: rgba(255,255,255,0.12); }

  .goal-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: var(--cat-color, #E8C547);
  }

  .goal-card-top {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 12px;
  }

  .goal-icon {
    font-size: 24px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .goal-info { flex: 1; min-width: 0; }

  .goal-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;
    color: white;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  .goal-meta-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .goal-cat-badge {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 1px;
    padding: 2px 7px;
    border-radius: 2px;
    text-transform: uppercase;
  }

  .goal-deadline {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.2);
    text-transform: uppercase;
  }

  .goal-pct {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    line-height: 1;
    color: var(--cat-color, #E8C547);
    flex-shrink: 0;
  }

  .goal-bar-track {
    height: 3px;
    background: rgba(255,255,255,0.05);
    border-radius: 2px;
    overflow: hidden;
  }

  .goal-bar-fill {
    height: 100%;
    border-radius: 2px;
    background: var(--cat-color, #E8C547);
    opacity: 0.7;
    transition: width 0.6s;
  }

  /* Streak card */
  .streak-card {
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 4px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    position: relative;
    overflow: hidden;
  }

  .streak-card::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 3px;
    background: #4AE880;
  }

  .streak-flame {
    font-size: 44px;
    flex-shrink: 0;
    filter: drop-shadow(0 0 12px rgba(74,232,128,0.5));
    animation: flicker 2s ease-in-out infinite;
  }

  @keyframes flicker {
    0%, 100% { transform: scale(1) rotate(-2deg); }
    50% { transform: scale(1.05) rotate(2deg); }
  }

  .streak-info { flex: 1; }

  .streak-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px;
    line-height: 1;
    color: #4AE880;
    letter-spacing: 1px;
  }

  .streak-label {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 14px;
    font-weight: 700;
    font-style: italic;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-top: 2px;
  }

  .streak-target {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    color: rgba(255,255,255,0.2);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-top: 8px;
  }

  .streak-bar-track {
    height: 3px;
    background: rgba(255,255,255,0.05);
    border-radius: 2px;
    overflow: hidden;
    margin-top: 6px;
  }

  .streak-bar-fill {
    height: 100%;
    background: #4AE880;
    border-radius: 2px;
    opacity: 0.7;
  }

  /* Add goal button */
  .add-goal-btn {
    width: 100%;
    padding: 18px;
    background: transparent;
    border: 1px dashed rgba(255,255,255,0.12);
    border-radius: 4px;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 15px;
    font-weight: 700;
    font-style: italic;
    letter-spacing: 1px;
    color: rgba(255,255,255,0.25);
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .add-goal-btn:hover {
    border-color: var(--sport-color);
    color: var(--sport-color);
  }

  /* AI suggestion */
  .ai-card {
    background: #111014;
    border: 1px solid rgba(255,255,255,0.06);
    border-left: 3px solid var(--sport-color);
    border-radius: 4px;
    padding: 20px;
    position: relative;
    overflow: hidden;
  }

  .ai-card::after {
    content: 'AI';
    position: absolute;
    right: 12px; bottom: 8px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 70px;
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

  .ai-dot {
    width: 5px; height: 5px; border-radius: 50%;
    background: var(--sport-color);
    animation: pulse 2s infinite;
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

export default function AthleteLogGoal() {
  const [selectedSport, setSelectedSport] = useState("baseball");
  const [navTab, setNavTab] = useState("goal");

  const sport = sports.find(s => s.id === selectedSport);

  const daysLeft = (deadline) => {
    const d = new Date(deadline.replace(/\./g, "-"));
    const now = new Date("2026-05-27");
    return Math.max(0, Math.ceil((d - now) / (1000 * 60 * 60 * 24)));
  };

  return (
    <>
      <style>{css}</style>
      <div className="goal-root" style={{ "--sport-color": sport.color }}>

        {/* Header */}
        <div className="header">
          <p className="date-line">2026 / 05 / 27 — WED</p>
          <h1 className="page-title">
            目標<br /><span className="gold">GOALS</span>
          </h1>
        </div>

        <div className="divider" />

        {/* Sport pills */}
        <div style={{ display: "flex", gap: 8, padding: "0 28px 24px", overflowX: "auto", scrollbarWidth: "none", position: "relative", zIndex: 1 }}>
          {sports.map(s => (
            <button key={s.id} onClick={() => setSelectedSport(s.id)} style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "7px 12px",
              borderRadius: 2,
              border: selectedSport === s.id ? `1px solid ${s.color}` : "1px solid rgba(255,255,255,0.08)",
              background: selectedSport === s.id ? s.color : "rgba(255,255,255,0.04)",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 12, fontWeight: 700, letterSpacing: 1,
              color: selectedSport === s.id ? "#0A0A0C" : "rgba(255,255,255,0.3)",
              cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, textTransform: "uppercase",
              transition: "all 0.2s",
            }}>{s.emoji} {s.name}</button>
          ))}
        </div>

        {/* BIG GOAL */}
        <div className="section">
          <div className="sec-header">
            <h2 className="sec-title">Ultimate Goal</h2>
          </div>
          <div className="big-goal-card">
            <div className="big-goal-bg-text">GOAL</div>
            <div className="big-goal-tag">
              <div className="big-goal-dot" />
              Final Target · {sport.name}
            </div>
            <p className="big-goal-title">甲子園出場</p>
            <p className="big-goal-deadline">⏱ DEADLINE · 2027.03.31 · 残り{daysLeft("2027.03.31")}日</p>

            <div className="big-goal-progress-wrap">
              <div className="big-goal-progress-top">
                <span className="big-goal-pct">42%</span>
                <p className="big-goal-days">
                  <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: sport.color }}>307</span><br />
                  days left
                </p>
              </div>
              <div className="big-goal-bar-track">
                <div className="big-goal-bar-fill" style={{ width: "42%" }} />
              </div>
            </div>

            {/* Roadmap */}
            <div className="roadmap">
              {bigGoalSteps.map((step, i) => (
                <div key={i} className="roadmap-item">
                  <div className="roadmap-line-wrap">
                    <div className={`roadmap-node ${step.done ? "done" : step.current ? "current" : "future"}`}>
                      {step.done ? "✓" : step.current ? "" : ""}
                    </div>
                    {i < bigGoalSteps.length - 1 && (
                      <div className="roadmap-connector" style={{
                        background: step.done
                          ? `linear-gradient(180deg, ${sport.color}, ${sport.color}44)`
                          : "rgba(255,255,255,0.06)",
                      }} />
                    )}
                  </div>
                  <p className="roadmap-label" style={{
                    color: step.done ? sport.color : step.current ? "white" : "rgba(255,255,255,0.25)",
                    fontStyle: step.current ? "italic" : "normal",
                  }}>
                    {step.current && "▶ "}{step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Streak goal */}
        <div className="section">
          <div className="sec-header">
            <h2 className="sec-title">Streak Goal</h2>
          </div>
          <div className="streak-card">
            <div className="streak-flame">🔥</div>
            <div className="streak-info">
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span className="streak-num">12</span>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: "rgba(255,255,255,0.2)" }}>/100</span>
              </div>
              <p className="streak-label">連続練習日数</p>
              <p className="streak-target">Target · 100 Days · 残り88日</p>
              <div className="streak-bar-track">
                <div className="streak-bar-fill" style={{ width: "12%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Sub goals */}
        <div className="section">
          <div className="sec-header">
            <h2 className="sec-title">Sub Goals</h2>
            <button className="sec-action">+ 追加</button>
          </div>
          <div className="goal-list">
            {presetGoals.filter(g => !g.streak).map((g, i) => (
              <div
                key={g.id}
                className="goal-card"
                style={{ "--cat-color": categoryColors[g.category] }}
              >
                <div className="goal-card-top">
                  <span className="goal-icon">{g.icon}</span>
                  <div className="goal-info">
                    <p className="goal-title">{g.title}</p>
                    <div className="goal-meta-row">
                      <span className="goal-cat-badge" style={{
                        background: `${categoryColors[g.category]}18`,
                        color: categoryColors[g.category],
                        border: `1px solid ${categoryColors[g.category]}44`,
                      }}>{g.category}</span>
                      <span className="goal-deadline">残り{daysLeft(g.deadline)}日</span>
                    </div>
                  </div>
                  <span className="goal-pct">{g.progress}</span>
                </div>
                <div className="goal-bar-track">
                  <div className="goal-bar-fill" style={{ width: `${g.progress}%` }} />
                </div>
              </div>
            ))}
            <button className="add-goal-btn">
              <span style={{ fontSize: 18 }}>＋</span>
              新しい目標を追加する
            </button>
          </div>
        </div>

        {/* AI advice */}
        <div className="section">
          <div className="sec-header">
            <h2 className="sec-title">AI Advice</h2>
          </div>
          <div className="ai-card">
            <div className="ai-tag">
              <div className="ai-dot" />
              Goal Analysis
            </div>
            <p className="ai-text">
              地区大会まで残り80日。<br />
              フォームスコア目標達成が近い。<br />
              次は守備力強化に集中すると<br />
              甲子園目標への道が開ける。
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
            { icon: "🏆", label: "Goals", id: "goal" },
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
