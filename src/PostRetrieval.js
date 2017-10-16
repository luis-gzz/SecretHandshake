import React, { Component } from 'react';
import './PostRetrieval.css';
import Button from 'muicss/lib/react/button';
import Textarea from 'muicss/lib/react/textarea';
//import download from 'downloadjs';


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

    downloadTxt(filename, text) {
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
        //console.log("here")

        let userData = JSON.parse(this.state.response);


        if (userData.Key.substring(0,10) === "data:image"){
            let base64Image = userData.Key;
            let fileType = "";
            //console.log(userData.Key);
            if((userData.Key.substring(11,14)).toLowerCase() === "png"){
                fileType = "png";
            } else if((userData.Key.substring(11,14)).toLowerCase() === "gif"){
                fileType = "gif";
            } else if (((userData.Key.substring(11,14)).toLowerCase() === "jpg")
                    || ((userData.Key.substring(11,15)).toLowerCase() === "jpeg")) {
                fileType = "jpg";
            }
            console.log(base64Image);

            let link = document.createElement("a");
            link.download = "image." + fileType;
            link.href = base64Image;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } else {
            if (userData.Key === "") {
                alert('Enter a valid key');
            } else {
                this.downloadTxt('Data.txt', userData.Key)
            }

        }

        //console.log(userData.Key);

        this.setState({response:""})
    }

    onSubmit() {
        console.log("Submit")
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            //var status = xhr.status;
            var data = xhr.responseText;
            //console.log(data);
            if(data !== "") {
                this.setState({key:"",post:"", response:data});
            }

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
                    color="danger">Retrieve
            </Button>

            </div>);
    }
}

export default  PostRetrieval;
