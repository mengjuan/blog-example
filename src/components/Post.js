import React, { Component } from 'react'
import axios from 'axios'
import renderHTML from 'react-render-html';

class Post extends Component{
    state = {
        title: '',
        body: ''
    }

    componentDidMount(){
        let id = this.props.match.params.post_id;
        axios.get('http://47.104.167.167/blog-service/api/articles/'+id)
             .then(res => {
                 this.setState({
                     title: res.data.title,
                     body: res.data.content
                 })
             })
  
    }

    render(){
       return (
        <div className="container">
            <h4 className="center">{this.state.title}</h4>
            <p>{renderHTML(this.state.body)}</p>
            <div className="center">
                <button className="btn grey">Delete</button>
            </div>
        </div>
       )

    }
}

export default Post