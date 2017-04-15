/**@function resizeContainers -  resizes the sections of the page with absolutely positioned parent containers
                                so those parents have the correct height
  @param {object} sections -    the sections of the page that require resizing on page load
  @param {function} callback -  the positionContainer function, which positions the containers
                                after they've been resized
*/

function resizeContainers(sections, callback){
  for (var section in sections){
    var container = document.getElementsByClassName(sections[section].container)[0]
    var child = document.getElementsByClassName(sections[section].child)[0]
    var childHeight = child.clientHeight
    container.setAttribute('height', childHeight)
  }
  callback(containers)
}

/**@function positionContainer -  sets the "top" value of absolutely positioned containers
                                  to maintain their flow, called as a callback in resizeContainers
@param {object} sections -        the sections of the page that require resizing on page load
*/
function positionContainer(containers){
  for (var container in containers) {
    var index = parseInt(container);
    var nextIndex = index + 1;
    var refContainer = document.getElementsByClassName(containers[index])[0];
    var containerToPosition = document.getElementsByClassName(containers[nextIndex])[0];
    var refContainerBottom = refContainer.getClientRects()[0].bottom;
    if (containerToPosition) {
      containerToPosition.style.setProperty('top', refContainerBottom + "px")
    }
  }
}

var containers = {
  1: 'pageTopContainer',
  2: 'skillsContainer',
  3: 'projectsContainer'
}

var sections = {
  0: {
    container: 'skillsContainer',
    child: 'skills'
  }
}


window.onload = function(){
  resizeContainers(sections, positionContainer)
}
