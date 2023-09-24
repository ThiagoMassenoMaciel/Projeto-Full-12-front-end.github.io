import { GithubUser } from './GithubUser.js'

export class Favorites{

    constructor(root){ 
    this.root = document.querySelector(root)
    this.load()
    }
    load(){
       this.entries = JSON.parse( localStorage.getItem('@github-favorites:') ) || [] 
    }
    save(){
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(valueFromInputByUser){
        try{ 
            const userExists = this.entries.find(entry => entry.login ==valueFromInputByUser)

            if(userExists){
                throw new Error('Usuário já cadastrado!')
            }

            const  SearchThisUserOnGitHub = await GithubUser.search(valueFromInputByUser)

            if( SearchThisUserOnGitHub.login === undefined){
                throw new Error('Usuário não encontrado no github')
            }


            this.entries = [  SearchThisUserOnGitHub , ...this.entries]
            this.update()
            this.save()

            console.log(`:::::testando se chega até nesta função add \n:::::${valueFromInputByUser}`)
            
        } catch(error){

                alert("erro: tente outra vez e outro usuário")    
        }
    }
    
    delete(user){
        const filteredEntries = this.entries
        .filter( entry => entry.login !== user.login)
        console.log(filteredEntries)
 
        this.entries = filteredEntries;

        this.update()
        this.save()
    }
}


export class FavoritesView extends Favorites{
    constructor(root){
        super(root) 
        this.tbody = this.root.querySelector('table tbody');

        this.update()
        this.onadd()

    }

    onadd(){
        const adButton = this.root.querySelector('.search button') 
        adButton.onclick = () => {
                const { value } = this.root.querySelector('.search input')
                this.add(value)
               }
            }

    update(){
        this.removeAlltr()
  
        this.entries.forEach(      user => { 
            const row = this.createRow() ; 

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`; 
            row.querySelector('.user img').alt=`Imagem de ${user.name}`
            row.querySelector('.user a').href = `https://github.com/${user.login}`
            row.querySelector('.user a p').textContent = user.name;
            row.querySelector('.user a span').textContent = user.login;
            row.querySelector('.Repositories').textContent = user.public_repos;
            row.querySelector('.Followers').textContent = user.followers;
            
            row.querySelector('.remove').onclick = () => {
                console.log(`apagar :${user.name}:`)
            
                const isOk = confirm("Tem certeza que deseja deletar essa linha ?")
                
                if(isOk){
                    this.delete(user)
                }
                
            }
            this.tbody.append(row);
        }   
                            
        )

    }

    createRow(){
        const tr = document.createElement('tr')

        tr.innerHTML = `
        <td class="user">
            <img src="https://github.com/ThiagoMassenoMaciel.png" alt="Image de perfil"/>
            <a href="https://github.com/ThiagoMassenoMaciel" target="_blank">
                <p>ThiagoMassenoMaciel</p>
                <span>aqu i iil</span>
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
        this.tbody.querySelectorAll('tr')
        .forEach( tr => {  
            tr.remove() 
            } 
        ) 
    }
}