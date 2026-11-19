const messages = [...document.querySelectorAll('[data-message]')];
const pause = document.querySelector('#pause');
const replay = document.querySelector('#replay');
const typing = document.querySelector('#typing');
const label = document.querySelector('#typing-label');
const progress = document.querySelector('#demo-progress');
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const names = ['기획', '구현', '검토'];
const delays = [1700, 2600, 2900];
let count = 1;
let paused = false;
let timer;
let remaining = delays[0];
let deadline = 0;

function render() {
  messages.forEach((message, index) => { message.hidden = index >= count; });
  typing.hidden = count >= messages.length || paused;
  if (count < messages.length) label.textContent = `${names[count - 1]} 에이전트가 생각하고 있어요`;
  progress.textContent = count === messages.length ? '함께 만든 하나의 결과' : `대화 미리보기 ${count} / ${messages.length}`;
  pause.textContent = paused ? '계속 재생' : '일시정지';
  pause.setAttribute('aria-pressed', String(paused));
  pause.disabled = count === messages.length;
}

function schedule() {
  clearTimeout(timer);
  if (paused || document.hidden || count >= messages.length) return;
  deadline = performance.now() + remaining;
  timer = setTimeout(() => {
    count += 1;
    remaining = delays[count - 1] || 0;
    render();
    schedule();
  }, remaining);
}

function stopClock() {
  clearTimeout(timer);
  remaining = Math.max(0, deadline - performance.now());
}

pause.addEventListener('click', () => {
  if (!paused) stopClock();
  paused = !paused;
  render();
  schedule();
});

replay.addEventListener('click', () => {
  clearTimeout(timer);
  count = 1;
  paused = false;
  remaining = delays[0];
  render();
  schedule();
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && !paused) stopClock();
  else schedule();
});

function respectMotion() {
  clearTimeout(timer);
  count = motion.matches ? messages.length : 1;
  paused = false;
  remaining = delays[0];
  document.querySelector('.app-window').classList.toggle('is-animated', !motion.matches);
  render();
  schedule();
}
motion.addEventListener('change', respectMotion);
respectMotion();
