import React ,{Component} from 'react'
import { Editor } from 'react-draft-wysiwyg'
import {EditorState, ContentState,convertToRaw} from 'draft-js'

import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class EditPost extends Component {

    state = {
        editorState: EditorState.createEmpty(),
        textTitle: ''
    }

    constructor(props) {
        super(props);
        let editorState;
        let textTitle;
        const id = this.props.match.params.post_id;

        if(id){
            console.log("the post id is "+id);
            axios.get('http://47.104.167.167/blog-service/api/articles/'+id)
            .then(res => {
                this.setState({
                    textTitle: res.data.title,
                    editorState: EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(res.data.content)))
                })
            })
            // textTitle = props.post.title;
            // const contentBlock = htmlToDraft(props.post.body);
            // const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            // editorState = EditorState.createWithContent(contentState);

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
        this.props.history.push(`/${this.props.match.params.post_id}`);
    }

    onSubmit = ()=>{
        const { editorState, textTitle } = this.state;

        const title= textTitle;
        const body = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        // console.log("the title is ",title," the body is ",body)
        axios.post("http://47.104.167.167/blog-service/api/articles",{
            id: this.props.match.params.post_id,
            activeflag: 'Y',
            author:'xuhu',
            catagroy: 'java',
            title: title,
            content: body
        }).then(res =>{
            this.props.history.push(`/${this.props.match.params.post_id}`);
        }).catch(error=>{
            console.log("error: ",error);
        })

    }

    render(){
        return (
            <div>
                <div className="container">
                    <h4 className="center">Edit Post</h4>
                    <input value={this.state.textTitle} onChange={this.changeTitle} placeholder="Enter title here"/>
                    <Editor 
                        editorState={this.state.editorState}
                        wrapperClassName="rdw-dropdown-optionwrapper"
                        editorClassName="rdw-editor-main"
                        onEditorStateChange={this.onEditorStateChange}
                        />
                    
                    <div className="center">
                        <button className="btn blue" onClick={this.onSubmit}>Save</button>
                        <span>        </span>
                        <button className="btn blue" onClick={this.onCancel}>Cancel</button>
                    </div>

                </div>
            </div>

        )
    }
}

export default withRouter(EditPost)