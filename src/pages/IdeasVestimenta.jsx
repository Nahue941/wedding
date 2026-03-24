export default function IdeasVestimenta() {
  return (
    <main className="min-h-screen bg-brand-cream px-4 py-8 text-brand-text">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-6 flex justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-brand-wine px-6 py-2.5 text-brand-cream text-base font-semibold shadow-md transition-transform duration-200 hover:scale-105"
          >
            Volver
          </a>
        </div>
        <h1 className="text-2xl sm:text-4xl font-semibold mb-6 text-center">
          Ideas para tu look
        </h1>
        <div className="w-full overflow-auto">
          <a href="/images/vestimenta.jpeg" target="_blank" rel="noreferrer" className="block">
            <img
              src="/images/vestimenta.jpeg"
              alt="Ideas para tu look"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </a>
        </div>
      </div>
    </main>
  );
}



