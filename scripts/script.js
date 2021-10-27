let baseURL = 'https://api.github.com';
let reposPerPage = 9;
let allRepos;

// Função que carrega mais repositórios
const loadMoreRepos = (areaRepos) => {

    // Setando páginas e quais repositórios vão ser mostrado
    let nextPage = page + reposPerPage;
    page = nextPage;
    let nextRepos = allRepos.slice(nextPage, nextPage + reposPerPage);

    // Desabilitar botão de ver mais repos se não tiver mais repos para exibir
    if (nextRepos.length == 0 || nextRepos.length < 9) {
        document.getElementById('more-repos').disabled = true;
    }

    // Imprimindo mais repositórios
    nextRepos.map(repo => {
        // Fazendo uma cópia do foguete do hover, pasta dos repos e removendo ids
        let rocket =
            '<div class="rocket"><svg xmlns="http://www.w3.org/2000/svg"width="72"height="72"viewBox="0 0 48 48"><path fill="#FF3D00"d="M8.444,32.9c1.562-1.563,4.095-1.563,5.657,0c1.562,1.562,1.562,4.095,0,5.656c-1.562,1.563-7.778,2.121-7.778,2.121S6.882,34.462,8.444,32.9z"class="fire"></path><path fill="#FFEB3B"d="M9.858,34.314c0.781-0.781,2.048-0.781,2.829,0s0.781,2.047,0,2.828S9.151,37.85,9.151,37.85S9.078,35.096,9.858,34.314z"class="fire"></path><path fill="#D1C4E9"d="M29.658,8.858c-2.121,2.12-20.507,20.507-20.507,20.507l8.485,8.484c0,0,18.385-18.384,20.506-20.506c1.118-1.118,2.036-4.391,2.658-7.24l-3.902-3.902C34.047,6.823,30.775,7.741,29.658,8.858z"class="body-rocket"></path><path fill="#7E57C2"d="M21.172 41.385L19.05 36.437 27.535 27.951 26.122 36.436zM5.616 25.829L10.565 27.951 19.05 19.466 10.565 20.879zM36.898 6.2l3.902 3.902c.559-2.56.877-4.78.877-4.78S39.459 5.643 36.898 6.2zM17.637 37.85L14.808 37.85 9.151 32.193 9.151 29.365z"class="body-rocket"></path><g><path fill="#311B92"d="M29.657 15.344000000000001A2 2 0 1 0 29.657 19.344 2 2 0 1 0 29.657 15.344000000000001zM24.707 20.293A2 2 0 1 0 24.707 24.293 2 2 0 1 0 24.707 20.293zM19.758 25.243A2 2 0 1 0 19.758 29.243 2 2 0 1 0 19.758 25.243z"class="body-rocket"></path></g></svg>GO!</div>';
        let folder =
            '<svg class="folder" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 48 48"width="200"height="200"><path fill="#FFA000"d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/><path fill="#FFFFFF"d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/><path fill="#FFCA28"d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/></svg>';

        // Criando a divisão que ficará informações do repositório (Título e descrição)
        let a = document.createElement('a');
        a.classList.add('repo'); // Aplicando classe
        a.innerHTML = rocket;
        a.innerHTML += folder;
        a.setAttribute('target', '_blank'); //Adicinando target blank
        a.setAttribute('href', repo.html_url); // Mudando referencia de link
        areaRepos.appendChild(a); // Colocando a section na div#area-repos

        // Criando a div com as informações do repositório
        let div = document.createElement('div');
        div.classList.add('infos-repo');
        a.appendChild(div); // Colocando a div no a

        // Criando e colocando o título
        let h3 = document.createElement('h3');
        h3.innerHTML = repo.name;

        // Criando e colocando a descrição
        let p = document.createElement('p');
        p.innerHTML = repo.description || '"No description."';

        // Colocando o título e a descrição na div
        div.appendChild(h3);
        div.appendChild(p);
    });
}

