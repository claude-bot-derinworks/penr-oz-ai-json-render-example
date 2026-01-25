const cards = [
  {
    title: 'Prompt-driven JSON UI',
    subtitle: 'Describe a UI in JSON and render it instantly.',
    badges: ['AI Prompt', 'JSON Spec', 'Instant UI'],
  },
  {
    title: 'Plan Builder',
    subtitle: 'Pick a plan and customize your add-ons.',
    badges: ['Starter', 'Pro'],
  },
];

export default function HomePage() {
  return (
    <div className="stack column">
      <header className="card">
        <h1 className="title">JSON Render Example</h1>
        <p className="subtitle">
          Minimal Next.js skeleton ready for @json-render integration.
        </p>
      </header>
      <section className="stack row">
        {cards.map((card) => (
          <article className="card" key={card.title}>
            <h2 className="card-title">{card.title}</h2>
            <p className="subtitle">{card.subtitle}</p>
            <div className="stack row">
              {card.badges.map((badge) => (
                <span className="badge" key={badge}>
                  {badge}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
      <section className="card">
        <h2 className="card-title">Next steps</h2>
        <ol className="list">
          <li>Wire @json-render/react into this page.</li>
          <li>Translate prompt output into JSON specs.</li>
          <li>Render dynamic UI nodes in real time.</li>
        </ol>
      </section>
    </div>
  );
}
