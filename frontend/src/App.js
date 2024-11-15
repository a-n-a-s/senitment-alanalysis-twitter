import { Header } from "./components/Header";
import { Main } from "./components/Main";

function App() {
  return (
    <div className="h-screen w-screen bg-gradient-to-r from-sky-400 to-blue-500">
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
