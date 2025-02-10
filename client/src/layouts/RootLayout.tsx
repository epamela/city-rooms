import { Outlet } from "react-router-dom";

export function RootLayout() {
  return (
    <div className="root-layout py-10 px-32 flex justify-center items-center">
      <header className="main-header w-full fixed top-0 left-0 h-16">
        <nav>
          <h1>Search destinations</h1>
        </nav>
      </header>

      <main className="main-content mt-16 w-full">
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
