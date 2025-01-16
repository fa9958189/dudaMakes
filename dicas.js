function expandTip(card) {
  const wasExpanded = card.classList.contains('expanded');
  
  // Collapse all cards
  document.querySelectorAll('.dica-card').forEach(c => {
    c.classList.remove('expanded');
  });
  
  // If the clicked card wasn't expanded, expand it
  if (!wasExpanded) {
    card.classList.add('expanded');
  }
}

// Face map tooltips
document.querySelectorAll('.face-part').forEach(part => {
  part.addEventListener('mouseenter', (e) => {
    const tip = part.dataset.tip;
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tip;
    
    // Position tooltip
    const rect = part.getBoundingClientRect();
    tooltip.style.left = `${rect.left + rect.width/2}px`;
    tooltip.style.top = `${rect.top - 40}px`;
    
    document.body.appendChild(tooltip);
  });
  
  part.addEventListener('mouseleave', () => {
    document.querySelectorAll('.tooltip').forEach(t => t.remove());
  });
});

// Add hover animation to face parts
document.querySelectorAll('.face-part').forEach(part => {
  part.addEventListener('mouseenter', () => {
    part.style.transform = 'scale(1.05)';
  });
  
  part.addEventListener('mouseleave', () => {
    part.style.transform = 'scale(1)';
  });
});