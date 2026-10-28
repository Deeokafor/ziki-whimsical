# Ziki Improvement: Enhanced Human-Agent Flow & Whimsical Animations

A local enhanced copy of [Ziki](https://ziki.dev/) with an improved **Human-Agent Collaboration Flow** and delightful **whimsical micro-interactions**.

---

## 🚀 Key Improvements

### 1. Interactive Human-Agent Handshake Flow (`#flow-playground`)
The original page featured a static workflow timeline. We created a **real-time interactive Human-Agent Arena** that simulates and demonstrates the deterministic safety gates of Ziki:
- **Step 01 (Consult & Propose):** The agent (`A3`) analyzes an issue, formulates a reproduction and patch plan with time/coverage bounds, and pauses for human sign-off.
- **Step 02 (Human Authorization Gate):** The human owner (`Sarah`) approves or modifies execution bounds and grants a scoped token.
- **Step 03 (Delivery & Transparent Audit Trace):** The agent generates commits, executes in a sandboxed runtime, and links the Pull Request with command logs.
- **Step 04 (Peer Proof & Merging):** Independent reviewer (`MK`) verifies against regressions before Sarah commits the final merge and attributes ledger points.

### 2. Whimsical Animations & Visual Toys
- **🤖 Floating Corner Companion:** An interactive robot companion in the bottom-left corner that reacts when clicked, speaks witty advice, dances with jelly physics, and fires confetti.
- **✨ Cursor Sparkles Trail:** Soft celestial sparkle particles (`✦`, `✧`, `⋆`, `✨`) following user cursor gestures.
- **🎵 Synthesized Web Audio FX:** Procedural chimes, fanfare chords on stage completion, and cheerful bubble pop sounds using the browser Web Audio API (with an on-screen mute toggle).
- **🎭 Dynamic Actor Moods & Speech Bubbles:** Live status badges above each actor (`💡 Ready!`, `🤔 Reading plan...`, `✍️ Signed!`, `🥳 Celebrates!`) with conversational back-and-forth.
- **🌈 Rainbow Accent Ribbon & Shimmering Badges:** Animated gradient top bar and floating multi-color pills that bounce and rotate on hover.
- **🎉 Multi-Wave Confetti Cannon:** Celebratory confetti showers and emoji bursts upon human approval gates.
- **💫 Jelly Squish Physics:** Interactive buttons and cards that squish and spring back when clicked.

---

## 📂 Project Structure
- [`index.html`](file:///home/divine-okafor-udah/Desktop/HNG_INT/ziki-site-improvement-task/index.html) - Enhanced local page entry point
- [`assets/css/improvements.css`](file:///home/divine-okafor-udah/Desktop/HNG_INT/ziki-site-improvement-task/assets/css/improvements.css) - Whimsical animations & flow arena styling
- [`assets/js/flow-enhancements.js`](file:///home/divine-okafor-udah/Desktop/HNG_INT/ziki-site-improvement-task/assets/js/flow-enhancements.js) - Interactive stepper, confetti engine, and handshake dialogue logic
- [`assets/css/`](file:///home/divine-okafor-udah/Desktop/HNG_INT/ziki-site-improvement-task/assets/css/) - Local stylesheets preserved from ziki.dev
- [`assets/images/ziki-mark.svg`](file:///home/divine-okafor-udah/Desktop/HNG_INT/ziki-site-improvement-task/assets/images/ziki-mark.svg) - Brand mark SVG asset

---

## 🖥️ How to View Locally

You can open the page directly in your browser:

### Option A: Open directly in your browser
Double-click [`index.html`](file:///home/divine-okafor-udah/Desktop/HNG_INT/ziki-site-improvement-task/index.html) or run:
```bash
xdg-open index.html
# or with your preferred browser
google-chrome index.html
```

### Option B: Local Web Server
```bash
python3 -m http.server 8080
```
Then navigate to: `http://localhost:8080`
