import "./App.scss";
import Main from "./components/Main";

function App() {
  return (
    <>
      <header className="header border-bottom">
        <div className="container p-2">
          <h1 className="h4">Favorite</h1>
        </div>
      </header>
      <main className="container py-5">
        <Main />
      </main>
    </>
  );
}

export default App;
