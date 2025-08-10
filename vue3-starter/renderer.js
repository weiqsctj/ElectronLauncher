const output = document.getElementById('output')

function start() {
  const button = event.target
  button.disabled = true
  button.innerText = '正在启动...'

  output.style.display = 'block'
  output.innerHTML += '正在启动服务...\n'

  window.electronAPI.startDevServer()
}

window.electronAPI.onOutput((data) => {
  output.innerHTML += data
  output.scrollTop = output.scrollHeight
})