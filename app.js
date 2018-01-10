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

function getSectionToggles() {
  getProjectDescriptionArea()
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
