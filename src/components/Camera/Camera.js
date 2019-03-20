import React, { Component, Fragment } from 'react';
import './Camera.scss';
import ReactCrop, {makeAspectCrop} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import 'firebase/auth';

class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
      croppedImageUrl: null,
      },
    };

    this.fileUpload = this.fileUpload.bind(this);
    this.turnToText = this.turnToText.bind(this);

    this.fileUrl = null;
    this.imageRef = null;
    // this.imgRef = React.createRef();
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
    this.imageRef = image;
    this.makeClientCrop(this.state.crop, pixelCrop);
  }

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  }

  onCropChange = (crop) => {
    this.setState({ crop });
  }

  getCroppedImg(image, pixelCrop, fileName) {
    console.log('getCroppedImg', { image, pixelCrop, fileName });
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

    canvas.toBlob((blob) => {
      blob.name = fileName;
      URL.revokeObjectURL(this.state.src);
      URL.revokeObjectURL(this.fileUrl);
      this.fileUrl = URL.createObjectURL(blob);
    }, 'image/jpeg');

    return this.fileUrl;
  }

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        'newFile.jpeg',
      );

      this.setState({ croppedImageUrl });
    }
  }

  turnToText() {
    debugger;
    // blob:http://localhost:3000/40e7c24e-0093-42e9-ae51-9f51e0e4bc70
    console.log(this.state.croppedImageUrl);
  }

  render() {
     const { croppedImageUrl } = this.state;
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
        {this.state.src
        ? (
          <ReactCrop
            src={this.state.src}
            crop={this.state.crop}
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
        <button type="submit" onClick={this.turnToText}>memo</button>
      </div>
    );
  }
}

export default Camera;
