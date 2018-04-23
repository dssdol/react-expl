import React from 'react';
import HomeLayout from '../layouts/HomeLayout'
import BookEditor from '../components/BookEditor'


class BookAdd extends React.Comonent{
    render(){
        return(
            <<HomeLayout title="添加图书">
                <BookEditor />
            </HomeLayout>
        )
    }
}

export default BookAdd