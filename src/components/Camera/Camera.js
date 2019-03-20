import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Camera.scss';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: '',
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
        croppedImageUrl: '',
      },
      croppedImageUrl: '',
      detectedText: '',
    };

    this.imageRef = '';
    this.editText = this.editText.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.turnToText = this.turnToText.bind(this);
  }

  editText(ev) {
    const edited = ev.target.value;
    this.setState({
      detectedText: edited,
    });
  }

  fileUpload(ev) {
    const uploaded = ev.target.files;
    if (uploaded && uploaded.length) {
      const URL = window.URL || window.webkitURL;
      const imgURL = URL.createObjectURL(uploaded[0]);
      this.setState({ src: imgURL });
    }
  }

  onImageLoaded = (image, pixelCrop) => {
    const { crop } = this.state;
    this.imageRef = image;
    this.makeClientCrop(crop, pixelCrop);
  }

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  }

  onCropChange = (crop) => {
    this.setState({ crop });
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height,
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    });
  }

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg',
      ).then((blob) => {
        let imgData;
        const reader = new FileReader();
        reader.onloadend = () => {
          imgData = reader.result.split(",")[1];
          this.setState({
            croppedImageUrl: imgData,
          });
        };
        reader.readAsDataURL(blob);
        this.setState({
          croppedImageUrl: blob,
        });
      });
    }
  }

  async turnToText() {
    const { croppedImageUrl } = this.state;
    const url = 'https://vision.googleapis.com/v1';
    const key = 'AIzaSyBg53Ahf1eE4HgSkp_snfM-8Fs5qusTHcw';
    const textDetectionResponse = await axios.post(`${url}/images:annotate?key=${key}`, {
      requests: [
        {
          image: {
            content: croppedImageUrl,
          },
          features: [
            {
              type: 'TEXT_DETECTION',
            },
          ],
        },
      ],
    });

    this.setState({
      detectedText: textDetectionResponse.data.responses[0].fullTextAnnotation.text,
    });
  }

  render() {
    const { src, crop, detectedText } = this.state;
    return (
      <div className="imgUpload">
        <div className="filebox">
          <label htmlFor="fileButton" className="cameraButton">
            Click to snap sentences 😉
          </label>
          <input
            id="fileButton"
            onChange={this.fileUpload}
            type="file"
            label="Camera"
            accept="image/*;capture=camera"
          />
        </div>
        <div className="cropImg">
          {src
            ? (
              <ReactCrop
                src={src}
                crop={crop}
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
                renderSelectionAddon={this.renderSelectionAddon}
              />
            )
            : 'upload file'
        }
        </div>
        <button className="bookmark" type="submit" onClick={this.turnToText}>bookmark</button>
        <textarea className="textify" onChange={this.editText} value={detectedText} />
        <Link className="memo" to="/memo">memo</Link>
      </div>
    );
  }
}

export default Camera;
