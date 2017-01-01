import 'whatwg-fetch'

export function getBoard(id) {
  const init = {
    credentials: 'same-origin'
  }
  return fetch(`/api/boards/${id}`, init)
    .then(response => response.json())
    .then(json => json)
}

export function createTask(csrfToken, columnId, task) {
  const data = new FormData()
  data.append('column_id', columnId)
  for (let key in task) {
    data.append(`task[${key}]`, task[key])
  }
  const init = {
    headers: { 'X-CSRF-Token': csrfToken },
    credentials: 'same-origin',
    method: 'POST',
    body: data
  }
  return fetch('/api/tasks', init)
    .then(response => response.json())
    .then(json => json)
}

export function updateTask(csrfToken, columnId, id, task) {
  const data = new FormData()
  for (let key in task) {
    data.append(`task[${key}]`, task[key])
  }
  const init = {
    headers: { 'X-CSRF-Token': csrfToken },
    credentials: 'same-origin',
    method: 'PUT',
    body: data
  }
  return fetch(`/api/tasks/${id}`, init)
}

export function destroyTask(csrfToken, id) {
  const init = {
    headers: { 'X-CSRF-Token': csrfToken },
    credentials: 'same-origin',
    method: 'DELETE'
  }
  return fetch(`/api/tasks/${id}`, init)
}

export function dropTask(csrfToken, id, columnId, index) {
  const data = new FormData()
  data.append('id', id)
  data.append('column_id', columnId)
  data.append('position', index)
  const init = {
    headers: { 'X-CSRF-Token': csrfToken },
    credentials: 'same-origin',
    method: 'PUT',
    body: data
  }
  return fetch(`/api/tasks/${id}/position`, init)
}
