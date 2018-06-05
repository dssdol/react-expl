import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import PropTypes from 'prop-types';
import {get,del,post} from '../utils/request';

 class UserList extends React.Component{

     constructor(props){
         super(props);
         this.state={
             userList:[]
         }
     }

     componentWillMount(){
         fetch('https://easy-mock.com/mock/5b166106ab0e672adb6b95b6/root/getuserlist')
            .then(res=>res.json())
             .then(res=>{
                 console.log(res+"aaa");
                 this.setState({
                     userList:res.user
                 });
             });
     }

     handleEdit(user){
         this.context.router.push('/user/edit/' + user.id);
     }

     handleDel(user){
         const confirm=window.confirm(`确定要删除用户 ${user.name} 吗?`);
         if(confirm){
             del('http://localhost:3000/user/' + user.id ,{
             })
                // .then(res=>res.json())
                 .then(res=>{
                     this.setState({
                         userList: this.state.userList.filter(item => item.id !== user.id)
                     });
                     alert('删除成功');
                 })
                 .catch(err=>{
                     console.error(err);
                     alert('删除用户失败');
                 })
         };
     }
     render(){
         const {userList}=this.state;

         return(
             <HomeLayout title="用户列表">
                 <table>
                     <thead>
                     <tr>
                         <th>用户ID</th>
                         <th>用户名</th>
                         <th>性别</th>
                         <th>年龄</th>
                     </tr>
                     </thead>

                     <tbody>{
                         userList.map((user) =>{
                             return(
                                 <tr key={user.id}>
                                     <td>{user.id}</td>
                                     <td>{user.name}</td>
                                     <td>{user.age}</td>
                                     <td>{user.gender}</td>
                                     <td>
                                         <a href="javascripit:;" onClick={() => this.handleDel(user)}>删除</a>&nbsp;
                                         <a href="javascripit:;" onClick={() => this.handleEdit(user)}>编辑</a>
                                     </td>
                                 </tr>
                             )
                         })
                     }
                     </tbody>
                 </table>
             </HomeLayout>
         );
     }


 }
UserList.contextTypes = {
    router: PropTypes.object.isRequired
};
 export default UserList;