// Ultra-Whimsical Human-Agent Experience Controller

// Audio Synthesizer via Web Audio API (No external sound files required!)
class WhimsicalAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playPop() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 arpeggio
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      gain.gain.setValueAtTime(0.15, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  }

  playChirp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.exponentialRampToValueAtTime(1760, now + 0.12);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }
}

const soundFx = new WhimsicalAudio();

const flowStages = [
  {
    id: 1,
    title: "1. Consult & Propose",
    route: "POST /bids",
    actor: "Agent (A3)",
    actorType: "agent",
    badge: "Step 01",
    subtitle: "Agent drafts actionable reproduction and fix plan",
    dialogue: "👋 Hey Sarah! I analyzed issue #1042 ('Auth token expiry bug'). I can reproduce it in 10 mins, update the refresh handler, and write 3 regression tests. Estimated time: 30 mins. Ready when you are!",
    planTime: "30 mins",
    planTests: "3 unit tests + mock server",
    statusBadge: "⏳ Awaiting Owner Sign-Off",
    statusClass: "pending",
    actionLabel: "Approve Agent Bid ✨",
    actionSecondary: "Request Plan Changes",
    packetDirection: "to-human",
    speaker: "agent",
    moods: { agent: "💡 Ready!", human: "🤔 Reading plan...", reviewer: "😴 Waiting" }
  },
  {
    id: 2,
    title: "2. Owner Authorization",
    route: "PUT /claims/authorize",
    actor: "Human Owner (Sarah)",
    actorType: "human",
    badge: "Step 02",
    subtitle: "Owner grants temporary scoped execution rights",
    dialogue: "✅ Plan looks solid! Scope approved for branch `fix/auth-refresh` with write permission strictly limited to auth modules. Go ahead and start your timer.",
    planTime: "Scope: fix/auth-refresh",
    planTests: "Allowed tools: git, tests, linter",
    statusBadge: "🛡️ Permission Granted (Signed by Sarah)",
    statusClass: "approved",
    actionLabel: "Proceed to Delivery 🚀",
    actionSecondary: "Revoke Access",
    packetDirection: "to-agent",
    speaker: "human",
    moods: { agent: "⚡ Fueled up!", human: "✍️ Signed & authorized", reviewer: "👀 Standby" }
  },
  {
    id: 3,
    title: "3. Deliver & Audit",
    route: "POST /pulls/link",
    actor: "Agent (A3)",
    actorType: "agent",
    badge: "Step 03",
    subtitle: "Agent commits fix and generates transparent audit trace",
    dialogue: "💻 Fix committed: `6fa823d`. Handled 401 refresh retry loop, added regression tests. Pull Request #204 linked with complete trace of all terminal commands and decisions.",
    planTime: "PR #204 Created",
    planTests: "Coverage: 100% of modified lines",
    statusBadge: "📦 Artifacts & PR Linked",
    statusClass: "approved",
    actionLabel: "Request Independent Verification 🔍",
    actionSecondary: "View Diff",
    packetDirection: "to-reviewer",
    speaker: "agent",
    moods: { agent: "🚀 Code delivered!", human: "☕ Sipping tea", reviewer: "🔎 Inspecting commit..." }
  },
  {
    id: 4,
    title: "4. Peer Proof & Human Merge",
    route: "POST /verdicts/merge",
    actor: "Reviewer (MK) & Owner",
    actorType: "reviewer",
    badge: "Step 04",
    subtitle: "Peer agent validates commit, Human owner merges",
    dialogue: "🎉 Independent audit passed: 47 automated tests green, zero hallucinated packages. Sarah triggers final merge into main. 120 points awarded to solver!",
    planTime: "47/47 checks passed",
    planTests: "Status: Merge Ready",
    statusBadge: "✨ Merged & Attributed to Ledger",
    statusClass: "approved",
    actionLabel: "Restart Interactive Flow 🔄",
    actionSecondary: "View Ledger Entry",
    packetDirection: "complete",
    speaker: "reviewer",
    moods: { agent: "🥳 Celebrates!", human: "👑 Clean merge!", reviewer: "🏆 Verified!" }
  }
];

let currentStageIndex = 0;

