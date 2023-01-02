async function onSelectedImageChanged(uri) {
  const img = await faceapi.fetchImage(uri)
  // $(`#inputImg`).get(0).src = img.src
  // $(`#inputMultipleImg`).get(0).src = img.src
  $(`#sliderImg`).get(0).src = img.src
  updateResults()
}

// function LoadNthImg(n) {
//   const imgFolder = $('#queryImgUploadFolderInput').get(0).files
//   const img = await faceapi.bufferToImage(imgFolder[n])
//   $(`#sliderImg`).get(0).src = img.src
//   updateResults()
// }

async function loadImageFromUrl(url) {
  const img = await requestExternalImage($('#imgUrlInput').val())
  // $('#inputImg').get(0).src = img.src
  // $(`#inputMultipleImg`).get(0).src = img.src
  $(`#sliderImg`).get(0).src = img.src
  updateResults()
}

async function loadImageFromUpload() {
  const imgFile = $('#queryImgUploadInput').get(0).files[0]
  const img = await faceapi.bufferToImage(imgFile)
  // $('#inputImg').get(0).src = img.src
  // $(`#inputMultipleImg`).get(0).src = img.src
  $(`#sliderImg`).get(0).src = img.src
  updateResults()
}

// write a function to load a folder of images.
async function loadAllImagesFromFolder() {
  const imgFolder = $('#queryImgUploadFolderInput').get(0).files
  // console.log(imgFolder)
  // console.log(imgFolder[0])
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
  var images = []
  for (let i = 0; i < numFiles; i++) {
    const img = await faceapi.bufferToImage(imgFolder[i])
    images.push(img)
    // $('#inputImg').get(i).src = img.src;
    // $('#inputMultipleImg').get(i).src = img.src;
  }
  // console.log($(`#sliderImg`).get())
  $(`#sliderImg`).get(0).src = images[0].src
  updateResults()
  return images
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