// Função que insere os repositórios na página
const insertRepos = (data) => {
    allRepos = data; // Pegando todos repositórios em uma variável
    page = 0; // Setando a página como 0
    data = data.slice(page, reposPerPage); // Pegando quantos repos serão apresentados

    document.getElementById('more-repos').style.display = 'block';

    // Se a qntd de repos que for impresso for maior igual a 5
    if (data.length >= 9) {
        document.getElementById('more-repos').disabled = false;
    }

    // Tirando todos os repositórios que estão na tela
    let areaRepos = document.getElementById('repositories');
    areaRepos.innerText = "";

    document.getElementById('username').value = ''; // Limpando o campo do usuário

    // Imprimindo 5 repositórios do usuário
    data.map(repo => {
        // Fazendo uma cópia do foguete do hover, pasta dos repos e removendo ids
        let rocket =
            '<div class="rocket"><svg xmlns="http://www.w3.org/2000/svg"width="72"height="72"viewBox="0 0 48 48"><path fill="#FF3D00"d="M8.444,32.9c1.562-1.563,4.095-1.563,5.657,0c1.562,1.562,1.562,4.095,0,5.656c-1.562,1.563-7.778,2.121-7.778,2.121S6.882,34.462,8.444,32.9z"class="fire"></path><path fill="#FFEB3B"d="M9.858,34.314c0.781-0.781,2.048-0.781,2.829,0s0.781,2.047,0,2.828S9.151,37.85,9.151,37.85S9.078,35.096,9.858,34.314z"class="fire"></path><path fill="#D1C4E9"d="M29.658,8.858c-2.121,2.12-20.507,20.507-20.507,20.507l8.485,8.484c0,0,18.385-18.384,20.506-20.506c1.118-1.118,2.036-4.391,2.658-7.24l-3.902-3.902C34.047,6.823,30.775,7.741,29.658,8.858z"class="body-rocket"></path><path fill="#7E57C2"d="M21.172 41.385L19.05 36.437 27.535 27.951 26.122 36.436zM5.616 25.829L10.565 27.951 19.05 19.466 10.565 20.879zM36.898 6.2l3.902 3.902c.559-2.56.877-4.78.877-4.78S39.459 5.643 36.898 6.2zM17.637 37.85L14.808 37.85 9.151 32.193 9.151 29.365z"class="body-rocket"></path><g><path fill="#311B92"d="M29.657 15.344000000000001A2 2 0 1 0 29.657 19.344 2 2 0 1 0 29.657 15.344000000000001zM24.707 20.293A2 2 0 1 0 24.707 24.293 2 2 0 1 0 24.707 20.293zM19.758 25.243A2 2 0 1 0 19.758 29.243 2 2 0 1 0 19.758 25.243z"class="body-rocket"></path></g></svg>GO!</div>';
        let folder =
            '<svg class="folder" xmlns="http://www.w3.org/2000/svg"viewBox="0 0 48 48"width="200"height="200"><path fill="#FFA000"d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"/><path fill="#FFFFFF"d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/><path fill="#FFCA28"d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"/></svg>';

        // Criando a divisão que ficará informações do repositório (Título e descrição)
        let a = document.createElement('a');
        a.classList.add('repo'); // Aplicando classe
        a.innerHTML = rocket;
        a.innerHTML += folder;
        a.setAttribute('target', '_blank'); //Adicinando target blank
        a.setAttribute('href', repo.html_url); // Mudando referencia de link
        areaRepos.appendChild(a); // Colocando a section na div#area-repos

        // Criando a div com as informações do repositório
        let div = document.createElement('div');
        div.classList.add('infos-repo');
        a.appendChild(div); // Colocando a div no a

        // Criando e colocando o título
        let h3 = document.createElement('h3');
        h3.innerHTML = repo.name;

        // Criando e colocando a descrição
        let p = document.createElement('p');
        p.innerHTML = repo.description || '"No description."';

        // Colocando o título e a descrição na div
        div.appendChild(h3);
        div.appendChild(p);
    });
}

const getRepos = async (username) => {
    try {
        let {
            data
        } = await axios.get(`${baseURL}/users/${username}/repos`);
        insertRepos(data);
    } catch (err) {
        console.log(err)
    }
}

const searchUser = async (e, username, reload) => {

    if (reload) {
        e.preventDefault();
    }

    try {
        let {
            data
        } = await axios.get(`${baseURL}/users/${username}`);

        document.getElementById('avatar').setAttribute('href', data.html_url);
        document.getElementById('avatar-img').setAttribute('src', data.avatar_url);
        document.getElementById('name').innerHTML = data.name;
        document.getElementById('login').innerHTML = data.login;
        document.getElementById('followers').innerHTML = data.followers;
        document.getElementById('following').innerHTML = data.following;
        document.getElementById('description').innerHTML = `"${data.bio || '-'}"`;
        getRepos(username);

        if (data.login == 'Ruan4S') {
            document.getElementById('avatar').classList.add('owner');
        } else {
            document.getElementById('avatar').classList = '';
        }

    } catch (err) {
        document.getElementById('alert').classList.add('show');
        setTimeout(() => {
            document.getElementById('alert').classList = '';
        }, 3000);
    }
}

searchUser(document.onload, 'ruan4s', false);