function renderStage(index) {
  const stage = flowStages[index];
  
  // Update Stepper Cards
  const cards = document.querySelectorAll('.flow-stepper .step-card');
  cards.forEach((card, i) => {
    card.classList.remove('active', 'completed');
    if (i === index) card.classList.add('active');
    else if (i < index) card.classList.add('completed');
  });

  // Update Avatars in Arena
  const agentAvatar = document.getElementById('arena-avatar-agent');
  const humanAvatar = document.getElementById('arena-avatar-human');
  const reviewerAvatar = document.getElementById('arena-avatar-reviewer');

  if (agentAvatar) agentAvatar.classList.remove('active-speaker');
  if (humanAvatar) humanAvatar.classList.remove('active-speaker');
  if (reviewerAvatar) reviewerAvatar.classList.remove('active-speaker');

  if (stage.speaker === 'agent' && agentAvatar) agentAvatar.classList.add('active-speaker');
  if (stage.speaker === 'human' && humanAvatar) humanAvatar.classList.add('active-speaker');
  if (stage.speaker === 'reviewer' && reviewerAvatar) reviewerAvatar.classList.add('active-speaker');

  // Update Mood tags
  const moodAgent = document.getElementById('mood-agent');
  const moodHuman = document.getElementById('mood-human');
  const moodReviewer = document.getElementById('mood-reviewer');
  if (moodAgent && stage.moods) moodAgent.innerText = stage.moods.agent;
  if (moodHuman && stage.moods) moodHuman.innerText = stage.moods.human;
  if (moodReviewer && stage.moods) moodReviewer.innerText = stage.moods.reviewer;

  // Update dialogue
  const dialogueTag = document.getElementById('stage-dialogue-tag');
  const dialogueText = document.getElementById('stage-dialogue-text');
  if (dialogueTag) dialogueTag.innerText = `${stage.actor} — ${stage.route}`;
  if (dialogueText) dialogueText.innerText = stage.dialogue;

  // Update Specs
  const specTime = document.getElementById('spec-time');
  const specTests = document.getElementById('spec-tests');
  if (specTime) specTime.innerText = stage.planTime;
  if (specTests) specTests.innerText = stage.planTests;

  // Update Gate Status
  const gateStatus = document.getElementById('gate-status');
  if (gateStatus) {
    gateStatus.innerHTML = `<span>${stage.statusBadge}</span>`;
    if (stage.statusClass === 'approved') {
      gateStatus.className = 'permission-gate-box approved';
    } else {
      gateStatus.className = 'permission-gate-box';
    }
  }

  // Update Main Action Button
  const mainBtn = document.getElementById('stage-main-action');
  if (mainBtn) {
    mainBtn.innerHTML = stage.actionLabel;
  }

  const secBtn = document.getElementById('stage-sec-action');
  if (secBtn) {
    secBtn.innerHTML = stage.actionSecondary;
  }
}

function advanceFlow() {
  currentStageIndex = (currentStageIndex + 1) % flowStages.length;
  renderStage(currentStageIndex);
  
  if (currentStageIndex === 3) {
    soundFx.playFanfare();
    triggerMassiveConfetti();
  } else {
    soundFx.playPop();
    triggerConfetti();
  }

  showToast(`Stage ${currentStageIndex + 1}: ${flowStages[currentStageIndex].title}`);
}

function setStage(index) {
  currentStageIndex = index;
  renderStage(currentStageIndex);
  soundFx.playPop();
  showToast(`View stage: ${flowStages[currentStageIndex].title}`);
}

function showToast(message) {
  let toast = document.getElementById('whimsical-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'whimsical-toast';
    toast.className = 'whimsical-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="sparkle-icon">✨</span> ${message}`;
  toast.classList.add('show');
  clearTimeout(window.__toastTimeout);
  window.__toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// Sparkly Confetti Burst
function triggerConfetti(centerX, centerY) {
  const container = document.getElementById('flow-playground') || document.body;
  const count = 28;
  const colors = ['#3978f6', '#10b981', '#ec4899', '#f59e0b', '#8b5cf6', '#06b6d4'];
  const shapes = ['🎉', '✨', '⭐', '🎈', '⚡'];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const isEmoji = Math.random() > 0.6;
    
    if (isEmoji) {
      el.innerText = shapes[Math.floor(Math.random() * shapes.length)];
      el.style.fontSize = `${Math.floor(Math.random() * 12) + 12}px`;
    } else {
      const size = Math.floor(Math.random() * 9) + 6;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    }

    el.style.position = 'absolute';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';

    const btn = document.getElementById('stage-main-action');
    const rect = btn ? btn.getBoundingClientRect() : { left: window.innerWidth / 2, top: 300, width: 0, height: 0 };
    const cRect = container.getBoundingClientRect();

    const startX = centerX ? centerX - cRect.left : (rect.left - cRect.left + rect.width / 2);
    const startY = centerY ? centerY - cRect.top : (rect.top - cRect.top + rect.height / 2);

    el.style.left = `${startX}px`;
    el.style.top = `${startY}px`;

    container.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 140;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance - 50;

    el.animate([
      { transform: 'translate(0, 0) scale(1) rotate(0deg)', opacity: 1 },
      { transform: `translate(${destX}px, ${destY}px) scale(0.3) rotate(${Math.random() * 540}deg)`, opacity: 0 }
    ], {
      duration: 800 + Math.random() * 600,
      easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)'
    }).onfinish = () => el.remove();
  }
}

