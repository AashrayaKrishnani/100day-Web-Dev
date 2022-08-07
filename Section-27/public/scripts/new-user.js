const imagePreviewElement = document.getElementById("image-preview");
const fileUploadElement = document.getElementById("image");

fileUploadElement.addEventListener("change", function (event) {
  const files = fileUploadElement.files;

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }

  const userImage = files[0];
  imagePreviewElement.src = URL.createObjectURL(userImage);
  imagePreviewElement.style.display = "inline";
});
