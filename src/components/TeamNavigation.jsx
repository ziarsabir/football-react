export default function TeamNavigation() {
  const sections = [
    { label: "Leaders", id: "leaders" },
    { label: "Fixtures", id: "fixtures" },
    { label: "Squad", id: "squad" },
    { label: "Transfers", id: "transfers" },
  ];

  function scrollToSection(id) {
    const offset = 140;

    function performScroll() {
      const element = document.getElementById(id);

      if (!element) return;

      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }

    // Scroll immediately
    performScroll();

    // Correct the position after the sections above finish loading
    setTimeout(performScroll, 600);
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