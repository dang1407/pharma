import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import Register from "./pages/Register/Register";
import Account from "./pages/Account/Account";
import Cart from "./pages/Cart/Cart";
import Collection from "./pages/Collection/Collection";
import Product from "./pages/Product/Product";
import NotFound from "./pages/NotFound/NotFound";
import Body from "./components/Body/Body"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route exact path="/" element={<Home />}></Route> */}
          <Route exact path="/collection" element={<Collection />}></Route>
          <Route path="/collection/:productId" element={<Product />}></Route>
          <Route path="/account/login" element={<LogIn />}></Route>
          <Route path="/account/register" element={<Register />}></Route>
          <Route path="/account" element={<Account />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/" element={<Body />} ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
