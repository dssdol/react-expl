import React from 'react';
import PropTypes from 'prop-types';
import HomeLayout from '../layouts/HomeLayout'


class BookEditor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            price:'',
            ownerId:''
        }
    }
    componentWillMount(){
        const {editTarget} = this.props;
        if (editTarget) {
            this.setFormValues(editTarget);
        }
    }


    setFormValues(values){
        if(!values){
            return;
        }

        const {form}=this.state;
        let newForm={...form};
        for(const field in form){
            if(form.hasOwnProperty(field)){
                if(typeof values[field] !=='undefined'){
                    newForm[field] = {...newForm[field],value: values[field]}
                }
            }

            this.setState({form: newForm});
        }
    }

    handleValueChange(field,value){
        this.setState({
        [field]:value
        })
    }


    handleSubmit(e) {
        e.preventDefault();
        const {form:{name, price, ownerId},editTarget}= this.props;

        let editType = "添加";
        let apiUrl = "http://localhost:3000/book";
        let method = "post";
        if (editTarget) {
            editType = "编辑";
            method = "put";
            apiUrl += '/' + editTarget.id;
        }
console.log( JSON.stringify({
    name: name,
    price: price,
    ownerId: ownerId
}));
        fetch(apiUrl, {
            method: method,
            body: JSON.stringify({
                name: name,
                price: price,
                ownerId: ownerId
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
                               value={name || ''} onChange={(e)=> this.handleValueChange('name',e.target.value)}
                        />
                        <br />
                        <label>图书价格</label>
                        <input type="number"
                               value={price || ''} onChange={(e)=> this.handleValueChange('price',e.target.value)}
                        />
                        <br />
                        <label>图书所有者</label>
                        <input type="text"
                               value={ownerId || ''} onChange={(e)=> this.handleValueChange('ownerId',e.target.value)}
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

// BookEditor={
//     name:{
//         value:''
//     },
//     price:{
//         value:0
//     },
//     ownerId:{
//         value:''
//     }
//
// }



export default BookEditor;