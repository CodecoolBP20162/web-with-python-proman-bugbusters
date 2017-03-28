/* Drag and drop for coloumns, now alerts with placement
------------------------------------------------ */
$( function() {
  $( ".column" ).sortable({
    /* Position extracted here, and status
    ---------------------------------------*/
    stop: function (event, ui) {
        alert('New position: ' + ui.item.index());
        var parent = ui.item[0].parentNode;
        alert(parent.getAttribute('id'));
    },
    connectWith: ".column",
    handle: ".project",
    cancel: ".portlet-toggle",
    placeholder: "portlet-placeholder ui-corner-all"
  });

  $( ".project" )
    .find( ".project-content" )
      .prepend( "<span class='portlet-toggle'></span>");
});


/* Drag and drop main page
------------------------------------------------ */
var btn = document.querySelector('.add');
var remove = document.querySelector('.draggable');

function dragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function dragEnter(e) {
  this.classList.add('over');
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function dragDrop(e) {
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
  }
  /* Position extracted here
  -------------------------------------------------*/
  var obj = (this.parentNode.parentNode);
  alert($(obj).index())
}

function dragEnd(e) {
  var listItems = document.querySelectorAll('.draggable');
  [].forEach.call(listItems, function(item) {
    item.classList.remove('over');
  });
}

function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}

var listItems = document.querySelectorAll('.draggable');
[].forEach.call(listItems, function(item) {
  addEventsDragAndDrop(item);
});
