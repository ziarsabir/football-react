export default function TeamNavigation() {
  const sections = [
    { label: "Leaders", id: "leaders" },
    { label: "Fixtures", id: "fixtures" },
    { label: "Squad", id: "squad" },
    { label: "Transfers", id: "transfers" },
  ];

  function scrollToSection(id) {
    const offset = 140;

    let previousHeight = document.documentElement.scrollHeight;
    let stableChecks = 0;
    let checks = 0;

    const checkPageHeight = setInterval(() => {
      const currentHeight = document.documentElement.scrollHeight;

      if (currentHeight === previousHeight) {
        stableChecks += 1;
      } else {
        stableChecks = 0;
        previousHeight = currentHeight;
      }

      checks += 1;

      // Scroll once the page has settled,
      // or after roughly two seconds at most.
      if (stableChecks >= 3 || checks >= 20) {
        clearInterval(checkPageHeight);

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
    }, 100);
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