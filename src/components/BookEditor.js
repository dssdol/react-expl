import React from 'react';
import PropTypes from 'prop-types';
import HomeLayout from '../layouts/HomeLayout'


class BookEditor extends React.Component{

    handleSubmit(e) {
        e.preventDefault();
        const {form: {name, price, ownerId}, editTarget} = this.props;

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
        const {name,price,ownerId}=this.props;
        return(
            <HomeLayout>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <div>
                        <label>图书名称</label>
                        <input type="text"
                               value={name.value}
                        />
                        <br />
                        <label>图书价格</label>
                        <input type="number"
                               value={price.value}
                        />
                        <br />
                        <label>图书所有者</label>
                        <input type="text"
                               value={ownerId.value}
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

BookEditor={
    name:{
        value:''
    },
    price:{
        value:0
    },
    ownerId:{
        value:''
    }

}



export default BookEditor;