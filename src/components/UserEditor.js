import React from 'react';
import FormItem from '../components/FormItem';
import formProvider from '../utils/formProvider1';
import PropTypes from 'prop-types';
import HomeLayout from '../layouts/HomeLayout';
import request,{post} from '../utils/request';


class UserEditor extends React.Component{
    componentWillMount(){
        const {editTarget, setFormValues} = this.props;
        if (editTarget) {
            setFormValues(editTarget);
        }
    }
    handleSubmit(e){
        e.preventDefault();
        const {form:{name,age,gender},formValid,editTarget}=this.props;

        if(!formValid){
            alert('请填写正确的信息后重试');
            return;
        }

        let editType="添加";
        let apiUrl="http://localhost:3000/user";
        let method="post";
        if(!!editTarget){
            editType = "编辑";
            apiUrl += '/'+ editTarget.id;
            method = 'put';
        }


        console.log(JSON.stringify({
            name:name.value,
            age:age.value,
            gender:gender.value
        }));

        // fetch(apiUrl,{
        //     method:method,
        //     body:JSON.stringify({
        //         name:name.value,
        //         age:age.value,
        //         gender:gender.value
        //     }),
        //     headers:{
        //         'Content-Type':'application/json',
        //         'Accept': 'application/json',
        //         'Access-Token': sessionStorage.getItem('access_token') || '' // 从sessionStorage中获取access token
        //     }
        // })
        request(method,apiUrl,{
            body:JSON.stringify({
                name:name.value,
                age:age.value,
                gender:gender.value
            }),
        })
            //.then((res)=>res.json())
            .then((res)=>{
                 console.log(res);
                if(res.id){
                    alert(editType+'用户成功');
                    this.context.router.push('/user/userList');
                    return;
                }else{
                    alert(editType+'失败');
                }
            })
            .catch((err)=>console.error(err+"error"));
    }

    render(){
        const {form: {name,age,gender},onFormChange}=this.props;
        return (
            <HomeLayout>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <FormItem label='用户名: ' valid={name.valid} error={name.error}>
                        <input
                            type="text"
                            value={name.value}
                            onChange={(e) => onFormChange('name',e.target.value)}
                        />
                    </FormItem>
                    <FormItem label='年龄' valid={age.valid} error={age.error}>
                        <input type='text' value={age.value}
                               onChange={(e) => onFormChange('age',e.target.value)}
                        />
                    </FormItem>
                    <FormItem label="性别: " valid={gender.valid} error={gender.error}>
                        <select value={gender.value} onChange={(e) => onFormChange('gender',e.target.value)}>
                            <option value="">请选择</option>
                            <option value="male">男</option>
                            <option value="female">女</option>
                        </select>
                    </FormItem>

                    <br/>
                    <input type="submit" value="提交"/>
                </form>
            </HomeLayout>
        )
    }
}
// 必须给UserAdd定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法
UserEditor.contextTypes={
    router:PropTypes.object.isRequired
};

UserEditor=formProvider({
    name:{
        defaultValue:'',
        rules:[
            {
                pattern:function(value){
                    return value.length>0;
                },
                error:'请输入用户名'
            },
            {
                pattern:/^.{1,4}$/,
                error:'用户名最多4个字符'
            }
        ]
    },
    age:{
        defaultValue:0,
        rules:[
            {
                pattern:function(value){
                    return value>=1 && value<=100;
                },
                error:'请输入1-100的年龄'
            }
        ]
    },
    gender:{
        defaultValue:'',
        rules:[
            {
                pattern:function(value){
                    return !!value;
                },
                error:"请选择性别"
            }
        ]
    }
})(UserEditor);




export default UserEditor;