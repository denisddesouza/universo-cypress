import { el } from './elements'
import alert from '../../components/alert'
import toast from '../../components/toast'

class LoginPage {

    constructor(){
        this.toast = toast
        this.alert = alert
    }
    go() {
        cy.visit('/')
        cy.contains(el.title)
        .should('be.visible')
    }

    form(user) {
        cy.get(el.email)
            .clear()
            .type(user.email)
        cy.get(el.password)
            .clear()
            .type(user.password)



    }

    submit() {
        cy.contains(el.signIn).click()

    }

    
}

export default new LoginPage()