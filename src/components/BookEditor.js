import React from 'react';
import HomeLayout from '../layouts/HomeLayout'


class BookEditor extends React.Component{
    constructor(props){
        super(props);
        this.state({

        })
    }
    handleSubmit(e){
        e.preventDefault();
        const {form:{name,price,ownerId},editTarget}=this.props;

        let editType="添加";
        let apiUrl="http://localhost:3000/book";
        let method="post";
        if(editTarget){
            editType="编辑";
            method="put";
            apiUrl+='/'+editTarget.id;
        }

        fetch(apiUrl,{
            method:method,
            body:JSON.stringify({
                name:name,
                price:price,
                ownerId:ownerId
            }),
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then((res)=>res.json())
            .then((res)=>{
                if(res.id){
                    alert(editType+'用户成功');
                    this.context.router.push('/book/bookList');
                    return;
                }else{
                    alert(editType+'失败');
                }
            })
            .catch((err)=>console.error(err));

    render(){
        const {name,price,ownerId}=this.props;
        return(
            <HomeLayout>
                <form onSubmit={(e)=>this.handleSubmit(e)}>
                    <div>
                        <label>图书名称</label>
                        <input type="text"
                               value={name}
                        />
                        <br />
                        <label>图书价格</label>
                        <input type="number"
                               value={price}
                        />
                        <br />
                        <label>图书所有者</label>
                        <input type="text"
                               value={ownerId}
                        />
                        <br />
                    </div>
                </form>
            </HomeLayout>
        )
    }
}

export default BookEditor;