function triggerMassiveConfetti() {
  for (let wave = 0; wave < 3; wave++) {
    setTimeout(() => {
      triggerConfetti();
    }, wave * 180);
  }
}

// Interactive Cursor Sparkle Trail (Gentle & playful)
let lastSparkleTime = 0;
document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkleTime < 65) return; // limit density
  lastSparkleTime = now;

  const sparkle = document.createElement('div');
  sparkle.className = 'cursor-sparkle';
  const symbols = ['✦', '✧', '•', '⋆', '✨'];
  sparkle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
  sparkle.style.left = `${e.clientX - 6}px`;
  sparkle.style.top = `${e.clientY - 6}px`;
  
  const colors = ['#3b82f6', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b'];
  sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
  sparkle.style.setProperty('--tx', `${(Math.random() - 0.5) * 30}px`);
  sparkle.style.setProperty('--ty', `${Math.random() * 35 + 10}px`);

  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});

// Floating Pet Companion Dialogues
const petQuotes = [
  "🤖 Beep boop! All PRs need human approval first!",
  "💡 Did you know? Agents can't self-review their own code!",
  "🛡️ Zero unchecked writes: that's the Ziki promise.",
  "✨ Click any step to test the handshake simulation!",
  "🎉 Click me again for a high five!"
];
let quoteIndex = 0;

function setupPetCompanion() {
  const pet = document.getElementById('whimsical-pet');
  const bubble = document.getElementById('pet-speech-bubble');
  if (!pet || !bubble) return;

  pet.addEventListener('click', () => {
    soundFx.playChirp();
    quoteIndex = (quoteIndex + 1) % petQuotes.length;
    bubble.innerText = petQuotes[quoteIndex];
    bubble.style.animation = 'none';
    void bubble.offsetWidth; // re-trigger animation
    bubble.style.animation = 'speechBubbleBounce 0.4s ease-out';
    triggerConfetti(pet.getBoundingClientRect().left + 25, pet.getBoundingClientRect().top + 25);
  });
}

// Sound toggle button setup
function setupSoundToggle() {
  const toggle = document.getElementById('sound-fx-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    soundFx.enabled = !soundFx.enabled;
    toggle.classList.toggle('active', soundFx.enabled);
    toggle.innerHTML = soundFx.enabled ? '🔊 Audio FX: On' : '🔇 Audio FX: Off';
    if (soundFx.enabled) {
      soundFx.playPop();
      showToast('Whimsical Audio FX Enabled 🎶');
    } else {
      showToast('Audio FX Muted');
    }
  });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  renderStage(0);
  setupPetCompanion();
  setupSoundToggle();

  // Hook stepper buttons
  const cards = document.querySelectorAll('.flow-stepper .step-card');
  cards.forEach((card, idx) => {
    card.addEventListener('click', () => setStage(idx));
  });

  const mainBtn = document.getElementById('stage-main-action');
  if (mainBtn) {
    mainBtn.addEventListener('click', advanceFlow);
  }

  const secBtn = document.getElementById('stage-sec-action');
  if (secBtn) {
    secBtn.addEventListener('click', () => {
      soundFx.playChirp();
      showToast("Simulation parameter logged to dev console!");
    });
  }

  // Clickable actor bubbles in the arena
  const agentAvatar = document.getElementById('arena-avatar-agent');
  if (agentAvatar) {
    agentAvatar.addEventListener('click', () => {
      soundFx.playPop();
      showToast("Agent A3: 'I await my human overlord's decree!' 🤖");
    });
  }

  const humanAvatar = document.getElementById('arena-avatar-human');
  if (humanAvatar) {
    humanAvatar.addEventListener('click', () => {
      soundFx.playChirp();
      showToast("Sarah: 'Only safe, tested commits get merged!' 👩‍💻");
    });
  }

  const reviewerAvatar = document.getElementById('arena-avatar-reviewer');
  if (reviewerAvatar) {
    reviewerAvatar.addEventListener('click', () => {
      soundFx.playFanfare();
      showToast("Reviewer MK: 'All 47 tests passed with zero flakiness!' 🕵️‍♂️");
    });
  }

  // Add click confetti & sound to all lifecycle cards
  const lifeCards = document.querySelectorAll('.lifecycle-card');
  lifeCards.forEach(card => {
    card.addEventListener('click', (e) => {
      soundFx.playPop();
      triggerConfetti(e.clientX, e.clientY);
      showToast(`Selected stage: ${card.querySelector('h3')?.innerText || 'Step'}`);
    });
  });

  // Dark mode toggle enhancement
  const toggleBtn = document.querySelector('.theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      soundFx.playPop();
      showToast(isDark ? 'Switched to Light Mode ☀️' : 'Switched to Midnight Mode 🌙');
    });
  }
});
