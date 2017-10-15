import React, { Component } from 'react';
import './PostRetrieval.css';
import Button from 'muicss/lib/react/button';
import Textarea from 'muicss/lib/react/textarea';


class PostRetrieval extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: "",
            key: "",
            response:""
        };
    }

    componentWillMount() {
        if (this.state.response !== "") {
            this.downloadFiles();
        }
    }

    onChangePost(ev) {
        this.setState({post: ev.target.value});
    }

    onChangeKey(ev) {
        this.setState({key: ev.target.value});
    }

    downloadFiles() {


    }

    onSubmit() {
        console.log("Submit")
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/retrieve", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            key: this.state.key
        }));

        if (xhr.readyState === 4)
            if (xhr.status === 200)
                var json_data = xhr.responseText;

        this.setState({key:"",post:"", response: json_data});
    }

    render() {
        return (
            <div className="TextUpload">
            <Textarea
                value={this.state.key}
                onChange={this.onChangeKey.bind(this)}
                label="Your key?"
                floatingLabel={true}
                rows = {1}
            />

            <Button onClick={this.onSubmit.bind(this)}
                    color="danger">Retrieve</Button>

            </div>);
    }
}

export default  PostRetrieval;
