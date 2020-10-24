import React, { Component } from 'react'
import axios from 'axios'

class Post extends Component{
    state = {
        title: '',
        body: ''
    }

    componentDidMount(){
        let id = this.props.match.params.post_id;
        axios.get('https://jsonplaceholder.typicode.com/posts/'+id)
             .then(res => {
                 this.setState({
                     title: res.data.title,
                     body: res.data.body
                 })
             })
      
    }

    render(){
       return (
        <div className="container">
            <h4 className="center">{this.state.title}</h4>
            <p>{this.state.body}</p>
        </div>
       )

    }
}

export default Post