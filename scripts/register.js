function previewImage(event) {
    const reader = new FileReader();
    const imagePreview = document.getElementById('image-preview');
  
    
    reader.onload = function () {
      if (reader.readyState === 2) {
        imagePreview.src = reader.result;
        imagePreview.style.display = 'block';
      }
    }
  

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
    }
  }

