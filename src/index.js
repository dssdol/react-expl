
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route ,hashHistory} from 'react-router';
import UserAddPage from './pages/UserAdd';
import HomePage from './pages/Home';
import UserListPage from './pages/UserList';
import UserEditPage from './pages/UserEdit';

import BookPage from './pages/Book';
import BookListPage from './pages/BookList';
import BookAddPage from './pages/BookAdd';


ReactDOM.render((
    <Router history={hashHistory}>
        <Route path="/" component={HomePage} />
        <Route path="/user/add" component={UserAddPage}/>
        <Route path="/user/userList" component={UserListPage}/>
        <Route path="/user/edit/:id" component={UserEditPage}/>


        <Route path="/book/index" component={BookPage}/>
        <Route path="/book/bookList" component={BookListPage}/>
        <Route path="/book/bookAdd" component={BookAddPage} />
    </Router>
), document.getElementById('app'));
