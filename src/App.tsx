import './App.scss';
import { Header } from './components/Header/Header';

export const App = () => {
  return (
    <div className="App">
      <h1 hidden>Product Catalog</h1>
      <Header />
    </div>
  );
};
