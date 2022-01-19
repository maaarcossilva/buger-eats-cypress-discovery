import SignupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'

describe('Signup', () => {


    // before(function(){
    //     cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de testes')
    // })

    // beforeEach(function(){
    //     cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
    // })

    // after(function(){
    //     cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de testes')
    // })

    // afterEach(function(){
    //     cy.log('Tudo aqui é executado sempre DEPOIS de CADA caso de teste')
    // })

    beforeEach(function () {
        cy.fixture('deliver').then((d) => {
            this.deliver = d
        })
    })

    it('User should be deliver', function () {

        var deliver = SignupFactory.deliver()

        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        SignupPage.modalContentShouldBe(expectedMessage)

    })

    it('Incorrect document', function () {
        var deliver = SignupFactory.deliver()

        deliver.cpf = '000000asswe'

        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('Incorrect email', function () {
        var deliver = SignupFactory.deliver()

        deliver.email = 'marcos.gmail.com'

        SignupPage.go()
        SignupPage.fillForm(deliver)
        SignupPage.submit()
        SignupPage.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context ('Required fields', function(){
        const messages = [
            {field: 'name', output: 'É necessário informar o nome' },
            {field: 'cpf', output: 'É necessário informar o CPF' },
            {field: 'email', output: 'É necessário informar o email' },
            {field: 'postalcode', output: 'É necessário informar o CEP' },
            {field: 'number', output: 'É necessário informar o número do endereço' },
            {field: 'delivery_method', output: 'Selecione o método de entrega' },
            {field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            SignupPage.go()
            SignupPage.submit()
        })
        messages.forEach(function (msg){
            it(`${msg.field} is required`, function(){
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })

})