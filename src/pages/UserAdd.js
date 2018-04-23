import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import UserEditor from "../components/UserEditor";

class UserAdd extends React.Component{


    render(){
        return (
            <HomeLayout title='添加用户'>
               <UserEditor/>
            </HomeLayout>
        )
    }
}
// 必须给UserAdd定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法

// UserAdd.contextTypes={
//     router: PropTypes.object.isRequired
// }
// UserAdd=formProvider({
//     name:{
//         defaultValue:'',
//         rules:[
//             {
//                 pattern:function(value){
//                     return value.length>0;
//                 },
//                 error:'请输入用户名'
//             },
//             {
//                 pattern:/^.{1,4}$/,
//                 error:'用户名最多4个字符'
//             }
//         ]
//     },
//     age:{
//         defaultValue:0,
//         rules:[
//             {
//                 pattern:function(value){
//                     return value>=1 && value<=100;
//                 },
//                 error:'请输入1-100的年龄'
//             }
//         ]
//     },
//     gender:{
//         defaultValue:'',
//         rules:[
//             {
//                 pattern:function(value){
//                     return !!value;
//                 },
//                 error:"请选择性别"
//             }
//         ]
//     }
// })(UserAdd);

export default UserAdd;