
import Carddata from './Toolkitcomponent/Carddata';
import ProductDetail from './Toolkitcomponent/Detailpage';
import { Route, Routes } from 'react-router-dom';
import Addtocart from './Toolkitcomponent/Addtocart';
import { useSelector } from 'react-redux';
import { darkThemeColors, lightThemeColors } from './Toolkitcomponent/themeColors';



function App() {
  const themeColor = useSelector((state) => state.data.themeColor);
  const themeStyles = themeColor === 'light' ? lightThemeColors : darkThemeColors;
  

  return (
    <div >
   <Routes style={{ backgroundColor: themeStyles.primary, color: themeStyles.secondary }}>
          <Route path="/" element={<Carddata/>}  />
          <Route path="/details/:key" element={<ProductDetail/>} />
          <Route path="/cart" element={<Addtocart/>}></Route>
        </Routes>
    </div>

  );
}

export default App;
