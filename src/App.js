import { Routes, Route } from "react-router-dom";
import Navigation from "./Components/Routes/navigation/navigation.component";
import Authentication from "./Components/Routes/authentication/Authentication.component";
import Home from "./Components/Routes/home/home.component";
import Shop from "./Components/Routes/shop/shop.component";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;
