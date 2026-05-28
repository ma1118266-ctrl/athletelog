import { useState } from "react";

const sports = [
  { id: "baseball", emoji: "⚾", name: "野球" },
  { id: "volleyball", emoji: "🏐", name: "バレー" },
  { id: "basketball", emoji: "🏀", name: "バスケ" },
  { id: "soccer", emoji: "⚽", name: "サッカー" },
  { id: "track", emoji: "🏃", name: "陸上" },
];

const menuItems = {
  baseball: ["バッティング", "守備", "投球", "走塁", "筋トレ", "ミーティング"],
  volleyball: ["スパイク", "サーブ", "レシーブ", "ブロック", "フォーメーション", "筋トレ"],
  basketball: ["シュート", "ドリブル", "パス", "ディフェンス", "戦術練習", "筋トレ"],
  soccer: ["シュート", "パス", "ドリブル", "守備", "フォーメーション", "フィジカル"],
  track: ["短距離走", "長距離走", "ハードル", "跳躍", "投擲", "筋トレ"],
};

const moodOptions = [
  { value: 1, emoji: "😞", label: "最悪" },
  { value: 2, emoji: "😕", label: "イマイチ" },
  { value: 3, emoji: "😐", label: "普通" },
  { value: 4, emoji: "😊", label: "良い" },
  { value: 5, emoji: "🔥", label: "最高" },
];

