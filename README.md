## API Docs

### Install instructions

1. `npm install` - install all npm dependecies

2. Make file .env.local and set all variables you want to override from .env

3. If you don't have npx installed, install it using `npm install -g npx`
#### Additional
If you want to use pm2 commands without npx please install pm2 globally using `npm i -g pm2`

### Available Scripts

In the project directory, you can run following commands:
#### Start development using nodemon:
```sh
$ npm run dev
```
#### Start script detached using pm2:
```sh
$ npm start
```
#### Stop script:
```sh
$ npm run stop
```
#### Reload script:
```sh
$ npm run reload
```
#### Read logs file:
```sh
$ npm run log
```
#### Clear all logs:
```sh
$ npm run log-clear
```

