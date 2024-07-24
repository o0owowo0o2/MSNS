import React from 'react';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Main from './components/Main';
import QnaPostList from './components/QnaPostList';
import QnaPostDetail from './components/QnaPostDetail';
import QnaPostEdit from './components/QnaPostEdit';
import About from './components/About';
import Location from './components/Location';
import Qna from './components/Qna';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateQnaPost from './components/CreateQnaPost';
import './css/component.css';

import CommunityList from './components/CommunityList';
import CommunityDetail from './components/CommunityDetail';
import CommunityEdit from './components/CommunityEdit';
import CreateCommunity from './components/CreateCommunity';
import CreateContect from './components/CreateContect';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductFormEdit from './components/ProductFormEdit';
import ProductForm from './components/ProductFormCreate';
import Payment from './components/Payment';
import DonationPayment from './components/DonationPayment;';
import CartPage from './components/CartPage';
import { CartProvider } from './components/CartContext';
import AddrDaumKakao02 from './components/AddrDaumKakao02';
import CreatePost from './components/CreatePost';
import PaymentSuccess from './components/PaymentSuccess';

import LandingPage from './components/LandingPage';

import PostList from './components/PostList';
import EmpBoardInsert from './components/EmpBoardInsert';
import MemberMain from './components/MemberMain';

import Register from './components/Register';
import MyPage from './components/MyPage';
import ModifyRegister from './components/ModifyRegister';
import LoginMain from './components/LoginMain';
import DonationInformation from './components/DonationInformation';
import EditNotice from './components/EditNotice';
import DeleteNotice from './components/DeleteNotice';
import Address from './components/Address';
import CreateNotice from './components/CreateNotice';
import NoticeDetail from './components/NoticeDetail';
import NoticeList from './components/NoticeList';
import DeleteRegister from './components/DeleteRegister';

const App = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === '/';

  return (
    <CartProvider>
      <div className='app'>
        {!hideHeaderFooter && <Header />}
        <Switch>
          <Route path="/main" component={Main} exact={true} />
          <Route path="/qna" component={Qna} />
          <Route path="/location" component={Location} />
          <Route path="/qnaPostList" component={QnaPostList} />
          <Route path="/createQnaPost" component={CreateQnaPost} />
          <Route path="/posts/:boardNumber" component={QnaPostDetail} />
          <Route path="/edit/:boardNumber" component={QnaPostEdit} />

          <Route path="/커뮤니티" component={CommunityList} />
          <Route path="/communitys/:boardNumber" component={CommunityDetail} />
          <Route path="/edit/:boardNumber" component={CommunityEdit} />
          <Route path="/community_register" component={CreateCommunity} exact={true} />
          <Route path="/문의하기" component={CreateContect} /> 
          <Route path="/SHOP" component={ProductList} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/add" component={ProductForm} />
          <Route path="/edit/:id" component={ProductFormEdit} />
          <Route path="/payment" component={Payment} />
          <Route path="/do_payment" component={DonationPayment} />
          <Route path="/장바구니" component={CartPage} />
          <Route path="/paymentSuccess" component={PaymentSuccess} />
          <Route path="/create" component={CreatePost} />
          <Route path="/daum_kakao_addr_02" component={AddrDaumKakao02} />

          <Route path="/" component={LandingPage} exact={true}/>
          <Route path="/about" component={About} />
          <Route path="/postlist" component={PostList} />
          <Route path="/register" component={EmpBoardInsert} />
          <Route path="/membermain" component={MemberMain} />

          <Route path="/register" component={Register} />
          <Route path="/loginMain" component={LoginMain} />
          <Route path="/members/:memberNumber" component={MyPage} />
          <Route path="/modifyRegister" component={ModifyRegister} />
          <Route path="/deleteRegister" component={DeleteRegister} />
          <Route path="/address" component={Address} />
          <Route path="/noticeList" component={NoticeList} />
          <Route path="/createNotice" component={CreateNotice} />
          <Route path="/notices/:noticeNumber" component={NoticeDetail} />
          <Route path='/edit/:noticeNumber' component={EditNotice} />
          <Route path='/delete' component={DeleteNotice} />
          <Route path="/donationInformation" component={DonationInformation} />

          {/* <Route path="/product" component={ProductList} /> */}

        </Switch>
        {!hideHeaderFooter && <Footer />}
      </div>
    </CartProvider>
  );
}

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
