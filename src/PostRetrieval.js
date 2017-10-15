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

    componentDidMount() {


    }

    onChangePost(ev) {
        this.setState({post: ev.target.value});
    }

    onChangeKey(ev) {
        this.setState({key: ev.target.value});
    }

    download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }

    downloadFiles() {
        console.log("here")

        let userData = JSON.parse(this.state.response);


        console.log(userData.Key);
        this.download('Data.txt', userData.Key)
        this.setState({response:""})
    }

    onSubmit() {
        console.log("Submit")
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            var status = xhr.status;
            var data = xhr.responseText;
            //console.log(data);
            this.setState({key:"",post:"", response:data});
        }

        xhr.open("POST", "http://localhost:3000/retrieve", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            key: this.state.key
        }));


    }

    render() {
        if (this.state.response !== "") {

            this.downloadFiles();
        }

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
