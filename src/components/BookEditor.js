import React from 'react';
import PropTypes from 'prop-types';
import formProvider from '../utils/formProvider';
import AutoComplete from './AutoComplete';

import HomeLayout from '../layouts/HomeLayout'
import FormItem from "./FormItem";


class BookEditor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            recommendUsers:[]
        }
    }

    componentWillMount(){
        const {editTarget,setFormValues} = this.props;

        if (editTarget) {
            setFormValues(editTarget);
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const {form:{name, price, ownerid},editTarget}= this.props;
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
                name: name,
                price: price,
                ownerid: ownerid,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.id) {
                    alert(editType + '图书成功');
                    this.context.router.push('/book/bookList');
                    return;
                } else {
                    alert(editType + '失败');
                }
            })
            .catch((err) => console.error(err));
    }

    //获取建议列表
    getRecommendUsers(partialUserId){
        fetch('http://localhost:3000/user?id_like=' + partialUserId)
            .then((res)=>res.json())
            .then((res)=>{
                if(res.length==1 && res[0].id===partialUserId){
                    // 如果结果只有1条且id与输入的id一致，说明输入的id已经完整了，没必要再设置建议列表
                    return;
                };
                this.setState({
                    recommendUsers:res.map((user)=>{
                        return {
                            text:`${user.id}（${user.name}）`,
                            value:user.id
                        };
                    })
                });
            });
    }

    timer=0;
    handleOwnerIdChange(value){
        this.props.onFormChange('ownerid',value);
        this.setState({
            recommendUsers:[]
        });

        if(this.timer){
            clearTimeout(this.timer);
        }
        if(value){
            this.timer=setTimeout(()=>{
                this.setState(this.getRecommendUsers(value));
                this.timer=0;
            },200)
        }

    }
    render(){
        const {recommendUsers}=this.state;
        const {form:{name,price,ownerid},onFormChange}=this.props;
        return(
            <HomeLayout>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <div>
                        <label >图书名称：</label>
                        <input type="text"
                               value={name || ''}  onChange={(e)=> onFormChange('name',e.target.value)}
                        />
                        <br />
                        <label >图书价格：</label>
                        <input type="number"
                               value={price || ''} onChange={(e)=> onFormChange('price',e.target.value)}
                        />
                        <br />

                        <label >图书所有者：</label>
                       <AutoComplete value={ownerid ? ownerid+'' : ''}
                                     options={recommendUsers}
                                     onValueChanges={value=> this.handleOwnerIdChange(value)}/>
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
    name:'',
    price:0,
    ownerid:'',
    ownername:''

})(BookEditor)



export default BookEditor;