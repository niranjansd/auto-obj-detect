// const { canvas } = require("../../../examples-nodejs/commons");

var slideIndex = 0;

async function onSelectedImageChanged(uri) {
  const img = await faceapi.fetchImage(uri)
  // $(`#inputImg`).get(0).src = img.src
  // $(`#inputMultipleImg`).get(0).src = img.src
  $(`#sliderImg`).get(0).src = img.src
  // updateSliderResults()
  updateResults()
}

async function LoadNthImg(n) {
  if (images.length == 1) {
    n = 0;
    return
  }
  // if (n >= images.length) {
  //   while (n >= images.length) {
  //     // n -= imgFolder.length;
  //     n = n - images.length;
  //   }
  //   return
  // }
  if (n >= images.length) {
    // n -= imgFolder.length;
    n = images.length - 1;
    return
  }
  else if (n < 0) {
    // n += imgFolder.length;
    n = 0;
    return
  }
  console.log(n)
  slideIndex = n
  $(`#sliderImg`).get(0).src = images[n].src
  // updateSliderResults()
  updateResults()
}

async function LoadIthImg(n) {
  console.log(n)
  // console.log(slideIndex + n)
  LoadNthImg(slideIndex + n)
}

async function loadImageFromUrl(url) {
  const img = await requestExternalImage($('#imgUrlInput').val())
  // $('#inputImg').get(0).src = img.src
  // $(`#inputMultipleImg`).get(0).src = img.src
  $(`#sliderImg`).get(0).src = img.src
  // updateSliderResults()
  updateResults()
}

async function loadImageFromUpload() {
  const imgFile = $('#queryImgUploadInput').get(0).files[0]
  const img = await faceapi.bufferToImage(imgFile)
  // $('#inputImg').get(0).src = img.src
  // $(`#inputMultipleImg`).get(0).src = img.src
  $(`#sliderImg`).get(0).src = img.src
  // updateSliderResults()
  updateResults()
}

// write a function to load a folder of images.
async function loadAllImagesFromFolder() {
  const imgFolder = $('#queryImgUploadFolderInput').get(0).files
  // console.log(imgFolder)
  // console.log(imgFolder[0])
  // console.log(imgFolder[1])
  var numFiles = imgFolder.length
  // console.log(numFiles)
  // var files = [...imgFolder].map(f => f.name)
  // let images = [...Array(numFiles).keys()].map(idx => files[idx])
  // var numFiles = files.length
  // console.log(files)
  // console.log(numFiles)
  // console.log([...Array(numFiles).keys()])
  // const img = await faceapi.bufferToImage(imgFolder)
  // let images = await [...Array(numFiles).keys()].map(idx => faceapi.bufferToImage(imgFolder[idx]))
  // var container = document.getElementById('inputMultipleImg');
  // for (var i = 0, j = imgs.length; i < j; i++) {
  //   const img = await faceapi.bufferToImage(imgFolder[i]);
  //   container.appendChild(img.src);
  // }

  // var images = []
  for (let i = 0; i < numFiles; i++) {
    const img = await faceapi.bufferToImage(imgFolder[i])
    images.push(img)
    // $('#inputImg').get(i).src = img.src;
    // $('#inputMultipleImg').get(i).src = img.src;
    // container.appendChild(img.src);
  }
  // console.log($(`#sliderImg`).get())
  $(`#sliderImg`).get(0).src = images[0].src
  // updateResults()
  // updateSliderResults()
  updateResults()
}

// // write a function to add class to the selected image.
function selectImage(elem) {
  // check if elem has class 'selected'
  // if yes, remove class 'selected'
  // if no, add class 'selected'
  console.log(elem)
  if (elem.classList.contains('selectedfordownload')) {
    elem.classList.remove('selectedfordownload')
  }
  else {
    elem.classList.add('selectedfordownload')
  }
  updateDownloadButton()
  console.log(elem)
}

// $(function(){
//   $("#faceToggle").click(function(){
//       $('#faceToggle').toggleClass('selectedfordownload right');
//   });
// });
// Define the function to update the download button
function updateDownloadButton() {
  faces = $('.selectedfordownload').get()
  downloadBtn = $('.download-btn').get()[0]
  // Check if at least one object is selected
  if (faces) {
    if (faces.length > 0){
      downloadBtn.disabled = false; // Enable the download button
    } else {
      downloadBtn.disabled = true; // Disable the download button
    }
  } else {
    downloadBtn.disabled = true; // Disable the download button
  }
}

var downloadFaces = function(){
  faces = $('.selectedfordownload').get()
  //download the canvas images in png format
  for (var i = 0; i < faces.length; i++) {
    canvas = faces[i].getElementsByTagName('canvas')[0];
    image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = faces[i].id+'.png';
    link.href = image;
    link.click();
  }
}

function renderImageSelectList(selectListId, onChange, initialValue, withFaceExpressionImages) {
  let images = [1, 2, 3, 4, 5].map(idx => `bbt${idx}.jpg`)

  if (withFaceExpressionImages) {
    images = [
      'happy.jpg',
      'sad.jpg',
      'angry.jpg',
      'disgusted.jpg',
      'surprised.jpg',
      'fearful.jpg',
      'neutral.jpg'
    ].concat(images)
  }

  function renderChildren(select) {
    images.forEach(imageName =>
      renderOption(
        select,
        imageName,
        imageName
      )
    )
  }

  renderSelectList(
    selectListId,
    onChange,
    initialValue,
    renderChildren
  )
}

function initImageSelectionControls(initialValue = 'bbt1.jpg', withFaceExpressionImages = false) {
  renderImageSelectList(
    '#selectList',
    async (uri) => {
      await onSelectedImageChanged(uri)
    },
    initialValue,
    withFaceExpressionImages
  )
  onSelectedImageChanged($('#selectList select').val())
}