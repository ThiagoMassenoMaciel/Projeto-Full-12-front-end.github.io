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