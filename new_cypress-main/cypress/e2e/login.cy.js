import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json";
import * as result_page from "../locators/result_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // зашли на сайт
         cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // проверяю цвет кнопки восст. пароль
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // есть крестик и он виден для пользователя
           });

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); // ввели верный логин
         cy.get(main_page.password).type(data.password); // ввести верный пароль
         cy.get(main_page.login_button).click(); // нажал войти

         cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю, что после авторизации вижу текст
         cy.get(result_page.title).should('be.visible'); // текст виден пользователю

     })

     it('Верный правильный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // ввели верный логин
        cy.get(main_page.password).type('iLoveqastudio7'); // ввести неверный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Неправильный логин и верный пароль', function () {
        cy.get(main_page.email).type('german@dolnik.ru'); // ввели неверный логин
        cy.get(main_page.password).type(data.password); // ввести верный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Такого логина или пароля нет'); // проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Приведенеие к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // ввели неверный логин
        cy.get(main_page.password).type(data.password); // ввести верный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Авторизация прошла успешно'); // проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })


    it('Проверка, что в логине есть @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // ввели логин без @
        cy.get(main_page.password).type(data.password); // ввести верный пароль
        cy.get(main_page.login_button).click(); // нажал войти

        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // проверяю, что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователю
    })

    it('Проверка восстановления пароля', function () {
        cy.get(main_page.fogot_pass_btn).click(); // нажал восстановить пароль
        cy.get(recovery_password_page.email).type('german@dolnikov.ru'); //ввел почту для восстановления
        cy.get(recovery_password_page.send_button).click(); // нажал отправить код

        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail'); // проверяю на совпадение текст
        cy.get(result_page.title).should('be.visible'); // текст виден пользователюs

     
    })

 })
 
 

 