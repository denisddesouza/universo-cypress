import dashpage from "../support/pages/dash/index"
import { customer, provider, appointmentHour } from "../support/factories/dash/index"

describe('dashboard', function () {
    context('quando o cliente faz um agendamento no app mobile', function () {

        before(function () {
            cy.postUser(provider)
            cy.postUser(customer)
            cy.apiLogin(customer)
            cy.setProviderId(provider.email)
            cy.createAppointment(appointmentHour)
        })
        it('o mesmo deve ser exibido no dashboard', function () {
            const date = Cypress.env('appointmentDate')
            //cy.uiLogin(provider)
            cy.apiLogin(provider, true)
            dashpage.calendarShouldBeVisible()
            dashpage.selectDay(date)
            dashpage.appointmentShouldBeVisible(customer, appointmentHour)

        })
    })
})