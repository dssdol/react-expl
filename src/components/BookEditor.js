import React from 'react';
import PropTypes from 'prop-types';
import formProvider from '../utils/formProvider';

import HomeLayout from '../layouts/HomeLayout'


class BookEditor extends React.Component{

    componentWillMount(){
        const {editTarget,setFormValues} = this.props;

        if (editTarget) {
            setFormValues(editTarget);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const {form:{name, price, ownerId},formValid,editTarget}= this.props;

        let editType = "添加";
        let apiUrl = "http://localhost:3000/book";
        let method = "post";
        if (editTarget) {
            editType = "编辑";
            method = "put";
            apiUrl += '/' + editTarget.id;
        }
        fetch(apiUrl, {
            method: method,
            body: JSON.stringify({
                name: name.value,
                price: price.value,
                ownerId: ownerId.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.id) {
                    alert(editType + '用户成功');
                    this.context.router.push('/book/bookList');
                    return;
                } else {
                    alert(editType + '失败');
                }
            })
            .catch((err) => console.error(err));
    }
    render(){
        const {form:{name,price,ownerId},onFormChange}=this.props;
        return(
            <HomeLayout>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <div>
                        <label valid={name.valid} error={name.error}>图书名称</label>
                        <input type="text"
                               value={name.value}  onChange={(e)=> onFormChange('name',e.target.value)}
                        />
                        <br />
                        <label valid={price.valid} error={price.error}>图书价格</label>
                        <input type="number"
                               value={price.value} onChange={(e)=> onFormChange('price',e.target.value)}
                        />
                        <br />
                        <label valid={ownerId.valid} error={ownerId.error}>图书所有者</label>
                        <input type="text"
                               value={ownerId.value} onChange={(e)=> onFormChange('ownerId',e.target.value)}
                        />
                        <br />

                    </div>
                    <input type="submit" value="提交"/>
                </form>
            </HomeLayout>
        )
    }
}
// 必须给BookEditor定义一个包含router属性的contextTypes
// 使得组件中可以通过this.context.router来使用React Router提供的方法

BookEditor.contextTypes={
    router:PropTypes.object.isRequired
}

BookEditor=formProvider({
    // name:{
    //     value:''
    // },
    // price:{
    //     value:0
    // },
    // ownerId:{
    //     value:''
    // }
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
    price:{
        defaultValue:0,
        rules:[
            {
                pattern:function(value){
                    return value>=1 && value<=10000;
                },
                error:'请输入10000以下数据'
            }
        ]
    },
    ownerId:{
        defaultValue:'',
        rules:[
            {
                pattern:function(value){
                    return !!value;
                },
                error:"请选择作者名"
            }
        ]
    }
})(BookEditor)



export default BookEditor;