import { Routes, Route } from 'react-router';
import { HomePage } from './pages/HomePage';
import { CheckoutPage} from './pages/CheckoutPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="orders" element={<div>Orders</div>} />
      <Route path="tracking" element={<div>Tracking</div>} />
    </Routes>
  );
}

export default App;
