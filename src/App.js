import {
  Route,
  Routes,
  Navigate,
  Link,
  BrowserRouter as Router,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Carddata from "./Toolkitcomponent/Carddata";
import ProductDetail from "./Toolkitcomponent/Detailpage";
import Addtocart from "./Toolkitcomponent/Addtocart";
import SignUppage from "./Toolkitcomponent/Signuppage";
import Loginpage from "./Toolkitcomponent/Loginpage";
import Sellandpage from "./Toolkitcomponent/Sellandpage";
import Sellpagedetail from "./Toolkitcomponent/Sellpagedetail";
import Cartpage from "./Toolkitcomponent/Cartpage";

function App() {
  const isAuthenticated = useSelector((state) => state.data.isAuthenticated);
  return (
    <>
      <Routes>
        <Route path="/" element={<Carddata />} />
        <Route path="/details/:key" element={<ProductDetail />} />
        <Route path="/selldetails/:id" element={<Sellpagedetail />} />
        <Route path='/cart' element={isAuthenticated ? <Addtocart/> : <Navigate to='login'/>}/>
        <Route
          path="/cartspage"
          element={isAuthenticated ? <Cartpage /> : <Navigate to="/login" />}
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Sellandpage/> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={<SignUppage />} />
        <Route path="/login" element={<Loginpage />} />

        {!isAuthenticated && (
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </>
  );
}

export default App;
