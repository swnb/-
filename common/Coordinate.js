/*
 * @version: 
 * @Author: chenbh
 * @Date: 2021-02-08 22:39:21
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-18 11:33:40
 */
function Coordinate(wrapper, width, height) {
  width = width || 400;
  height = height || width;
  let canvas = document.createElement('canvas');
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  this.wrapper = wrapper;
  this.wrapper.classList.add('wrapper');
  this.wrapper.append(canvas);
  this.canvas = {
    main: canvas,
  }
  let margin = 60;

  canvas.style.marginLeft = margin + 'px';
  canvas.style.marginBottom = margin + 'px';

  let ctx = canvas.getContext("2d");
  let halfWidth = width / 2;
  let halfHeight = height / 2;

  this.margin = margin;
  this.width = width;
  this.height = height;
  this.ctx = ctx;
  this.halfWidth = halfWidth;
  this.halfHeight = halfHeight;
  this.scaleLength = 4;

  this.drawAxis();
}

Coordinate.prototype = {
  drawAxis() {
    let lineWidth = 1;
    let axisxMargin = 20;
    this.axisxMargin = axisxMargin;
    let color = 'rgba(0, 0, 0, 0.8)';
    let canvasAxisX = document.createElement('canvas');
    canvasAxisX.classList.add('axis', 'axis-x');
    canvasAxisX.setAttribute('width', this.width + 2 * axisxMargin)
    canvasAxisX.setAttribute('height', this.margin)
    canvasAxisX.style.top = this.height + 'px';
    canvasAxisX.style.left = (this.margin - axisxMargin) + 'px';
    let axisX = canvasAxisX.getContext('2d');

    let canvasAxisY = document.createElement('canvas');
    canvasAxisY.classList.add('axis', 'axis-y');
    canvasAxisY.setAttribute('width', this.margin)
    canvasAxisY.setAttribute('height', this.height)
    let axisY = canvasAxisY.getContext('2d');

    this.canvas.axisX = canvasAxisX;
    this.canvas.axisY = canvasAxisX;
    this.axisX = axisX;
    this.axisY = axisY;

    let margin = this.margin;
    let width = this.width;
    let height = this.height;

    let n = 10;

    axisX.beginPath();
    axisX.strokeStyle = color;
    axisX.lineWidth = lineWidth;
    let w = axisxMargin;
    let dw = width / n;
    for (let i = 0; i <= n; i++) {
      axisX.moveTo(w, 0);
      axisX.lineTo(w, this.scaleLength);
      axisX.stroke();
      w += dw;
    }

    axisY.beginPath();
    axisY.strokeStyle = color;
    axisY.lineWidth = lineWidth;
    let h = 0;
    let dh = height / n;
    for (let i = 0; i <= n; i++) {
      axisY.moveTo(margin, h);
      axisY.lineTo(margin - this.scaleLength, h);
      axisY.stroke();
      h += dh;
    }

    this.wrapper.append(canvasAxisX);
    this.wrapper.append(canvasAxisY);
  },
  setScale(minX, minY, maxX, maxY) {
    let N = 5;
    let marginX = (maxX - minX) / N;
    let marginY = (maxY - minY) / N;
    this.minX = minX - marginX;
    this.minY = minY - marginY;
    this.maxX = maxX + marginX;
    this.maxY = maxY + marginY;

    let axisX = this.axisX;
    let axisY = this.axisY;
    // 更新坐标轴
    // 清除 旧的文字
    axisX.clearRect(0, this.scaleLength + 12, this.width + 2 * this.axisxMargin, this.margin);
    axisY.clearRect(0, 0, this.margin - this.scaleLength, this.height);
    // 填充 新的坐标文字
    let fontSize = 10;
    let n = 10;

    let w = 0;
    let dw = this.width / n;
    axisX.fillStyle = 'rgba(0,0,0,0.6)';
    for (let i = 0; i <= n; i++) {
      axisX.beginPath();
      axisX.font = `${fontSize}px Georgia`;
      let text = this.w2x(w).toFixed(2);
      let x = w;
      let y = this.scaleLength + 24;
      axisX.fillText(text, x, y);
      w += dw;
    }

    let h = 0;
    let dh = this.height / n;
    axisY.fillStyle = 'rgba(0,0,0,0.6)';
    for (let i = 0; i <= n; i++) {
      axisY.beginPath();
      axisY.font = `${fontSize}px Georgia`;
      let _h = h;
      if (i === 0) _h += fontSize;
      else if (i !== n) _h += fontSize / 2;
      axisY.fillText(this.h2y(h).toFixed(2), this.margin - this.scaleLength - 40, _h);
      h += dh;
    }
  },
  x2w(x) {
    return Math.round(this.width * (x - this.minX) / (this.maxX - this.minX));
  },
  y2h(y) {
    let height = this.height - 1;
    return h = height - Math.round(height * (y - this.minY) / (this.maxY - this.minY));
  },
  w2x(w) {
    return (w / this.width) * (this.maxX - this.minX) + this.minX;
  },
  h2y(h) {
    return -(h / this.height) * (this.maxY - this.minY) + this.maxY;
  },
  text(x, y, text, fontSize = 12, color = '#000000') {
    let ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.font = `${fontSize}px Georgia`;
    ctx.fillText(text, this.x2w(x), this.y2h(y));
  },
  point(x, y, size = 1, color = '#000000') {
    let ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x2w(x), this.y2h(y), size, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  },
  scatter(data, size = 1, color = '#000000') {
    data.forEach(value => {
      this.point(value[0], value[1], size, color);
    });
  },
  line(f, lineWidth = 1, color = '#000000') {
    let yMinX = f(this.minX);
    let yMaxX = f(this.maxX);

    let ctx = this.ctx;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(this.x2w(this.minX), this.y2h(yMinX));
    ctx.lineTo(this.x2w(this.maxX), this.y2h(yMaxX));
    ctx.stroke();
  },
  curve(f, color = '#000000') {
    let ctx = this.ctx;
    let colorArray = convertToArray(color);
    let imageData = ctx.getImageData(0, 0, this.width, this.height);
    let data = imageData.data;
    let lastY;
    for (let w = 0; w < this.width; w++) {
      let x = this.w2x(w);
      y = f(x);
      if (!Array.isArray(y)) y = [y];
      for (let value of y) {
        if (Number.isNaN(value)) continue;
        let h = this.y2h(value);
        let index = 4 * (h * this.width + w);
        for (let j = 0; j <= 3; j++) data[index + j] = colorArray[j];

        let hDiffMin = Infinity;
        let closestH;
        if (lastY) {
          for (let lastValue of lastY) {
            if (Number.isNaN(lastValue)) continue;
            let lastH = this.y2h(lastValue);
            let hDiff = Math.abs(h - lastH);
            if (hDiff < hDiffMin) {
              hDiffMin = hDiff;
              closestH = lastH;
            }
          }
          if (closestH === undefined) continue;
          if (hDiffMin <= 1) continue;
          let _index;
          if (closestH < h) {
            for (let _h = closestH + 1; _h < h; _h++) {
              if (2 * _h < closestH + h) {
                _index = 4 * (_h * this.width + w - 1);
              } else {
                _index = 4 * (_h * this.width + w);
              }
              for (let j = 0; j <= 3; j++) data[_index + j] = colorArray[j];
            }
          } else {
            for (let _h = closestH - 1; _h > h; _h--) {
              if (2 * _h > closestH + h) {
                _index = 4 * (_h * this.width + w - 1);
              } else {
                _index = 4 * (_h * this.width + w);
              }
              for (let j = 0; j <= 3; j++) data[_index + j] = colorArray[j];
            }
          }
        }
      }
      lastY = y;
    }
    ctx.putImageData(imageData, 0, 0);
    imageData = null;
  },
  curve2(F, color = '#000000') {
    color = convertToArray(color);
    let ctx = this.ctx;
    let imageData = ctx.getImageData(0, 0, this.width, this.height);
    let data = imageData.data;
    let index;
    let drawn = Array(data.length / 4);
    let FxyIsCloser;
    for (let w = 1; w < this.width; w++) {
      let _x = this.w2x(w - 1);
      let x = this.w2x(w);
      for (let h = 1; h < this.height; h++) {
        let _y = this.h2y(h - 1);
        let y = this.h2y(h);
        let F_xy = F(_x, y);
        let Fx_y = F(x, _y);
        let Fxy = F(x, y);
        if (F_xy * Fxy <= 0) {
          FxyIsCloser = Math.abs(F_xy) > Math.abs(Fxy);
          if (F_xy === 0 || !FxyIsCloser) {
            index = h * this.width + w - 1;
            if (!drawn[index]) for (let j = 0; j <= 3; j++) data[4 * index + j] = color[j];
            drawn[index] = true;
          }
          if (Fxy === 0 || FxyIsCloser) {
            index = h * this.width + w;
            if (!drawn[index]) for (let j = 0; j <= 3; j++) data[4 * index + j] = color[j];
            drawn[index] = true;
          }
        }
        if (Fx_y * Fxy <= 0) {
          FxyIsCloser = Math.abs(Fx_y) > Math.abs(Fxy);
          if (Fx_y === 0 || !FxyIsCloser) {
            index = (h - 1) * this.width + w;
            if (!drawn[index]) for (let j = 0; j <= 3; j++) data[4 * index + j] = color[j];
            drawn[index] = true;
          }
          if (Fxy === 0 || FxyIsCloser) {
            index = h * this.width + w;
            if (!drawn[index]) for (let j = 0; j <= 3; j++) data[4 * index + j] = color[j];
            drawn[index] = true;
          }
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
    imageData = null;
    drawn = null;
  },
  heatmap(data, minX = 0, minY = 0, maxX = 1, maxY = 1, contourCount = 0) {
    let ctx = this.ctx;
    let width = this.width;
    let height = this.height;

    this.setScale(minX, minY, maxX, maxY);

    if (data instanceof Function) {
      let _data = [];
      for (let h = 0; h < this.height; h++) {
        for (let w = 0; w < this.width; w++) {
          _data.push(data(this.w2x(w), this.h2y(h)));
        }
      }
      data = _data;
    }

    let scaleList = Array(contourCount).fill(undefined).map((_, i) => (i + 1) / (contourCount + 1));

    let min = data.reduce((min, value) => Math.min(min, value), Infinity);
    let max = data.reduce((max, value) => Math.max(max, value), -Infinity);
    let imageData = ctx.getImageData(0, 0, this.width, this.height);
    for (let h = 0; h < height; h++) {
      for (let w = 0; w < width; w++) {
        let index = h * width + w;
        let scale = (data[index] - min) / (max - min);
        let drawed = false;
        if (h > 0 && w > 0) {
          for (let _scale of scaleList) {
            let scaleCurrent = scale - _scale;
            let indexOfLeft = h * width + w - 1;
            let indexOfUp = (h - 1) * width + w;
            let scaleLeft = (data[indexOfLeft] - min) / (max - min) - _scale;
            let scaleUp = (data[indexOfUp] - min) / (max - min) - _scale;
            let scaleIsCloser;
            if (scaleLeft * scaleCurrent <= 0) {
              scaleIsCloser = Math.abs(scaleLeft) > Math.abs(scaleCurrent);
              if (Math.abs(scaleCurrent) <= 1E-4 || scaleIsCloser) {
                for (let j = 0; j <= 2; j++) imageData.data[4 * index + j] = 144;
                imageData.data[4 * index + 3] = 255;
                drawed = true;
              }
              if (Math.abs(scaleLeft) <= 1E-4 || !scaleIsCloser) {
                for (let j = 0; j <= 2; j++) imageData.data[4 * indexOfLeft + j] = 144;
                imageData.data[4 * indexOfLeft + 3] = 255;
              }
            }
            if (scaleUp * scaleCurrent <= 0) {
              scaleIsCloser = Math.abs(scaleUp) > Math.abs(scaleCurrent);
              if (Math.abs(scaleCurrent) <= 1E-4 || scaleIsCloser) {
                for (let j = 0; j <= 2; j++) imageData.data[4 * index + j] = 144;
                imageData.data[4 * index + 3] = 255;
                drawed = true;
              }
              if (Math.abs(scaleUp) <= 1E-4 || !scaleIsCloser) {
                for (let j = 0; j <= 2; j++) imageData.data[4 * indexOfUp + j] = 144;
                imageData.data[4 * indexOfUp + 3] = 255;
              }
            }
          }
        }
        if (drawed) {
          continue;
        }
        let red = parseInt(255 * scale)
        let blue = 255 - red;
        imageData.data[4 * index] = red;
        imageData.data[4 * index + 1] = 0;
        imageData.data[4 * index + 2] = blue;
        imageData.data[4 * index + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
    imageData = null;
  },
  getImageData() {
    return this.ctx.getImageData(0, 0, this.width, this.height);
  },
  putImageData(imageData) {
    this.ctx.putImageData(imageData, 0, 0);
  },
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
};