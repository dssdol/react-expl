import React from 'react';
import {Link} from 'react-router';
import HomeLayout from '../layouts/HomeLayout'

class Home extends React.Component{
    render(){
        return (
            <HomeLayout tutle='Welcome'>
                <Link to="/user/add">添加用户</Link>
                <br/>
                <Link to="/user/userList">用户列表</Link>
            </HomeLayout>
        );
    }
}
export default Home;