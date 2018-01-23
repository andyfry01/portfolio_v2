window.onload = function(){
  startLogoAnimation()
  activateSectionTogglers()
  activatePictureTogglers()
  activateScrollListener()
}

function toArray(entries) {
  let arr = []
  for (let node of entries) {
   arr.push(node)
  }
  return arr
}

let logoAnimation = undefined

function getNameLetters() {
  return document.getElementsByClassName('name')[0].children
}

function startLogoAnimation(time, letterIndex) {
  let nameLetters = getNameLetters()
  let curTime = Date.now()
  logoAnimation = requestAnimationFrame(() => {revealLetters(curTime, nameLetters, 0)})
}

// timing for animation triggers in MS
let animationIntervals = [100, 500, 300, 300, 500, 200, 200, 450]

function revealLetters(prevTime, nameLetters, curLetterIndex) {
  // first, check if all the letters have been animated
  if (curLetterIndex === (nameLetters.length)) {
    // if so, cancel animations
    console.log('fries are done');
    window.cancelAnimationFrame(logoAnimation)
    return false;
  }
  // get interval between last animation request frame and this frame
  let curTime = Date.now()
  // if the right amount of time has passed, trigger fadein animation for this letter
  if (curTime - prevTime > animationIntervals[curLetterIndex]) {
    nameLetters[curLetterIndex].classList.add('fadeIn')
    // increment letter index to set up animation for next letter
    logoAnimation = requestAnimationFrame(() => {revealLetters(curTime, nameLetters, curLetterIndex + 1)})
  } else {
    // else, wait until correct amount of time has passed
    logoAnimation = requestAnimationFrame(() => {revealLetters(prevTime, nameLetters, curLetterIndex)})
  }
}

function activateScrollListener(){
  window.addEventListener('scroll', handleScroll, true)
}

function handleScroll() {
  throttle(activateAnimation('portfolio', 'fadeIn'), 100)
}

function throttle(fn, wait) {
  let time = Date.now();
  return function() {
    if ((time + wait - Date.now()) < 0) {
      fn();
      time = Date.now();
    }
  }
}

function activateAnimation(className, animationName) {
  let elem = document.getElementsByClassName(className)[0]
  if (elem.getBoundingClientRect().top <= window.scrollY) {
    toggleClass('hidden', animationName, elem)
    window.removeEventListener('scroll', handleScroll, true)
  }
}

function activatePictureTogglers(){
  getSection('.projectArea__projectScreenshot')
    .then(screenshotAreas => {
      let screenShotImages = screenshotAreas.map(screenshotArea => {
        return Array.from(screenshotArea.children).filter(elem => elem.tagName === "IMG")
      })
      let screenShotNavigators = screenshotAreas.map(screenshotArea => {
        return Array.from(screenshotArea.children).filter(elem => elem.tagName === "DIV")
      })
      screenShotNavigators = [].concat.apply([], screenShotNavigators)
      screenShotNavigators.forEach((navigatorSet, pictureSet) => {
        Array.from(navigatorSet.children).forEach((button, buttonIndex) => {
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
      toggleClass('onBottom', 'onTop', nextPic)
      toggleClass('onTop', 'onBottom', currentPic)
    }
  })
}

function toggleClass(oldClass, newClass, element) {
  element.classList.remove(oldClass);
  element.classList.add(newClass);
}

function activateSectionTogglers() {
  getSection('.projectArea__projectDescription')
    .then(projectDescriptionAreas => {
      let descriptionSelectors = projectDescriptionAreas.map(project => {
        return Array.from(project.children[0].children)
      })
      let descriptionPanels = projectDescriptionAreas.map(project => {
        return Array.from(project.children[1].children)
      })
      addEventListeners(descriptionSelectors, descriptionPanels)
    })
}

function getSection(className){
  return new Promise((res, rej) => {
    let projectDescriptionArea = $(className)
      res(Array.from(projectDescriptionArea))
  })
}

function addEventListeners(selectorsArray, descriptionPanels) {
  selectorsArray.forEach((group, arrIndex) => {
    group.forEach((selector, selIndex) => {
      selector.addEventListener('click', () => {
        let panel = descriptionPanels[arrIndex][selIndex]
        if (panel.classList.contains('onBottom')) {
          descriptionPanels[arrIndex].forEach((panel, index) => {
            if (index !== selIndex) {
              toggleClass('onTop', 'onBottom', panel)
            } else {
              toggleClass('onBottom', 'onTop', panel)
            }
          })
        }
      })
    })
  })
}
