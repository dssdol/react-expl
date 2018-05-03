import React from 'react';
import HomeLayout from '../layouts/HomeLayout';
import PropTypes from 'prop-types';

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
    handleEdit(book){
        this.context.router.push('/book/edit/' + book.id);
    }
    render(){
        const {bookList}=this.state;
        console.log(bookList);
        console.log(typeof bookList);
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

                </table>
            </HomeLayout>
        );
    }

}

BookList.contextTypes = {
    router: PropTypes.object.isRequired
};

export default BookList;