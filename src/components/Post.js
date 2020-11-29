import React, { Component } from 'react'
import axios from 'axios'
import renderHTML from 'react-render-html';
import { confirmAlert } from 'react-confirm-alert'
import {withRouter} from 'react-router-dom'

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

    deletePost = ()=>{
        let id = this.props.match.params.post_id;
        confirmAlert({
            message: 'Are you sure to delete the post?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: ()=>{
                        axios.delete("http://47.104.167.167/blog-service/api/articles/"+id)
                        .then(res=> {
                           this.props.history.push('/');
                       })
                    }
                },
                {
                    label: 'No',
                    onClick: ()=>{}
                }
            ]
        })
    }

    editPost = ()=>{
        const eidtRoute = "/editPost/"+this.props.match.params.post_id;

        this.props.history.push(eidtRoute);
    }

    render(){
       return (
        <div className="container">
            <h4 className="center">{this.state.title}</h4>
            <div>{renderHTML(this.state.body)}</div>
            <div className="center">
                <button className="btn-flat blue" onClick={this.editPost}>Edit</button>
                <span> </span>
                {/* <button className="btn-flat grey" onClick={this.deletePost}>Delete</button> */}
            </div>
        </div>
       )

    }
}

export default withRouter(Post)