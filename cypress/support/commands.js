// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import moment from "moment/moment"   
import login from "./pages/login"
import dash from "./pages/dash"


// App Actions
Cypress.Commands.add('uiLogin', function (user) {
    login.go()
    login.form(user)
    login.submit()
    dash.header.userLoggedIn(user.name)

})

Cypress.Commands.add('postUser', function (user) {

    cy.task('removeUser', user.email)
        .then(function (result) {
            console.log(result)
        })
    cy.request(
        'POST',
        Cypress.env('apiServer') + '/users',
        user
    ).then(function (response) {
        expect(response.status).to.eq(200)
    })

})


Cypress.Commands.add('createAppointment', function (appointmentHour) {

    let now = new Date()

    now.setDate(now.getDate() + 3)
    //'${Cypress.env(appointmentDay, now.getDate)}'
    //Cypress.env('appointmentDate', now.getDate)
    Cypress.env('appointmentDate', now)
    cy.log('Aqui o dia ' + Cypress.env('appointmentDate'))
    cy.log(now.getDate())

    //const day = moment(now).format('YYYY-MM-DD ' + appointmentHour.hour + ':00')
    const day = moment(now).format(`YYYY-MM-DD  ${appointmentHour.hour}:00`)

    const payload = {
        provider_id: Cypress.env('providerId'),
        date: day
    }

    cy.log(payload)

    cy.request({
        method: 'POST',
        //url: Cypress.env('apiServer') + '/appointments',
        url: `${Cypress.env('apiServer')}/appointments`,
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        },
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200)
    })
})


Cypress.Commands.add('setProviderId', function (providerEmail) {
    cy.request({
        medhot: 'GET',
        url: Cypress.env('apiServer') + '/providers',
        headers: {
            authorization: 'Bearer ' + Cypress.env('apiToken')
        }
    }).then(function (response) {
        expect(response.status).to.eq(200)
        console.log(response.body)

        const providerList = response.body
        providerList.forEach(function (provider) {
            if (provider.email === providerEmail) {
                '${Cypress.env(providerId, provider.id)}'
                cy.log(Cypress.env('providerId', provider.id))
            }
        })
    })
})



Cypress.Commands.add('apiLogin', function (user, setLocalStorage = false) {
    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: Cypress.env('apiServer') + '/sessions',
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200)

        '${Cypress.env(apiToken, response.body.token)}'
        cy.log(Cypress.env('apiToken', response.body.token))
 
        if(setLocalStorage){
            const {token, user} = response.body
            window.localStorage.setItem('@Samurai:token', token)
            window.localStorage.setItem('@Samurai:user', JSON.stringify(user))
        }
        
    })

        if(setLocalStorage) cy.visit('/dashboard')

})