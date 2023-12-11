import loginPage from "../support/pages/login/index"
import dashPage from "../support/pages/dash/index"



describe('login', function () {
    context('quando o usuário é muito bom', function () {
        const user = { name: 'Robson Jassa', email: 'jassa@samuraibs.com', password: 'pwd123', is_provider: true }

        before(function () {
            cy.postUser(user)
        })
        it('usuário deve logar com sucesso', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()
            dashPage.header.userLoggedIn(user.name)


        })

    })
    context('quando o usuário é bom mas a senha está incorreta', function () {
        let user = {
            name: 'Celso Kamura',
            email: 'kamura@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.postUser(user).then(function () {
                user.password = 'abc1234'
            })

        })

        it.only('deve notificar erro de credenciais', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.toast.shouldHaveText(message)

        })
    })

    context('quando o formato do email é inválido', function () {

        const emails = ['denis.com.br', 'denis@', 'xpto', '$%#@', '@']
        beforeEach(function () {
            loginPage.go()
        })
        emails.forEach(function (email) {
            it('não deve logar com o email: ' + email, function () {
                const user = { email: email, password: 'pwd123' }

                //loginPage.go()
                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')

            })
        })
    })

    context('todos os campos devem ser obrigatórios', function () {

        const messages = ['E-mail é obrigatório', 'Senha é obrigatória']
        beforeEach(function () {
            loginPage.go()
            loginPage.submit()
        })
        messages.forEach(function (message) {
            it('deve exibir mensagem de alerta: ' + message, function () {
                loginPage.alert.haveText(message)
            })
        })
    })
})