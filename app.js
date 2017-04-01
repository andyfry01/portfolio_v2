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
