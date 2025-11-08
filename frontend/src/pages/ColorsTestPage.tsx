export default function ColorTestPage() {
  const colors = {
    Brand: {
      "--primary": "oklch(0.76 0.1 192)",
      "--secondary": "oklch(0.76 0.1 12)",
    },
    UI: {
      "--danger": "oklch(0.7 0.1 30)",
      "--warning": "oklch(0.7 0.1 100)",
      "--success": "oklch(0.7 0.1 160)",
      "--info": "oklch(0.7 0.1 260)",
    },
    "Background / Text / Borders": {
      "--bg-dark": "oklch(0.1 0.025 331)",
      "--bg": "oklch(0.15 0.025 331)",
      "--bg-light": "oklch(0.2 0.025 331)",
      "--text": "oklch(0.96 0.05 331)",
      "--text-muted": "oklch(0.76 0.05 331)",
      "--highlight": "oklch(0.5 0.05 331)",
      "--border": "oklch(0.4 0.05 331)",
      "--border-muted": "oklch(0.3 0.05 331)",
    },
  };

  return (
    <div
      className="min-h-screen p-8"
      style={{
        backgroundColor: "oklch(0.15 0.025 331)",
        color: "oklch(0.96 0.05 331)",
      }}
    >
      <h1 className="text-3xl font-bold mb-6">Color System Test</h1>

      <div className="space-y-8">
        {Object.entries(colors).map(([groupName, groupColors]) => (
          <section key={groupName}>
            <h2 className="text-xl font-semibold mb-3">{groupName}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(groupColors).map(([name, value]) => (
                <div
                  key={name}
                  className="rounded-xl border p-3 flex flex-col items-center justify-center text-center"
                  style={{
                    backgroundColor: "oklch(0.2 0.025 331)",
                    borderColor: "oklch(0.4 0.05 331)",
                  }}
                >
                  <div
                    className="w-full h-16 rounded-lg mb-2 border"
                    style={{
                      backgroundColor: value,
                      borderColor: "oklch(0.3 0.05 331)",
                    }}
                  />
                  <span className="font-medium">{name}</span>
                  <span className="text-sm text-[oklch(0.76_0.05_331)] break-all">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
