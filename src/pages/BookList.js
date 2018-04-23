import React from 'react';
import HomeLayout from '../layouts/HomeLayout';

class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            bookList:[]
        }
    }

    componentWillMount(){
        fetch('http://localhost:3000/book')
            .then(res=>res.json())
            .then(res=>{
                this.setState({
                    bookList:res
                });
            });
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
                                    <td>{book.owner_id}</td>
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

export default BookList;