import React from 'react';
import {Link} from 'react-router';
import HomeLayout from '../layouts/HomeLayout';

class Book extends React.Component{
    render(){
        return (
            <HomeLayout title="图书管理">
                <Link to="/book/bookList">图书列表</Link>
                <br />
                <Link to="/book/bookAdd">添加图书</Link>
                <br />
            </HomeLayout>
        )
    }
}
export default Book;