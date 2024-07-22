import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Landing from './components/Landing';
import Main from './components/Main';
import QnaPostList from './components/QnaPostList';
import QnaPostDetail from './components/QnaPostDetail';
import QnaPostEdit from './components/QnaPostEdit';
import Location from './components/Location';
import Qna from './components/Qna';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateQnaPost from './components/CreateQnaPost';
import './css/component.css';

function App() {
  return (
    <div className='app'>
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={Landing} exact={true} />
          <Route path="/main" component={Main} exact={true} />
          <Route path="/qna" component={Qna} />
          <Route path="/location" component={Location} />
          <Route path="/qnaPostList" component={QnaPostList} />
          <Route path="/createQnaPost" component={CreateQnaPost} />
          <Route path="/posts/:boardNumber" component={QnaPostDetail} />
          <Route path="/edit/:boardNumber" component={QnaPostEdit} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
