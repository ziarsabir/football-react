export default function TeamNavigation() {
  const sections = [
    {
      label: "Leaders",
      id: "leaders",
    },
    {
      label: "Fixtures",
      id: "fixtures",
    },
    {
      label: "Squad",
      id: "squad",
    },
    {
      label: "Transfers",
      id: "transfers",
    },
  ];

  function scrollToSection(id) {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  return (
    <div className="max-w-4xl mx-auto mt-8 mb-8">
      <div className="flex flex-wrap justify-center gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
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