import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.scss";
import LoginScreen from "./screens/LoginScreen";
import SignupAsCustomerScreen from "./screens/SignupAsCustomerScreen";
import SignupAsShopScreen from "./screens/SignupAsShopScreen";
import SearchScreen from "./screens/SearchScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavbar from "./components/Navbar/MainNavbar/MainNavbar";
import ShopScreen from "./screens/ShopScreen";
import CustomerScreen from "./screens/CustomerScreen";
import BillingScreen from "./screens/BillingScreen";
import AddProductsScreen from "./screens/AddProductsScreen";
import ViewShopProductsScreen from "./screens/ViewShopProductsScreen";
import EditShopDetailsScreen from "./screens/EditShopDetailsScreen";
import EditCustomerDetailsScreen from "./screens/EditCustomerDetailsScreen";
import ShopPageScreen from "./screens/ShopPageScreen";
import SideNavbar from "./components/Navbar/SideNavbar/SideNavber";
import { selectCustomer } from "./redux/customer/customerSlice";
import { selectShop } from "./redux/shop/shopSlice";
import SettingsScreen from "./screens/SettingsScreen";
import HomeScreen from "./screens/HomeScreen";
import BottomNavbar from "./components/Navbar/BottomNavBar/BottomNavbar";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import PageNotFound404Screen from "./screens/PageNotFound404Screen";
import { selectMisc } from "./redux/misc/miscSlice";
import FavoriteShopsScreen from "./screens/FavoriteShopsScreen";
import { ToastContainer } from "react-toastify";
import AddItemPopup from "./components/Product/AddItemPopup/AddItemPopup";
import { selectCart } from "./redux/cart/cartSlice";

function App() {
  const [locked, setLocked] = useState("");
  const { customerInfoFulfilled } = useSelector(selectCustomer);
  const { shopInfoFulfilled } = useSelector(selectShop);
  const { forgetUser } = useSelector(selectMisc);
  const { addItemPopup } = useSelector(selectCart);

  const removeUser = (e) => {
    e.preventDefault();
    if (forgetUser === true) {
      localStorage.removeItem("shopInfo");
      localStorage.removeItem("customerInfo");
    }
  };

  useEffect(() => {
    window.addEventListener("beforeunload", removeUser);
    return () => window.removeEventListener("beforeunload", removeUser);
  }, [removeUser]);

  useEffect(() => {
    if (customerInfoFulfilled || shopInfoFulfilled) {
      // someone logged in
      setLocked(true);
    } else {
      // no one logged in
      setLocked(false);
    }
  }, [customerInfoFulfilled, shopInfoFulfilled]);

  return (
    <div className="App">
      <Router>
        {locked && <SideNavbar />}

        <MainNavbar />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/signup" element={<SignupAsCustomerScreen />} />
            <Route path="/addshop" element={<SignupAsShopScreen />} />

            <Route element={<ShopScreen />}>
              <Route path="addproducts" element={<AddProductsScreen />} />
              <Route
                path="viewshopproducts"
                element={<ViewShopProductsScreen />}
              />
              <Route
                path="editandviewshopdetails"
                element={<EditShopDetailsScreen />}
              />
              <Route path="settings" element={<SettingsScreen />} />
              <Route path="billing" element={<BillingScreen />} />
            </Route>

            <Route element={<CustomerScreen />}>
              <Route
                path="editcustomerdetails"
                element={<EditCustomerDetailsScreen />}
              />
              <Route path="favoriteshops" element={<FavoriteShopsScreen />} />
            </Route>

            <Route path="/login" element={<LoginScreen />} />
            <Route path=":shopId/*" element={<ShopPageScreen />} />
            <Route
              path="/resetpassword/:securitycode"
              element={<PasswordResetScreen />}
            />
            <Route path="*" element={<PageNotFound404Screen />} />
          </Routes>
          <BottomNavbar />

          <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            closeOnClick
            pauseOnHover
            newestOnTop
            theme="light"
          />
          {addItemPopup && <AddItemPopup />}
        </main>
      </Router>
    </div>
  );
}

export default App;
