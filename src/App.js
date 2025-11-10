import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/vendor.css";
import "./css/normalize.css";

import Layout from "./components/Layout";
import Home from "./components/Home";

// Admin panel
import Adminlayout from "./adminpanel/admin/adminlayout";
import Dashboard from "./adminpanel/admin/dashboard";

// import './adminpanel/assets/js/Chart.min.js';
import Productadd from "./adminpanel/admin/productadd.js";
import Productview from "./adminpanel/admin/productview.js";
import Categoryadd from "./adminpanel/admin/categoryadd.js";
import Categoryview from "./adminpanel/admin/categoryview.js";
import Subcategoryadd from "./adminpanel/admin/subcategoryadd.js";
import Subcategoryview from "./adminpanel/admin/subcategoryview.js";
import Brandadd from "./adminpanel/admin/brandadd.js";
import Brandview from "./adminpanel/admin/brandview.js";
import Tagadd from "./adminpanel/admin/tagadd.js";
import Tagview from "./adminpanel/admin/tagview.js";
import MaincategoryAdd from "./adminpanel/admin/maincategory.js";
import Maincategoryview from "./adminpanel/admin/maincategoryview.js";
import Tagupdate from "./adminpanel/admin/tagupdate.js";
import Subcategoryupdate from "./adminpanel/admin/subcategoryupdate.js";
import Categoryupdate from "./adminpanel/admin/categoryupdate.js";
import ProductUpdate from "./adminpanel/admin/ProductUpdate.jsx";
import Login from "./components/Login.jsx";
import Sign from "./components/Sign.jsx";
import AuthProviderContext from "./context/AuthProviderContext.jsx";
import WishlistContextProvider from "./context/WishlistContextProvider.jsx";
import ViewWishlist from "./pages/ViewWishlist.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import Product from "./pages/Product.jsx";
import MainCategoryProducts from "./pages/MainCategoryProducts.jsx";
import AddToCartContextProvider from "./context/AddToCartContextProvider.jsx";
import CartView from "./pages/CartView.jsx";
import CouponForm from "./adminpanel/admin/CouponForm.jsx";
import CouponList from "./adminpanel/admin/CouponList.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";
import AllOrders from "./pages/AllOrders.jsx";
import ViewAllOrders from "./adminpanel/admin/ViewAllOrders.jsx";
import SearchData from "./components/SearchData.jsx";
import AddBlog from "./adminpanel/admin/AddBlog.jsx";
import ViewBlogs from "./adminpanel/admin/ViewBlogs.jsx";
import AllBlog from "./pages/AllBlog.jsx";
import BlogDetails from "./pages/BlogDetails.jsx";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <WishlistContextProvider>
          <AuthProviderContext>
            <AddToCartContextProvider>
              <Routes>
                <Route path="/admin" element={<Adminlayout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="productadd" element={<Productadd />} />
                  <Route path="productview" element={<Productview />} />
                  <Route path="maincategoryadd" element={<MaincategoryAdd />} />
                  <Route
                    path="maincategoryview"
                    element={<Maincategoryview />}
                  />
                  <Route path="categoryadd" element={<Categoryadd />} />
                  <Route path="categoryview" element={<Categoryview />} />
                  <Route path="subcategoryadd" element={<Subcategoryadd />} />
                  <Route path="subcategoryview" element={<Subcategoryview />} />
                  <Route path="brandadd" element={<Brandadd />} />
                  <Route path="brandview" element={<Brandview />} />
                  <Route path="tagadd" element={<Tagadd />} />
                  <Route path="couponAdd" element={<CouponForm />} />
                  <Route path="addblog" element={<AddBlog />} />
                  <Route path="viewblogs" element={<ViewBlogs />} />
                  <Route path="couponView" element={<CouponList />} />
                  <Route path="tagview" element={<Tagview />} />
                  <Route path="tagupdate/:id" element={<Tagupdate />} />
                  <Route
                    path="subcategoryupdate/:id"
                    element={<Subcategoryupdate />}
                  />
                  <Route
                    path="categoryupdate/:id"
                    element={<Categoryupdate />}
                  />
                  <Route path="productUpdate/:id" element={<ProductUpdate />} />
                  <Route path="viewAllOrders" element={<ViewAllOrders />} />
                </Route>

                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route
                    path="product/:id"
                    element={<MainCategoryProducts />}
                  ></Route>
                  <Route
                    path="productDetail/:id"
                    element={<ProductDetailsPage></ProductDetailsPage>}
                  ></Route>
                  <Route
                    path="wishlist"
                    element={<ViewWishlist></ViewWishlist>}
                  />
                  <Route path="login" element={<Login />} />
                  <Route path="sign" element={<Sign />} />
                  <Route path="cart" element={<CartView />} />
                  <Route path="blogs" element={<AllBlog />} />
                  <Route path="blog/:id" element={<BlogDetails />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="orderConfirmation" element={<OrderConfirmationPage />} />
                  <Route path="allOrders" element={<AllOrders />} />
                  <Route path="search" element={<SearchData />} />
                </Route>
              </Routes>
            </AddToCartContextProvider>
          </AuthProviderContext>
        </WishlistContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
