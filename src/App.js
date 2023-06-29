import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Navbar, Sidebar, Footer} from './components';
import {
  HomePage,
  AboutPage,
  CartPage,
  ProductsPage,
  SingleProductPage,
  PrivateRoute,
  ErrorPage,
  CheckoutPage,
  AuthWrapper,
} from './pages';

const App = () => {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='products' element={<ProductsPage />} />
          <Route path='products/:id' element={<SingleProductPage />} />
          <Route path='cart' element={<CartPage />} />
          <Route
            path='checkout'
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route path='*' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthWrapper>
  );
};

export default App;
