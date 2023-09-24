export class GithubUser{
    static search(username){
        const endpoint = `https://api.github.com/users/${username}`
// fetch é o que eu vou buscar na internet 
        return fetch(endpoint)  // esta accessando o link 
        .then( data => data.json()) // na promessa de retornar o dado depois do fetch tudo convertido em JSON 
        .then(( {login, name , public_repos, followers  }) => ({ // retornar a promessa com os dados desestruturados
            login,
            name,
            public_repos,
            followers
        })) // organização dos dados que seram retornados em JSON e continuando a promessa na quarta linha de código dentro da classe Favorites

    }
/*  PODERIA SER ASSIM TAMBÉM 
.then( data => 
    const {loguin , name, public_repos, followers } = data 
    
    return {

        loguin : loguin,
        name : name,
        public_repos : public_repos,
        followers : followers

    })

*/
    /* antes de desestruturar o parametro data pois ele estava se repetindo muito 
        .then( data => ({
            loguin: data.loguin,   shorthand      loguin 
            name: data.name,
            public_repos: data.public_repos,
            followers: data.followers
        }))
    */
}

export class Favorites{
    constructor(root){  // This root its like the div    APP    i am using the html into this div and using como parametro
    this.root = document.querySelector(root)

    this.load()

    GithubUser.search('diego3g').then( user => console.log(user))
    this.onadd()

    }

    load(){
        // vai estanciar esta array com os object literals para poder executar em cada objeto funções de array like
        // para cada elemento { object literals } que eu colocar dentro da array execute CreateRow()

        this.entries = JSON.parse( localStorage.getItem('@github-favorites:') ) || [] // escolhido nome da key de local Storage pra dentro de entries e se não tiver passe a array para dentro da variavel
        console.log(this.entries)

    }
/*
    this.entries = [
        {
            loguin: 'maykbrito',
            name:"Mayk Brito" ,
            public_repos: "76", 
            followers: '120000' 
        }
        ,
        {
            loguin: 'diego3g',
            name:"Diego Fernandes" ,
            public_repos: "76", 
            followers: '120000' 
        }

    ]
*/        
    // apagar a linha dentro da classe que esta mexendo com os dados 
    // se a função que eu estou rodando para este entries e retornar falso por alguma lógica removerei este elemento da array entries 
    // ESTE FILTER VAI DE UM POR UM DOS ELEMENTOS DENTRO DA ARRAY EXECUTRAR A FUNÇÃO quando achar o elemento com o loguin igual o q foi clicado irá retornar false logo apagara este elemento( da nova array ) que tem o loguin igual aquele passado por parametro 

    delete(user){
        const filteredEntries = this.entries
        .filter( entry => entry.loguin !== user.loguin)
        console.log(filteredEntries)
        // seguindo o principio de imutabilidade , n altero o valor dentro da variavel 
        // entries - altore o valor de outra array tal qual era cópia de entries 
        // reatribuindo uma nova array para variavel de classe entries 
        this.entries = filteredEntries;

        this.update()
    }

    async add(valueFromInputByUser){
        console.log(`:::::testando se chega até nesta função add \n:::::${valueFromInputByUser}`)
// Emvez de eu fazer isso 
//     GithubUser.search('diego3g').then( user => console.log(user))
//      farei menos código 
        const  SearchThisUser = await GithubUser.search(valueFromInputByUser)
    }
}

//classe que vai criar a visualização e eventos html
export class FavoritesView extends Favorites{
    constructor(root){
        super(root) //  DENTRO SO SUPER SO AQUELE VALOR QUE VAI MUDAR 
        console.log(this.root)
        this.update()
        this.onadd()

    }

    onadd(){
        // lembrando que o root é a ancora que liga o js com elemento do html que tenha o id app 
                const adButton = this.root.querySelector('.search button') 
                adButton.onclick = () => {
                    const { value } = this.root.querySelector('.search input')
                    //console.log(value)
                    this.add(value)
               }
            }

/*
    onadd(){
// lembrando que o root é a ancora que liga o js com elemento do html que tenha o id app 
        const adButton = this.root.querySelector('.search button') 
        adButton.onclick = () => {
            const input = this.root.querySelector('search input')   // valueToSearch from github
            console.log("isso aqui é usando o dir")
            console.dir(input)   // this dir its mean that you will show on console the element from html and your attributes properties like object 

       }
    }
*/

    update(){
        this.removeAlltr()
        // depois de executado o load() que crie novas tr para cada elemento da array de objetos entries
        this.entries.forEach(      user => { 
            const row = this.createRow() ; 
            console.log(row) 
            row.querySelector('.user img').src = `https://github.com/${user.loguin}.png`; 
            row.querySelector('.user img').alt=`Image de ${user.name}`

            row.querySelector('.user  p').textContent = user.name;
            row.querySelector('.user span').textContent = user.loguin;
            row.querySelector('.Repositories').textContent = user.public_repos;
            row.querySelector('.Followers').textContent = user.followers;
            row.querySelector('.remove').onclick = () => {
                console.log(`apagar :${user.name}:`)
                const isOk = confirm("Tem certeza que deseja deletar essa linha ?")
                
                if(isOk){
                    this.delete(user)
                }
                
            };

            this.tbody.append(row);
        }   
                            
        )

    }

    createRow(){
        const tr = document.createElement('tr')
        tr.innerHTML = `<td class="user">
            <img src="https://github.com/ThiagoMassenoMaciel.png" alt="Image mde perfil do respectivo usuário que ja foi adicionado nesta Pagina de favoritos">
            <a href="https://github.com/ThiagoMassenoMaciel">
                <p>ThiagoMassenoMaciel</p>
                <span>Thiago Masseno Maciel</span>
            </a>
        </td>
        <td class="Repositories">64</td>
        <td class="Followers">22</td>
        <td>
            <button class="remove" >&times;</button>
        </td>`
        return tr
    }

    removeAlltr(){
        this.tbody = this.root.querySelector('table tbody');
        this.tbody.querySelectorAll('tr').forEach( (tr)=> {  tr.remove() } ) ;
    }
}