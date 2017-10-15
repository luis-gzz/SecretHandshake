import React, { Component } from 'react';
import './ImageUpload.css';
import Dropzone from 'react-dropzone'
import Button from 'muicss/lib/react/button';
import Textarea from 'muicss/lib/react/textarea';

class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            uploadedFile: [],
            width: window.innerWidth,
            key:""
        };
    }


    onDrop(files) {
        this.setState({
            uploadedFile: files[0],
            key: this.state.key
        });
    }

    updateDimensions(e) {
       this.setState({width: Math.random()});
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions.bind(this))
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions.bind(this))
    }

    onChangeKey(ev) {
        this.setState({key: ev.target.value});
    }

    onSubmit() {
        if(this.state.key !== "" && this.state.uploadedFile.length !== 0) {
            console.log("Submit")

            let fileReader = new FileReader();
            let encodedImg = "empty";
            fileReader.readAsDataURL(this.state.uploadedFile);

            fileReader.onload = (fileLoadedEvent) => {
                encodedImg = fileLoadedEvent.target.result;
                console.log(this.state.key)

                let xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost:3000/newImage", true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify({
                    key: this.state.key,
                    image: encodedImg
                }));

                this.setState({key:"",uploadedFiles:[]});
            };
        } else if (this.state.key !== "" && this.state.uploadedFile.length === 0) {
            alert ("Please upload a file and try again");
            console.log(this.state.uploadedFile)
        } else if (this.state.key === "" && this.state.uploadedFile.length !== 0) {
            alert ("Please type a key and try again");
            console.log(this.state.uploadedFile)
        } else if (this.state.key === "" && this.state.uploadedFile.length === 0) {
            alert ("Please type a key, upload a file, and try again");
        }


    }

    render() {
        return (
            <div className="ImageUpload">
            <Textarea
                value={this.state.key}
                onChange={this.onChangeKey.bind(this)}
                label="Secret Key!"
                floatingLabel={true}
                rows = {1}
            />
            <p>No more than 250kb. Platform not optomized.</p>
            <div className="DropZone" >
                <Dropzone
                multiple={false}
                accept="image/*"
                onDrop={this.onDrop.bind(this)}
                style = {styleSheet.default}
                activeStyle = {styleSheet.active}
                rejectStyle = {styleSheet.rejected}
                >
                    {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                    if (isDragActive) {
                        return "File accepted.";
                    }
                    if (isDragReject) {
                        return "Try submitting an image file.";
                    }
                    return acceptedFiles.length || rejectedFiles.length ? `File Accepted` : "Drag or click to upload image files...";
                    }}
                </Dropzone>
            </div>
            <div className="btn" >
                <Button onClick={this.onSubmit.bind(this)} color="danger">Upload</Button>
            </div>

            </div>
        );
    }


}

let styleSheet = {
    rejected: {
      borderStyle: 'solid',
      borderColor: '#F73C3C',
      backgroundColor: '#eee'
    },
    disabled: {
      opacity: 0.5
    },
    active: {
      borderStyle: 'solid',
      borderColor: '#4780D1',
      backgroundColor: '#eee'
    },
    default: {
      width: window.innerWidth/5 - window.innerWidth/57,
      height: window.innerWidth/5 - window.innerWidth/57,
      borderWidth: 2,
      borderColor: 'black',
      borderStyle: 'dashed',
      borderRadius: 5,
      align: 'center'
  }
}



export default ImageUpload;
