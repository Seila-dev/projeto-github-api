import { getUser } from '/src/scripts/services/user.js';
import { getRepositories } from '/src/scripts/services/repositories.js'
import { getEvents } from '/src/scripts/services/events.js'

import { user } from '/src/scripts/objects/user.js'
import { screen } from '/src/scripts/objects/screen.js'

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if(validateEmptyInput(userName)) return;
    getUserData(userName);
})

document.getElementById('input-search').addEventListener('keyup', (event) => {
    const userName = event.target.value;
    const key = event.which || event.keyCode;
    const isKeyEnterPressed = key === 13;
    
    if(isKeyEnterPressed){
        if(validateEmptyInput(userName)) return;
        getUserData(userName);
    }
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub');
        return true
    }
}

async function getUserData(userName){
    const userResponse = await getUser(userName);

    if(userResponse.message === 'Not Found'){
        screen.renderNotFound();
        return;
    }
    const repositoriesResponse = await getRepositories(userName);
    const eventsResponse = await getEvents(userName);

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventsResponse)

    screen.renderUser(user)
    console.log(userResponse);
}