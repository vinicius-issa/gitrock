# GitRock
## Desafio técnico

### Instalação
Para a execução do sistema, é necessário ter instalado os seguintes pacotes:
* **node** - version v12.16.1
* **npm** - version 6.13.4

Após baixar o repositório do GitHub e acessar a pasta do projeto, instale as dependencias com:
```
    npm install
```

Pronto, tudo certo para rodar o sistema, agora é só executar o script que deseja:
* Para executar em modo de produção:
```
    npm run production
```
* Para executar em modo de desenvolvimento:
```
    npm run dev
```
* Para executar os testes automatizados:
```
    npm run test
```
Em ambos os ambientes de desenvolvimento e de produção, o sistema rodará na porta 3000
### Token de acesso
A API do GitHub fornece um numero limitado de requisições por IP. É possível obter um numero maior de requisições utilizando uma chave privada fornecida pelo [GitHub](https://github.com/settings/tokens).
Caso deseja utilizar uma chave de acesso, basta criar um arquivo ```.env``` na raiz do diretório com o seu Token Pessoal:
```
TOKEN=<seu_token>
``` 

### Utilizando o Docker
Esse sistema já esta configurado para rodar com o docker. Para isso, construa a imagem com:
```
docker build -t gitrock
```
E depois basta rodar com:
```
docker run --name gitrock -p 3000:3000 -d gitrock
```


### Framework e Bibliotecas Utilizadas
* **express** Por possuir maior conhecimento em como utilizar e sobre o funcionamento do mesmo, optei por utilizar o express como framework para o node
* **axios** para as requisições à API do Github. Optei pela facilidade de se trabalhar com promises
* **dotenv** para armazenamento das variaveis de ambiente.
* **jest** para execução dos testes
* **supertest** para os testes de rotas, utilizando para as chamadas à nossa API
* **node-cache** para a implantação do cache no sistema. Essa é uma das lib mais utilizadas para node ao que se refere ao uso de cache.

### Dificuldades encontradas
Durante o desenvolvimento do sistema, algumas dificuldades foram encontradas, o que ocasionaram um tempo de entrega mais longo do que o esperado por mim. 

O primeiro problema foi com o timeout padrão das requisicoes do express. O Framework Express define um timeout padrão de 2 segundos, retornando uma resposta vazia quando esse tempo é alcançado. Eu desconhecia esse timeout. Na maioria dos testes que eu estava fazendo, com os repositorios menores, esse timeout só era alcançado quando acontecia erro em alguma requisição do Axios.
Com isso, tentei solucionar o problema da resposta vazia procurando algum problema com o Axios. Refatorei o codigo diversas vezes, incluindo os interceptadores nas requisições do Axios para remover os retornos de Promises rejeitadas pela lib, removi todos os awaits e funções assincronas e também cheguei a incluir as chamadas recursivas para as requisições rejeitadas até que fossem realizadas com sucesso.
Tudo isso acreditando que era algum problema no Axios. Porem, o problema era simplesmente o timeout padrão do Express... Isso me custou cerca de 12h de desenvolvimento.

Outro ponto foi na tentativa de uso de cache nas chamadas do Axios utilizando o Redis para armazenamento. Tentei por aproximadamente 6h essa integração, porem sem sucesso. 
Depois do sistema finalizado, subi uma atualização utilizando a lib *node-cache*, funcionando corretamente e permitindo assim a utilização de cache no sistema.

O sistema não esta retornando o valor correto para o repositório *expressjs/express* devido ao modelo de contagem das *stars*. A API do GitHub permite avançar até a página 400, não retornando valor após essa. Com isso, é retornado o valor de 40.000 stars para esse repositório, quando deveria retornar 49.191. Não encontrei outra maneira de resolver esse problema específico sem utilizar o stargazer_count. Com isso, nenhuma resolução foi implementada para esse caso.