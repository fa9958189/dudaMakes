document.addEventListener('DOMContentLoaded', function() {
  // Observador para exibir as story cards quando entrarem na viewport
  const storyCards = document.querySelectorAll('.story-card');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  storyCards.forEach(card => observer.observe(card));
});
