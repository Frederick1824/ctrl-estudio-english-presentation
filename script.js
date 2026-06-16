const revealElements = document.querySelectorAll(".reveal");
const progressBar = document.querySelector(".timeline-progress");
const stepsSection = document.querySelector(".steps-section");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealElements.forEach((element) => revealObserver.observe(element));

function updateTimelineProgress() {
  if (!progressBar || !stepsSection) return;

  const rect = stepsSection.getBoundingClientRect();
  const scrollable = rect.height - window.innerHeight;
  const progress = scrollable <= 0 ? 1 : Math.min(Math.max(-rect.top / scrollable, 0), 1);

  progressBar.style.height = `${progress * 100}%`;
}

window.addEventListener("scroll", updateTimelineProgress, { passive: true });
window.addEventListener("resize", updateTimelineProgress);
updateTimelineProgress();
