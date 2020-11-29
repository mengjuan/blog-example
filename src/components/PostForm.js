import React ,{Component} from 'react'
import { Editor } from 'react-draft-wysiwyg'
import {EditorState, ContentState,convertToRaw} from 'draft-js'

import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class PostForm extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        textTitle: ''
    }

    constructor(props) {
        super(props);
        let editorState;
        let textTitle;

        if(props.post){
            textTitle = props.post.title;
            const contentBlock = htmlToDraft(props.post.body);
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            editorState = EditorState.createWithContent(contentState);

        }else{
            editorState = EditorState.createEmpty();
        }
        this.state = {editorState,textTitle:textTitle};
    }

    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState
        })
    }

    changeTitle = (e) =>{
        this.setState({
            textTitle: e.target.value
        })
    }

    onCancel = ()=>{
        this.props.history.push('/');
    }

    onSubmit = ()=>{
        const { editorState, textTitle } = this.state;

        const title= textTitle;
        const body = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        // console.log("the title is ",title," the body is ",body)
        axios.post("http://47.104.167.167/blog-service/api/articles",{
            activeflag: 'Y',
            author:'xuhu',
            catagroy: 'java',
            title: title,
            content: body
        }).then(res =>{
            this.props.history.push('/');
        }).catch(error=>{
            console.log("error: ",error);
        })

    }

    render(){
        return (
            <div>
                <div className="container">
                    <h4 className="center">New Post</h4>
                     
                     {/* <label>
                        Pick your favorite flavor:
                        <select className='browser-default' value={this.state.value} onChange={this.handleChange}>
                            <option value="grapefruit">Grapefruit</option>
                            <option value="lime">Lime</option>
                            <option value="coconut">Coconut</option>
                            <option value="mango">Mango</option>
                        </select>
                    </label> */}
                   

                    <input value={this.state.textTitle} onChange={this.changeTitle} placeholder="Enter title here"/>
                    
                    <Editor 
                        editorState={this.state.editorState}
                        wrapperClassName=""
                        editorClassName=""
                        onEditorStateChange={this.onEditorStateChange}
                        />
                    
                    <div className="center">
                        <button className="btn blue" onClick={this.onSubmit}>Save</button>
                        <span>        </span>
                        <button className="btn blue" onClick={this.onCancel}>Cancel</button>
                    </div>
                    {/* <div className = "row">
                        <form className = "col s12">
                            <div className = "row">                      
                                <div className = "input-field col s6">      
                                    <label htmlFor = "title">Title</label>
                                    <input id = "title" type = "text"  className = "validate" required />          
                                </div>
                            </div>
                        </form>   
                    </div> */}


                </div>
            </div>

        )
    }
}

export default withRouter(PostForm)