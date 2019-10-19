let data = [
   {'id': 1, 'npp': 1, 'user': 'Иван Петров', 'task': 'Отправить письмо заказчику', 'date': '01-11-2019'},
   {'id': 2, 'npp': 2, 'user': 'Петр Иванов', 'task': 'Получить оплату по проекту', 'date': '03-11-2019'},
   {'id': 3, 'npp': 3, 'user': 'Василий Сергеев', 'task': 'Согласовать стадию П', 'date': '01-11-2019'},
   {'id': 4, 'npp': 4, 'user': 'Иван Петров', 'task': 'Дать ответ на письмо', 'date': '03-11-2019'},
   {'id': 5, 'npp': 5, 'user': 'Петр Иванов', 'task': 'Выдать зарплату', 'date': '10-11-2019'}
];

let tbody = document.querySelector('tbody')

  function download(data) {
    tbody.innerHTML = ''
    for(let i = 0; i < data.length; i++) {
      let tr = document.createElement('tr')
      tr.setAttribute('draggable',true) 
      
      tbody.appendChild(tr)
      for(let key in data[i]) {
        let td = document.createElement('td')
        if(key !== 'id') {
          tr.appendChild(td)
          td.textContent = data[i][key]
        } else if(key === 'id') {
          tr.setAttribute('id', data[i][key])
        }
      }
      tr.addEventListener('dragstart', handleOnStart)
      tr.addEventListener('dragover', handleOnDragOver)
      tr.addEventListener('drop', handleOnDrop )
    }
  };

download(data)

function handleOnStart(dragevent) {
  dragevent.dataTransfer.setData("Text", dragevent.target.id)
}

function handleOnDragOver(event) {
  event.preventDefault()
}

function handleOnDrop(dropevent) {
  let idDraggedTask = dropevent.dataTransfer.getData("Text")
  let indexDraggedTask = data.findIndex(el => el.id == idDraggedTask) 
  let indexDropTask = data.findIndex(el => el.id == dropevent.currentTarget.id)
  let addObj = data.find(el => el.id == idDraggedTask)
  
  if(indexDropTask === indexDraggedTask || indexDropTask > indexDraggedTask) {
    data.splice(indexDropTask + 1, 0, addObj) // add dragObj
    data.splice(indexDraggedTask, 1) // remove dragElement
  } else if(indexDraggedTask > indexDropTask) {
    data.splice(indexDropTask, 0, addObj) // add dragObj
    data.splice(indexDraggedTask + 1, 1) // remove dragElement
  }
  data.forEach((el,i) => el.npp = i+1)
  download(data)
}