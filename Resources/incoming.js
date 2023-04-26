const socket = io()
let name;

const textarea = document.querySelector('#textarea')
const messageArea = document.querySelector('.message__area')

const pressbtn = document.getElementById('#textarea');


do {

    // if(name==null){
    //     name="Anonymous_user"
    // }
    // else if(name==name){
    //     name = prompt('Please enter your name in the box or press OK to being anonymous ')
    //     break;
    // }
    name = prompt('Please enter your name in the box or press OK to being anonymous ')
} while(!name)


document.addEventListener('keydown', (event) => {
    if (event.key === '/') {
      event.preventDefault(); // prevent default '/' behavior
      textarea.focus(); // focus on the textarea element
    }
  });

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        sendMessage(e.target.value)
    }
})

function toggleTheme() {
    const themeStylesheet = document.getElementById('theme-style');
    const themeToggle = document.getElementById('theme-toggle');
    const linkedIcon = document.getElementById('dark_li');
    const gitIcon = document.getElementById('dark_gi');
  
    if (themeStylesheet.href.includes('style.css')) {
      // switch to dark theme
      themeStylesheet.href = 'light.css';
      linkedIcon.href = 'linked_dark.svg';
      gitIcon.href = 'github_dark.svg';
      themeToggle.textContent = 'Switch to Dark Theme';
    } else {
      // switch to default theme
      themeStylesheet.href = 'style.css';
      themeToggle.textContent = 'Switch to Light Theme';
    }
  }
  

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }
 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    // <h4>${msg.user}</h4------>Inside markup
    let markup = `
    <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}
 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
