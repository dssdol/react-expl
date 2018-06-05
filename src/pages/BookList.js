import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import PropTypes from 'prop-types';
import request ,{get,del}from '../utils/request';

class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bookList:[]
        }
    }

    componentWillMount(){
        get('http://localhost:3000/book')
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    bookList:res
                });
            });
    }
    handleDele(book){
        const confirm=window.confirm(`确定删除 ${book.name} 吗?`)
        if(confirm){
            del('http://localhost:3000/book/'+book.id,{
            })
                .then(res=>res.json())
                .then(res=>{
                    console.log(res+"aas");
                    this.setState({
                        bookList:this.state.bookList.filter(item=> item.id !== book.id)
                    });
                    alert('删除成功');
                })
                .catch(err=>{
                    console.log(err+'删除失败');
                    alert('删除用户失败');
            })
        }
    }
    handleEdit(book){
        this.context.router.push('/book/edit/' + book.id);
    }
    render(){
        const {bookList}=this.state;
        return(
            <HomeLayout title="图书列表">
                <table>
                    <thead>
                    <tr>
                        <th>图书ID</th>
                        <th>图书名称</th>
                        <th>价格</th>
                        <th>图书所有者</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        bookList.map((book)=>{
                            return(
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.name}</td>
                                    <td>{book.price}</td>
                                    <td>{book.ownerid}</td>
                                    <td>
                                        <a href="javascripit:;" onClick={() => this.handleEdit(book)}>编辑</a>
                                    </td>
                                    <td>
                                        <a href="javascripit:;" onClick={() => this.handleDele(book)}>删除</a>
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

BookList.contextTypes = {
    router: PropTypes.object.isRequired
};

export default BookList;