import { HashRouter, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { HomePage } from './modules/HomePage/HomePage';
import { NotFoundPage } from './modules/NotFoundPage/NotFoundPage';
import { ProductList } from './modules/ProductPages/ProductsList';
import { ProductDetailsPage }
  from './modules/ProductPages/ProductDetailsPage/ProductDetailsPage';

export const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/home" />
        <Route index element={<HomePage />} />
        <Route path="">
          <Route path="/phones" element={<ProductList />}></Route>
          <Route path="/tablets" element={<ProductList />}></Route>
          <Route path="/accessories" element={<ProductList />}></Route>
          <Route
            path="/product/:productId"
            element={<ProductDetailsPage />}
          ></Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </HashRouter>
);
