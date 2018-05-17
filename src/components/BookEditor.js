import React from 'react';
import PropTypes from 'prop-types';
import formProvider from '../utils/formProvider';
import AutoComplete from './AutoComplete';

import HomeLayout from '../layouts/HomeLayout'
import FormItem from "./FormItem";


class BookEditor extends React.Component{

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
    render(){

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
                                     options={[{text:'10001(张三)',value:10001},{text:'10009(编辑)',value:10009},{text:'10010(南乔)',value:10010}]}
                                     onValueChanges={value=> onFormChange('ownerid',value)}/>
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