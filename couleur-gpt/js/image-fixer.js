(() => {
  const application = Stimulus.Application.start();

  application.register("image-fixer", class extends Stimulus.Controller {
    static targets = [
      "download", "dropzone", "upload", "previewWrapper", "preview",
      "originalCanvas", "fixedCanvas", "slider", "sliderLine", "sliderHandle"
    ];

    connect() {
      this.dragging = false;
      document.addEventListener("mousemove", this.drag.bind(this));
      document.addEventListener("mouseup", this.endDrag.bind(this));
    }

    startDrag(event) {
      this.dragging = true;
    }

    drag(event) {
      if (!this.dragging) return;

      const rect = this.originalCanvasTarget.getBoundingClientRect();
      const offsetX = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
      const percent = (offsetX / rect.width) * 100;
      this.sliderTarget.value = percent;
      this.updateSlider();
    }

    endDrag() {
      this.dragging = false;
    }

    openFileInput() {
      this.uploadTarget.click();
    }

    highlightDropzone(event) {
      event.preventDefault();
      this.dropzoneTarget.style.backgroundColor = '#f0f0f0';
    }

    resetDropzone(event) {
      event.preventDefault();
      this.dropzoneTarget.style.backgroundColor = '';
    }

    handleDrop(event) {
      event.preventDefault();
      this.resetDropzone(event);
      const file = event.dataTransfer.files[0];
      if (file) this.handleUpload({ target: { files: [file] } });
    }

    handleUpload(e) {
      const file = e.target.files[0];
      if (!file) return;

      const img = new Image();
      const reader = new FileReader();
      reader.onload = (evt) => {
        img.src = evt.target.result;
      };

      img.onload = () => {
        const ratio = img.height / img.width;
        const maxWidth = Math.min(window.innerWidth * 0.9, 1020);
        const width = maxWidth;
        const height = maxWidth * ratio;

        [this.originalCanvasTarget, this.fixedCanvasTarget, this.previewTarget].forEach(canvas => {
          canvas.width = width;
          canvas.height = height;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
        });

        this.sliderLineTarget.style.height = `${height}px`;

        const ctxOriginal = this.originalCanvasTarget.getContext("2d");
        const ctxFixed = this.fixedCanvasTarget.getContext("2d");
        ctxOriginal.drawImage(img, 0, 0, width, height);

        const imgData = ctxOriginal.getImageData(0, 0, width, height);
        const data = imgData.data;

        const rScale = 0.975;
        const gScale = 0.985;
        const bScale = 1.075;

        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, Math.max(0, data[i] * rScale));     // Red
          data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * gScale)); // Green
          data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * bScale)); // Blue
        }

        ctxFixed.putImageData(imgData, 0, 0);
        this.downloadImage();

        this.sliderTarget.value = 50;
        this.updateSlider();

        this.previewTarget.removeAttribute("hidden");
      };

      reader.readAsDataURL(file);
    }

    updateSlider() {
      const value = this.sliderTarget.value;
      const width = this.originalCanvasTarget.width;
      this.fixedCanvasTarget.style.clipPath = `inset(0 0 0 ${value}%)`;
      this.sliderLineTarget.style.left = `${(value / 100) * width}px`;
      this.sliderHandleTarget.style.left = "50%";
    }

    downloadImage() {
      const dataURL = this.fixedCanvasTarget.toDataURL("image/png");
      this.downloadTarget.href = dataURL;
      this.downloadTarget.removeAttribute("hidden");
    }
  });
})();
