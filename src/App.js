import React from 'react';
import {Routes, Route} from 'react-router-dom';

// Seller Account
import Register from './pages/Register';
import Login from './pages/Login';
import ViewProduct from './pages/ViewProduct';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import Homepage from './pages/HomePage';
import AccountPage from './pages/Account';
import ViewAccount from './pages/ViewAccount';
import TransactionPage from './pages/Transaction';
import DeliveryPage from './pages/Delivery';
import OngoingPage from './pages/Ongoing';
import OngoingDetails from './pages/OngoingDetails';
import EditAccount from './pages/EditAccount';
import EditPassword from './pages/EditPassword';

// Landing and Selection for both Account
import LandingPage from './pages/LandingPage';
import SelectionPage from './pages/SelectionPage';

//Customer Account
import LoginCustomer from './pages/LoginCustomer';
import RegisterCustomer from './pages/RegisterCustomer';
import CustomerHomepage from './pages/CustomerHomepage';
import Basket from './pages/Basket';
import CustomerAccount from './pages/CustomerAccount';
import EditCustomerAccount from './pages/EditCustomerAccount';
import VegetablePage from './pages/Vegetables';
import FruitPages from './pages/Fruits';
import SearchProduct from './pages/SearchProduct';
import ProductDetails from './pages/ProductDetail';
import VegetableDetails from './pages/VegetableDetails';
import ToReviewPage from './pages/ToReview';
import RecommendedDetails from './pages/RecommendedProduct';

//Admin Account
import LoginAdmin from './pages/AdminLogin';
import EditSeller from './pages/EditSeller';
import EditUserImage from './pages/EditUserImage';
import Checkout from './pages/Checkout';
import OrderDetails from './pages/OrderDetails';
import ReviewPage from './pages/ReviewPage';
import SellerSearch from './pages/SellerSearch';
import ToPay from './pages/ToPay';
import ToReceivedPage from './pages/ToReceived';
import CustomerRecentPage from './pages/CustomerRecentTransaction';
import OrderReviewPage from './pages/Review';
import ReviewForm from './pages/CustomerReviewPage';
import UnverifiedTable from './pages/UnverifiedSeller';
import VerifiedTable from './pages/VerifiedSeller';
import ReportTable from './pages/ReportPage';



function App() 
{

  return (
    <div className="App">

          <Routes> 
            
            <Route path="/" element={<LandingPage/>} />
            <Route path="/selectionpage" element={<SelectionPage/>} />

            <Route path="/seller/login" element={<Login/>} />
            <Route path="/register-seller" element={<Register/>} />

            <Route path="/adminlogin" element={<LoginAdmin/>}/>
            <Route path="/admin-unverified" element={<UnverifiedTable/>}/>
            <Route path="/admin-verified" element={<VerifiedTable/>}/>
            <Route path="/edit-verification/:id" element={<EditSeller/>}/>

            <Route path="/login-customer" element={<LoginCustomer/>} />
            <Route path="/register-customer" element={<RegisterCustomer/>} />
            <Route path="/customer-homepage" element={<CustomerHomepage/>} />
            <Route path="/vegetables" element={<VegetablePage/>}/>
            <Route path="/fruits" element={<FruitPages/>}/>
            <Route path="/fruits/:name" element={<ProductDetails/>}/>
            <Route path="/vegetables/:name" element={<VegetableDetails/>}/>  
            <Route path="/searchproduct" element={<SearchProduct/>}/>
            <Route path="/sellersearch" element={<SellerSearch/>}/>
            <Route path="/transactions/ongoing" element={<OngoingPage/>}/>
            <Route path="/to-ship-details/:id" element={<OngoingDetails/>}/>
            <Route path="/to-review-item/:id" element={<ReviewForm/>}/>
            <Route path="/toReview" element={<ToReviewPage/>}/>
            <Route path="/toReview" element={<ToReviewPage/>}/>
            <Route path="/transactions/delivered" element={<DeliveryPage/>}/>
            <Route path="/order-details/:id" element={<OrderDetails/>}/>
   
            <Route path="/basket" element={<Basket/>} />
            <Route path="/checkout/:id" element={<Checkout/>}/>
            <Route path="/toPay" element={<ToPay/>}/>
            <Route path="/toReceive" element={<ToReceivedPage/>}/>
            <Route path="/customer-recent" element={<CustomerRecentPage/>}/>
            <Route path="/customer-account/" element={<CustomerAccount/>} />
            <Route path="/edit-customeraccount" element={<EditCustomerAccount/>}/>
            <Route path="/recommended-products" element={<RecommendedDetails/>}/>

            <Route path="/homepage" element={<Homepage/>} />
            <Route path="/report" element={<ReportTable/>} />
            <Route path="/account" element={<AccountPage/>} />
            <Route path="/edit-userprofile" element={<EditUserImage/>} />
            <Route path="/accountview" element={<ViewAccount/>} />
            <Route path="/edit-account/" element={<EditAccount/>}/>
            <Route path="/edit-password" element={<EditPassword/>} />
            <Route path="/review" element={<OrderReviewPage/>}/>
            <Route path="/customer-review" element={<ReviewPage/>}/>
            <Route path="/transaction" element={<TransactionPage/>} />
            <Route path="/products" element={<ViewProduct/>} />
            <Route path="/products/add" element={<AddProduct/>} />
            <Route path="/products/edit/:id" element={<EditProduct/>} />
          </Routes>
    </div>
  );
}

export default App;