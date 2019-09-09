# Client application for ordering a taxi

Functionality: authorization, filling in "payment" data, request to build routes to given addresses, building a route on a map. Addresses and data for authorization are set on the server. The authorization flag and "payment" data are stored in localstorage.

All logic, reducers, sagas are covered with unit tests.

Demo in Heroku 
Login Information: Login: test@test.com, Password: 1234

## Technology

- create-react-app
- React.js
- react-router
- Redux
- redux-saga
- Redux Form
- Material UI
- redux-actions
- CSS-modules
- Jest
- Mapbox API

## For this app uses remote server [glitch](https://order-taxi-app.glitch.me/)
## Backend for this app [Backend](https://github.com/reyzele/order-taxi-backend)

### For start this project use npm install | yarn install he starts on http://localhost:3000/