export default function TeamNavigation() {
  const sections = [
    { label: "Leaders", id: "leaders" },
    { label: "Fixtures", id: "fixtures" },
    { label: "Squad", id: "squad" },
    { label: "Transfers", id: "transfers" },
  ];

  function scrollToSection(id) {
    const element = document.getElementById(id);

    if (!element) return;

    const offset = 140;
    const startPosition = window.scrollY;
    const duration = 700;
    const startTime = performance.now();

    function animateScroll(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-in/ease-out movement
      const easedProgress =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      // Recalculate the target position during every frame
      const targetPosition =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset;

      const newPosition =
        startPosition +
        (targetPosition - startPosition) * easedProgress;

      window.scrollTo({
        top: newPosition,
        behavior: "auto",
      });

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-8">
      <div className="flex flex-wrap justify-center gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            className="px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 transition font-medium"
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
}