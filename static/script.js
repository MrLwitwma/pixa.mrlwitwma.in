const button = document.getElementById('send');
const userPrompt = document.getElementById('user-prompt');
const imageContainer = document.getElementById('images');

// User Settings Value
let bottomScroll = true;
let darkMode = false; 


function send_button_animation(){
    button.style.background = 'rgb(37, 204, 37)';
    button.style.scale = 0.91;
    setTimeout(function(){
        button.style.background = 'black';
        button.style.scale = 1;
    }, 500)
}
function sendData(){
    const promptValue = userPrompt.value
    if (promptValue.trim() !== ''){
        send_button_animation()
        sendRequest(promptValue)
    }
}
async function sendRequest(prompt) {
    if (prompt.trim() !== '') {
        userPrompt.textContent = '';
        const response = await fetch('/generate_image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `prompt=${encodeURIComponent(prompt)}`
        });
        const responseData = await response.json();
        displayImage(responseData.image, responseData.context, 'ai');
    }
}
function displayImage(image, context, sender) {
    const generated = document.createElement('div');
    generated.classList.add('content');
    // Create an image element
    const img = document.createElement('img');
    img.src = image;
    // Create a paragraph element for the description
    const description = document.createElement('p');
    description.textContent = context; // Assuming context contains the description
    // Append the image and description to the generated div
    generated.appendChild(img);
    generated.appendChild(description);
    // Append the generated div to the imageContainer
    imageContainer.appendChild(generated);
    // Scroll to the bottom after adding a new message
    scrollToBottom();
}
function scrollToBottom() {
    if (bottomScroll === true){
        imageContainer.scrollTop = imageContainer.scrollHeight;
    }
}


button.addEventListener('click', ()=>{
    sendData()
})
userPrompt.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (window.innerWidth > 1000){
            sendData();
            event.preventDefault();
        }
    }
});



const more = document.getElementById('more');
const others = document.getElementById('others');
const close = document.getElementById('close');

more.addEventListener("click", ()=>{
    others.style.left = '0px'
})
close.addEventListener('click', ()=>{
    others.style.left = '-290px'
})

const deleteImages = document.getElementById('delete');

deleteImages.addEventListener('click', ()=>{
    if (imageContainer.innerHTML !== ""){
        remove = window.confirm("Are you sure you want to delete all the generated Image? Make sure to download your images before deleting!")
        if (remove){
            imageContainer.innerHTML = ''
        }
    } else{
        window.alert("There is nothing to delete!")
    }
})
