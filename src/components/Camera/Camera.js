import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Camera.scss';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';
import * as loadImage from 'blueimp-load-image';

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
      },
      croppedImageUrl: '',
    };
    this.example = '';
    this.imageRef = '';
    this.fileUpload = this.fileUpload.bind(this);
    this.turnToText = this.turnToText.bind(this);
  }

  fileUpload(ev) {
    const uploaded = ev.target.files;

    if (uploaded && uploaded.length) {
      loadImage(uploaded[0], (canvas) => {
        this.setState({
          src: canvas.toDataURL(),
        });
      }, { maxWidth: '100%', orientation: true });
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
      this.image = canvas;
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
          imgData = reader.result.split(',')[1];
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
    const { history, addMemoBtnClick } = this.props;
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

    if (Object.keys(textDetectionResponse.data.responses[0]).length) {
      const detectedText = textDetectionResponse.data.responses[0].fullTextAnnotation.text;
      const { sendEditingState } = this.props;

      sendEditingState(true);
      addMemoBtnClick(detectedText);
      history.push('/memo');
    } else {
      window.alert('인식된 텍스트가 없습니다. 다시 선택해주세요 :)');
    }
  }

  render() {
    const { src, crop } = this.state;
    return (
      <div className="imgUpload">
        <div className="filebox">
          <label htmlFor="fileButton" className="cameraButton greenbtn">
            Upload your page
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
            : null
        }
        </div>
        <button className="bookmark greenbtn" type="submit" onClick={this.turnToText}>
          Save the sentences
        </button>
      </div>
    );
  }
}

export default Camera;

Camera.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  addMemoBtnClick: PropTypes.func,
  sendEditingState: PropTypes.func,
};
