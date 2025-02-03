import "./App.css";
import Footer from "./components/Footer";

function App({ children }) {
  return (
    <div className="App">
      {children}
      <Footer />
    </div>
  );
}

export default App;
