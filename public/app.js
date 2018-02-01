document.addEventListener("DOMContentLoaded", function(event) {
  // console.log("DOM fully loaded and parsed");
  initLazyLoading()
  startLogoAnimation()
  activateScrollListener()
  activateSectionTogglers()
  activatePictureTogglers()
});

let logoAnimation = undefined

function getNameLetters() {
  return Array.from(document.getElementsByClassName('name')[0].children)
}

function startLogoAnimation(time, letterIndex) {
  let nameLetters = getNameLetters()
  let curTime = Date.now()
  logoAnimation = requestAnimationFrame(() => {revealLetters(curTime, nameLetters, 0)})
}

// timing for animation triggers in MS
let animationIntervals = [100, 300, 300, 300, 250, 200, 200, 100]

function revealLetters(prevTime, nameLetters, curLetterIndex) {
  // first, check if all the letters have been animated
  if (curLetterIndex === (nameLetters.length)) {
    // if so, cancel animations
    console.log('fries are done');
    window.cancelAnimationFrame(logoAnimation)
    window.sessionStorage.setItem('afrydevLogoAnimationTriggered', "true")
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
  // get dom nodes from projectScreenshot section
  let screenshotAreas = getSection('projectArea__projectScreenshot')

  // get the images in that section
  let screenShotImages = screenshotAreas.map(screenshotArea => {
    return Array.from(screenshotArea.children).filter((elem) => {
      return elem.className.indexOf('projectArea__img') > -1
    })
  })
  // get the navigator controls in that section
  let screenShotNavigators = screenshotAreas.map(screenshotArea => {
    return Array.from(screenshotArea.children).filter(elem => elem.className.indexOf('screenshotNavigation') > -1)
  })
  // loop through screenshot navigator controls
  screenShotNavigators.forEach((navigatorSet, pictureSet) => {
    // assign appropriate listener to each button to scroll between images
    Array.from(navigatorSet[0].children).forEach((button, buttonIndex) => {
      let left = 0
      let right = 1
      button.addEventListener('click', () => {
        console.log('clicking a pic scroller');
        if (buttonIndex === right) {
          scrollPictures(screenShotImages[pictureSet], 'right')
        }
        if (buttonIndex === left) {
          scrollPictures(screenShotImages[pictureSet], 'left')
        }
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
  let projectDescriptionAreas = getSection('projectArea__projectDescription')
  let descriptionSelectors = projectDescriptionAreas.map(project => {
    return Array.from(project.children[0].children)
  })
  let descriptionPanels = projectDescriptionAreas.map(project => {
    return Array.from(project.children[1].children)
  })
  addEventListeners(descriptionSelectors, descriptionPanels)
}

function getSection(className){
  return Array.from(document.getElementsByClassName(className))
}

function addEventListeners(selectorsArray, descriptionPanels) {
  selectorsArray.forEach((group, arrIndex) => {
    group.forEach((selector, selIndex) => {
      selector.addEventListener('click', () => {
        console.log('clicking a section selector');
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

function initLazyLoading(){
  (function() {
    // Initialize
    var bLazy = new Blazy({
        loadInvisible: true,
        success: function(ele){
          console.log('loaded', ele);
            // Image has loaded
            // Do your business here
        }
      , error: function(ele, msg){
            if(msg === 'missing'){
                // Data-src is missing
            }
            else if(msg === 'invalid'){
                // Data-src is invalid
            }
        }
    });
  })()
}
