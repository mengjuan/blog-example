import React , {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import renderHTML from 'react-render-html'

class Home extends Component {
    state = {
        posts: []
    }

    componentDidMount(){
        axios.get('http://47.104.167.167/blog-service/api/articles')
             .then(res => {
                 this.setState({
                     posts: res.data
                 })
             })
    }

    render(){
        const posts = this.state.posts
        const postsList = posts.length ? (posts.map(post => {
            let postBody = post.content;
            if(postBody.length>300){
                postBody = postBody.substring(0,300)+"..."
            }
            
            return (
                <div className="post card" key={post.id}>
                    <div className="card-content">
            <Link to={"/"+post.id}><span className="card-title blue-text">{post.title}<font size="3">({post.entryDatetime})</font></span></Link>
                        <div>{renderHTML(postBody)}</div>
                    </div>
                </div>
            )

        })): (<div className="center">No posts to show</div>)

        return (
            <div>
                <div className="container">
                <button className="btn right blue" onClick={(event)=>{this.props.history.push("/newPost")}}>New Post</button>
                    <h4 className="center">Home</h4>
                    {postsList}
    
                </div>
            </div>
    
        )
    }
}


export default Home