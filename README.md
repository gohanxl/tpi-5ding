# ![educapp-iso-150](https://user-images.githubusercontent.com/42984098/120053173-239d2900-bfff-11eb-870b-7c65dfffeaa8.png)


Proyecto final de la Tecnicatura en Desarrollo Web - UNlaM\
Creado con [Create React App](https://github.com/facebook/create-react-app).

## Integrantes
* [Lucas Lacquaniti](https://github.com/gohanxl)
* [Isaias Caporrusso](https://github.com/icapora)
* [Luciano Martin Corso](https://github.com/Kimbbbo)
* [Marcelo Serrano](https://github.com/chelo-kjml)
* [Micaela Visser](https://github.com/MicaVsr)

## Configuraciones necesarias

En el root del proyecto crear un .env file y agregar las variables listadas a continuación:

### .Net Core (backend)
#### `REACT_APP_API_URL` -> Https://{URL_DEL_BACKEND}/api (Base Path de los controllers de backend).
#### `REACT_APP_HUB_URL` -> Https://{URL_DEL_BACKEND}/hub (Base Path de los hubs de websocket de backend).

### PeerJs
#### `REACT_APP_PEERJS_HOST` -> Url del servidor de PeerJs.
#### `REACT_APP_PEERJS_PORT` -> Port donde escucha dicho servidor peerJs.
#### `REACT_APP_PEERJS_PATH` -> Path en caso de ser necesario para peerJs (default "/")

### Auth0
#### `REACT_APP_AUTH0_DOMAIN` -> Tenant de auth0 a utilizar.
#### `REACT_APP_AUTH0_CLIENT_ID` -> ClientId de auth0 correspondiente al tenant.
#### `REACT_APP_AUTH0_AUDIENCE` -> Target Audience para la generacion de JWT tokens.

A su vez, en el caso de auth0 en ```~/src/config/env-config.js``` encontrará una config así:

```javascript
export const env_config = {
  domain: REACT_APP_AUTH0_DOMAIN,
  clientId: REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: "http://localhost:3000/#/educapp",
  audience: REACT_APP_AUTH0_AUDIENCE,
};
```

EL redirectUri debe ser modificado acorde al entorno, en caso de ser diferente a development reemplazar localhost:3000 con la url correcta.

## Cómo correr el proyecto
###Si es la primera vez:
- Instalar nodejs en la maquina desde https://nodejs.org/es
- Luego, para instalar todas las dependencias, desde el root del proyecto ejecutar el comando: `npm install` (Dependiendo de la version instalada de NodeJs tal vez sea necesario agregar un modificador ```npm install --legacy-peer-deps```).


### Una vez instaladas las dependencias, correr el comando:
#### `npm start` -> De esta forma el proyecto correrá en developer mode.
<br>

Abrir [http://localhost:3000](http://localhost:3000) en el navegador para verlo.

*En caso de que el proyecto esté corriendo en otro puerto que no sea el 3000, ir al package.json y agregar el siguiente código para configurarlo:*

```
scripts: {
    "start": "set PORT=3000 && react-scripts start"
}
```
