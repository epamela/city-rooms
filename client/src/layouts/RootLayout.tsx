import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="root-layout py-2 px-5 md:py-10 md:px-32 flex justify-center items-center">
      <header className="main-header w-full fixed top-0 left-0 h-16 z-10">
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="mx-auto max-w-screen-xl px-4 py-3 md:py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  Encuentra un alojamiento
                </h1>

                <p className="mt-1.5 text-sm text-gray-500">
                  Escribe el nombre de la ciudad que buscas y encuentra el mejor
                  alojamiento para tu próximo viaje
                </p>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  className="w-full md:w-auto inline-block rounded-sm bg-pink-500 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-500 focus:ring-3 focus:outline-hidden"
                  type="button"
                >
                  ¿Qué es esto?
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content mt-46 w-full">
        <Outlet />
      </main>

      <footer className="main-footer w-full fixed bottom-0 left-0">
        <p>
          Made with ❤️ by <a href="https://github.com/epamela">Pamela</a>
        </p>
      </footer>
    </div>
  );
}
