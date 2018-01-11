window.onload = function(){
  getSectionToggles()
}

function toArray(entries) {
  let arr = []
  for (let node of entries) {
   arr.push(node)
  }
  return arr
}

function activatePictureTogglers(){
  getSection('.projectArea__projectScreenshot')
    .then(screenshotAreas => {
      let screenShotImages = screenshotAreas.map(screenshotArea => {
        return toArray(screenshotArea.children).filter(elem => elem.tagName === "IMG")
      })
      let screenShotNavigators = screenshotAreas.map(screenshotArea => {
        return toArray(screenshotArea.children).filter(elem => elem.tagName === "DIV")
      })
      screenShotNavigators = [].concat.apply([], screenShotNavigators)
      screenShotNavigators.forEach((navigatorSet, pictureSet) => {
        toArray(navigatorSet.children).forEach((button, buttonIndex) => {
          let left = 0
          let right = 1
          button.addEventListener('click', () => {
            if (buttonIndex === right) {
              scrollPictures(screenShotImages[pictureSet], 'right')
            }
            if (buttonIndex === left) {
              scrollPictures(screenShotImages[pictureSet], 'left')
            }
          })
        })
      })
    })
}

function scrollPictures(picArray, direction) {
  let picArrayLen = picArray.length
  let currentPic = undefined
  let nextPic = undefined
  let currentPicFound = false;

  picArray.forEach((pic, index) => {
    if (pic.classList.contains('onTop') && currentPicFound === false) {
      currentPic = pic
      currentPicFound = true
      if (direction === 'right') {
        if (index === picArray.length - 1) {
          nextPic = picArray[0]
        } else {
          nextPic = picArray[index + 1]
        }
      }
      if (direction === 'left') {
        if (index === 0) {
          nextPic = picArray[picArrayLen - 1]
        } else {
          nextPic = picArray[index - 1]
        }
      }
      toggleClass('onBottom', currentPic)
      toggleClass('onTop', nextPic)
    }
  })
}

function toggleClass(className, element) {
  if (className === 'onTop') {
    element.classList.remove('onBottom');
    element.classList.add('onTop');
    return false;
  } else {
    element.classList.remove('onTop');
    element.classList.add('onBottom');
  }
}

function activateSectionTogglers() {
  getSection('.projectArea__projectDescription')
    .then(projectDescriptionAreas => {
      let descriptionSelectors = projectDescriptionAreas.map(project => {
        return toArray(project.children[0].children)
      })
      let descriptionPanels = projectDescriptionAreas.map(project => {
        return toArray(project.children[1].children)
      })
      addEventListeners(descriptionSelectors, descriptionPanels)
    })
}

function getChildren(items, index) {
  return items.map(item => {
    return { children: toArray(item.children), index: index }
  })
}

function getProjectDescriptionArea(){
  return new Promise((res, rej) => {
    let projectDescriptionArea = $('.projectArea__projectDescription')
      res(toArray(projectDescriptionArea))
  })
}

function addEventListeners(selectorsArray, descriptionPanels) {
  selectorsArray.forEach((group, arrIndex) => {
    group.forEach((selector, selIndex) => {
      selector.addEventListener('click', () => {
        if ( descriptionPanels[arrIndex][selIndex].classList.contains('onBottom')) {
          descriptionPanels[arrIndex][selIndex].classList.remove('onBottom')
          descriptionPanels[arrIndex][selIndex].classList.add('onTop')
          descriptionPanels[arrIndex].forEach((panel, index) => {
            if (index !== selIndex) {
              panel.classList.remove('onTop')
              panel.classList.add('onBottom')
            }
          })
        }
      })
    })
  })
}
