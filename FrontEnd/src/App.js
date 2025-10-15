import PaginaNoticias from "./pages/PaginaNoticias";
import NavBar from "./components/NavBar";


const App = () => {
  return (
    <div className="app-layout">
      <NavBar />

      <main className="main-content">
        <PaginaNoticias />
      </main>
    </div>
  );
};
export default App;
