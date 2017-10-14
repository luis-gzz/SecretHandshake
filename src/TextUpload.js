import React, { Component } from 'react';
import './TextUpload.css';
import Button from 'muicss/lib/react/button';
import Textarea from 'muicss/lib/react/textarea';


class TextUpload extends Component {
    state = {
        post: "",
        key: ""
    };

    onChangePost(ev) {
        this.setState({post: ev.target.value});
    }

    onChangeKey(ev) {
        this.setState({key: ev.target.value});
    }

    onSubmit() {
        console.log("Submit")
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/newText", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            key: this.state.key,
            post: this.state.post
        }));

        this.setState({key:"",post:""});
    }


    render() {
        return (
            <div className="TextUpload">
            <Textarea
                value={this.state.key}
                onChange={this.onChangeKey.bind(this)}
                label="Secret Key!"
                floatingLabel={true}
                rows = {1}
            />

            <Textarea
                value={this.state.post}
                onChange={this.onChangePost.bind(this)}
                label="Text to save!"
                floatingLabel={true}
                rows = {10}
            />

            <Button onClick={this.onSubmit.bind(this)}
                    color="danger">Upload</Button>

            </div>);
    }
}

export default TextUpload;
