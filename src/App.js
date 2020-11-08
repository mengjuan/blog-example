import React , { Component }from 'react'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Post from './components/Post'
import PostForm from './components/PostForm'
import EditPost from './components/EditPost'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
           <Navbar />
           <Switch>
              <Route exact path="/"  component={Home}/>
              <Route path="/about"  component={About}/>
              <Route path="/contact"  component={Contact}/>
              <Route path="/newPost" component={PostForm}/>
              <Route path="/editPost/:post_id" component={EditPost}/>
              <Route path="/:post_id" component={Post}/>
           </Switch>


        </div>
      </BrowserRouter>

    )
  }

}

export default App;