const conditionOptions = [
  { value: 1, emoji: "🤒", label: "不調" },
  { value: 2, emoji: "😓", label: "疲れ" },
  { value: 3, emoji: "😌", label: "普通" },
  { value: 4, emoji: "💪", label: "好調" },
  { value: 5, emoji: "⚡", label: "絶好調" },
];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=DM+Sans:wght@300;400;500;600&family=Space+Mono:wght@400;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .diary-root {
    font-family: 'DM Sans', sans-serif;
    background: #111014;
    min-height: 100vh;
    max-width: 390px;
    margin: 0 auto;
    color: #E8DFC8;
    position: relative;
    overflow-x: hidden;
    padding-bottom: 120px;
  }

  /* Subtle noise */
  .diary-root::before {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0;
  }

  /* Gold gradient text utility */
  .gold-text {
    background: linear-gradient(135deg, #C8A84B 0%, #F0D060 40%, #C8A84B 70%, #E8C84C 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Header */
  .header {
    padding: 52px 28px 24px;
    position: relative; z-index: 1;
  }

  .date-line {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 3px;
    color: #5A5040;
    text-transform: uppercase;
    margin-bottom: 8px;
  }

  .page-title {
    font-family: 'Noto Serif JP', serif;
    font-size: 46px;
    font-weight: 700;
    line-height: 1;
    margin: 0;
    color: #E8DFC8;
    letter-spacing: -1px;
    display: flex;
    align-items: baseline;
    gap: 4px;
  }

  /* Geo circle top right */
  .circle-deco {
    position: absolute;
    top: 40px; right: 20px;
    width: 110px; height: 110px;
    border-radius: 50%;
    border: 1px solid rgba(200,168,75,0.25);
    z-index: 0;
  }
  .circle-deco::after {
    content: '';
    position: absolute;
    inset: 12px;
    border-radius: 50%;
    border: 1px solid rgba(200,168,75,0.15);
  }

  /* Gold divider */
  .gold-divider {
    height: 1px;
    background: linear-gradient(90deg, rgba(200,168,75,0.7) 0%, rgba(200,168,75,0.1) 60%, transparent 100%);
    margin: 0 28px 28px;
  }

  /* Section */
  .section {
    padding: 0 28px 28px;
    position: relative; z-index: 1;
  }

  .section-label {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 3px;
    color: #5A5040;
    text-transform: uppercase;
    margin: 0 0 14px;
  }

  /* Sport buttons */
  .sport-row {
    display: flex;
    gap: 8px;
  }

  .sport-btn {
    flex: 1;
    padding: 14px 4px 10px;
    background: #1C1A18;
    border: 1px solid #2E2A20;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
  }

  .sport-btn.active {
    border-color: #C8A84B;
    background: #201E16;
    box-shadow: 0 0 16px rgba(200,168,75,0.15), inset 0 0 20px rgba(200,168,75,0.04);
  }

  .sport-btn-emoji { font-size: 22px; }

  .sport-btn-name {
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.5px;
    color: #4A4438;
    text-transform: none;
  }

  .sport-btn.active .sport-btn-name {
    background: linear-gradient(135deg, #C8A84B, #F0D060);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Menu tags */
  .menu-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .menu-tag {
    padding: 10px 18px;
    background: #1C1A18;
    border: 1px solid #2E2A20;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    color: #6A6050;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.3px;
  }

  .menu-tag.active {
    background: #201E16;
    border-color: #C8A84B;
    color: #C8A84B;
    box-shadow: 0 0 10px rgba(200,168,75,0.1);
  }

  /* Duration */
  .duration-block {
    background: #1C1A18;
    border: 1px solid #2E2A20;
    border-radius: 8px;
    padding: 20px;
  }

  .duration-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .duration-number {
    font-family: 'DM Sans', sans-serif;
    font-size: 42px;
    font-weight: 300;
    line-height: 1;
    letter-spacing: -1px;
    background: linear-gradient(135deg, #C8A84B, #F0D060);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .duration-unit {
    font-size: 16px;
    color: #4A4438;
    font-weight: 400;
    margin-left: 4px;
    -webkit-text-fill-color: #4A4438;
  }

  .quick-times {
    display: flex;
    gap: 6px;
  }

  .quick-btn {
    padding: 7px 14px;
    background: #242018;
    border: 1px solid #2E2A20;
    border-radius: 4px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: #4A4438;
    cursor: pointer;
    transition: all 0.15s;
    letter-spacing: 0.5px;
  }

  .quick-btn.active {
    border-color: #C8A84B;
    color: #C8A84B;
    background: #201E16;
  }

  .gold-range {
    width: 100%;
    margin-top: 4px;
    -webkit-appearance: none;
    appearance: none;
    height: 3px;
    border-radius: 2px;
    background: linear-gradient(90deg, #C8A84B var(--pct, 50%), #2E2A20 var(--pct, 50%));
    outline: none;
  }

  .gold-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 22px; height: 22px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #F0D878, #B89030);
    box-shadow: 0 2px 8px rgba(200,168,75,0.5);
    cursor: pointer;
    border: 1px solid #C8A84B;
  }

  /* Emoji rows */
  .emoji-row {
    display: flex;
    gap: 6px;
  }

  .emoji-btn {
    flex: 1;
    padding: 14px 4px 10px;
    background: #1C1A18;
    border: 1px solid #2E2A20;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    transition: all 0.2s;
  }

  .emoji-btn.active {
    border-color: #C8A84B;
    background: #201E16;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(200,168,75,0.15);
  }

  .emoji-btn span:first-child { font-size: 26px; }

  .emoji-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.5px;
    color: #3A3428;
    text-transform: uppercase;
  }

  .emoji-btn.active .emoji-label {
    background: linear-gradient(135deg, #C8A84B, #F0D060);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Text inputs */
  .text-input {
    width: 100%;
    background: #1C1A18;
    border: 1px solid #2E2A20;
    border-radius: 6px;
    padding: 16px 18px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #C8BCA0;
    outline: none;
    transition: border-color 0.2s;
    resize: none;
    line-height: 1.7;
  }

  .text-input::placeholder { color: #2E2A20; }

  .text-input:focus {
    border-color: rgba(200,168,75,0.5);
    box-shadow: 0 0 0 3px rgba(200,168,75,0.05);
  }

  /* AI card */
  .ai-card {
    background: #1C1A18;
    border: 1px solid #2E2A20;
    border-left: 2px solid #C8A84B;
    border-radius: 6px;
    padding: 18px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
  }

  .ai-icon {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, #201E16, #2A2618);
    border: 1px solid #C8A84B;
    border-radius: 4px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0;
    color: #C8A84B;
    font-family: 'Space Mono', monospace;
    font-weight: 700;
  }

  .ai-label {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    background: linear-gradient(135deg, #C8A84B, #F0D060);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-transform: uppercase;
    margin: 0 0 6px;
    display: block;
  }

  .ai-text {
    font-size: 13px;
    color: #6A6050;
    line-height: 1.7;
    margin: 0;
    font-weight: 300;
    font-style: italic;
  }

  /* Save button */
  .save-btn {
    width: 100%;
    padding: 20px;
    background: linear-gradient(135deg, #B89030 0%, #E8C840 40%, #C8A840 70%, #A07820 100%);
    border: none;
    border-radius: 6px;
    font-family: 'Noto Serif JP', serif;
    font-size: 17px;
    font-weight: 700;
    color: #1A1610;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 2px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(200,168,75,0.3);
  }

  .save-btn::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    transform: skewX(-20deg);
    transition: left 0.5s;
  }

  .save-btn:not(:disabled):hover::before { left: 150%; }

  .save-btn:disabled {
    background: #1C1A18;
    color: #2E2A20;
    cursor: not-allowed;
    box-shadow: none;
  }

  .save-btn.saved {
    background: linear-gradient(135deg, #1A4A2A, #2A6A3A);
    color: #80D4A0;
    box-shadow: 0 4px 24px rgba(80,200,120,0.2);
  }

  .save-hint {
    text-align: center;
    margin: 10px 0 0;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: #2E2A20;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  /* Bottom nav */
  .bottom-nav {
    background: #0E0C0A;
    border-top: 1px solid #1E1C18;
    padding: 14px 0 32px;
    display: flex;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 50%; transform: translateX(-50%);
    width: 100%; max-width: 390px;
    z-index: 10;
  }

  .nav-btn {
    background: none; border: none; cursor: pointer;
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    padding: 4px 14px;
  }

  .nav-label {
    font-family: 'Space Mono', monospace;
    font-size: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .nav-pip {
    width: 3px; height: 3px; border-radius: 50%;
    background: linear-gradient(135deg, #C8A84B, #F0D060);
  }

  /* Sparkle icon */
  .sparkle {
    position: fixed;
    bottom: 80px; right: 24px;
    font-size: 28px;
    z-index: 5;
    filter: drop-shadow(0 0 8px rgba(200,168,75,0.6));
    animation: sparkle-spin 6s linear infinite;
  }

  @keyframes sparkle-spin {
    0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.8; }
    50% { transform: rotate(180deg) scale(1.1); opacity: 1; }
  }
`;

export default function AthleteLogDiary() {
  const [selectedSport, setSelectedSport] = useState("baseball");
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [mood, setMood] = useState(5);
  const [condition, setCondition] = useState(null);
  const [duration, setDuration] = useState(90);
  const [note, setNote] = useState("");
  const [goal, setGoal] = useState("");
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("diary");

  const canSave = mood && condition && selectedMenus.length > 0;
  const pct = ((duration - 15) / (240 - 15)) * 100;

  const toggleMenu = (item) =>
    setSelectedMenus(prev =>
      prev.includes(item) ? prev.filter(m => m !== item) : [...prev, item]
    );

  const handleSave = () => {
    if (!canSave) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const aiMessage = () => {
    if (!mood || !condition) return null;
    if (mood >= 4 && condition >= 4) return "コンディション・メンタルともに最高峰。この状態を記録し、再現するパターンを見つけよう。";
    if (mood <= 2 || condition <= 2) return "今日の疲弊も大切なデータ。無理せず回復を最優先に。強さは休息からも生まれる。";
    return "着実な積み上げが未来を変える。今日も練習できた事実が、明日の自信になる。";
  };

  return (
    <>
      <style>{css}</style>
      <div className="diary-root">

        {/* Header */}
        <div className="header" style={{ position: "relative" }}>
          <div className="circle-deco" />
          <p className="date-line">2026 / 05 / 27 — WED</p>
          <h1 className="page-title">
            練習<span className="gold-text">日記</span>
          </h1>
        </div>

        <div className="gold-divider" />

        {/* 01 Sport */}
        <div className="section">
          <p className="section-label">01 — 種目</p>
          <div className="sport-row">
            {sports.map(s => (
              <button
                key={s.id}
                className={`sport-btn ${selectedSport === s.id ? "active" : ""}`}
                onClick={() => { setSelectedSport(s.id); setSelectedMenus([]); }}
              >
                <span className="sport-btn-emoji">{s.emoji}</span>
                <span className="sport-btn-name">{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 02 Menu */}
        <div className="section">
          <p className="section-label">02 — 練習メニュー</p>
          <div className="menu-grid">
            {menuItems[selectedSport].map(item => (
              <button
                key={item}
                className={`menu-tag ${selectedMenus.includes(item) ? "active" : ""}`}
                onClick={() => toggleMenu(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* 03 Duration */}
        <div className="section">
          <p className="section-label">03 — 練習時間</p>
          <div className="duration-block">
            <div className="duration-top">
              <div>
                <span className="duration-number">{duration}</span>
                <span className="duration-unit"> min</span>
              </div>
              <div className="quick-times">
                {[30, 60, 90, 120].map(t => (
                  <button
                    key={t}
                    className={`quick-btn ${duration === t ? "active" : ""}`}
                    onClick={() => setDuration(t)}
                  >{t}</button>
                ))}
              </div>
            </div>
            <input
              type="range" min={15} max={240} step={15}
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
              className="gold-range"
              style={{ "--pct": `${pct}%` }}
            />
          </div>
        </div>

        {/* 04 Mood */}
        <div className="section">
          <p className="section-label">04 — モチベーション</p>
          <div className="emoji-row">
            {moodOptions.map(m => (
              <button
                key={m.value}
                className={`emoji-btn ${mood === m.value ? "active" : ""}`}
                onClick={() => setMood(m.value)}
              >
                <span>{m.emoji}</span>
                <span className="emoji-label">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 05 Condition */}
        <div className="section">
          <p className="section-label">05 — コンディション</p>
          <div className="emoji-row">
            {conditionOptions.map(c => (
              <button
                key={c.value}
                className={`emoji-btn ${condition === c.value ? "active" : ""}`}
                onClick={() => setCondition(c.value)}
              >
                <span>{c.emoji}</span>
                <span className="emoji-label">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 06 Goal */}
        <div className="section">
          <p className="section-label">06 — 今日のテーマ</p>
          <input
            type="text"
            className="text-input"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="例：スイングの軌道を安定させる"
          />
        </div>

        {/* 07 Notes */}
        <div className="section">
          <p className="section-label">07 — 練習メモ</p>
          <textarea
            className="text-input"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder={"今日の気づき、良かった点、改善点を記録しよう。\n未来の自分へのメッセージ。"}
            rows={5}
          />
        </div>

        {/* AI */}
        {aiMessage() && (
          <div className="section">
            <div className="ai-card">
              <div className="ai-icon">AI</div>
              <div>
                <span className="ai-label">Coach Analysis</span>
                <p className="ai-text">{aiMessage()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Save */}
        <div className="section">
          <button
            className={`save-btn ${saved ? "saved" : ""}`}
            disabled={!canSave}
            onClick={handleSave}
          >
            {saved ? "✦ 記録完了" : "記録を刻む"}
          </button>
          {!canSave && (
            <p className="save-hint">種目 · 気分 · コンディションを選択</p>
          )}
        </div>

        {/* Sparkle deco */}
        <div className="sparkle">✦</div>

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
                background: activeTab === tab.id
                  ? "linear-gradient(135deg, #C8A84B, #F0D060)"
                  : "none",
                WebkitBackgroundClip: activeTab === tab.id ? "text" : "unset",
                WebkitTextFillColor: activeTab === tab.id ? "transparent" : "#2E2A20",
                backgroundClip: activeTab === tab.id ? "text" : "unset",
              }}>{tab.icon}</span>
              <span className="nav-label" style={{
                background: activeTab === tab.id
                  ? "linear-gradient(135deg, #C8A84B, #F0D060)"
                  : "none",
                WebkitBackgroundClip: activeTab === tab.id ? "text" : "unset",
                WebkitTextFillColor: activeTab === tab.id ? "transparent" : "#2E2A20",
                backgroundClip: activeTab === tab.id ? "text" : "unset",
              }}>{tab.label}</span>
              {activeTab === tab.id && <div className="nav-pip" />}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
