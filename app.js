/**@function resizeContainer -  resizes the sections of the page with absolutely positioned parent containers
                                so those parents have the correct height
  @param {object} sections - the sections of the page that require resizing on page load
*/

function resizeContainer(sections){
  for (var section in sections){
    var container = document.getElementsByClassName(sections[section].container)[0]
    var child = document.getElementsByClassName(sections[section].child)[0]
    var childHeight = child.clientHeight
    container.setAttribute('height', childHeight)
  }
}

var sections = {
  0: {
    container: 'skillsContainer',
    child: 'skills'
  }
}
window.onload = function(){
  resizeContainer(sections)
}
