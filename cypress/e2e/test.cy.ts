describe('проверяем доступность приложения', function() {
    it('сервис должен быть доступен по адресу localhost:4000', function() {
        cy.visit('http://localhost:4000');
    });
});

describe('страница конструктора', () => {
    beforeEach(() => {
        cy.intercept('**/api/ingredients', {
            fixture: 'ingredients.json'
        }).as('getIngredients');

        cy.visit('http://localhost:4000');
        cy.get('[data-cy=ingredient]').should('exist');
    });

    it('добавление двух ингредиентов', () => {
        cy.get('[data-cy-id="1"]')
        .within(() => {
            cy.contains('button', 'Добавить').click();
        })

        cy.get('[data-cy-id="2"]')
        .within(() => {
            cy.contains('button', 'Добавить').click();
        })
    });

    it('отображение ингредиентов', () => {
        cy.contains('Булки').should('exist');
        cy.contains('Начинки').should('exist');
    })

    it('работа модального окна', () => {
       
        cy.get('[data-cy=ingredient-link]').first().click();

        cy.contains('Детали ингредиента').should('exist');

        cy.get('[data-cy=modal-close]').click();

        cy.contains('Детали ингредиента').should('not.exist');
    });
});

describe('прохождение авторизации', () => {
    beforeEach(() => {
        cy.intercept('**/api/auth/user', {
        fixture: 'user.json'
        }).as('getUser');

        cy.intercept('GET', '**/api/ingredients', {
        fixture: 'ingredients.json'
        }).as('getIngredients');

        cy.intercept('POST', '**/api/orders', {
            fixture: "order.json"
        }).as('postOrder')
    })

    it('данные пользователя', () => {
        cy.setCookie('accessToken', 'fakeAccessToken');
        localStorage.setItem('refreshToken', 'fakeRefreshToken');

        cy.visit('http://localhost:4000/profile');

        cy.wait('@getUser');

        cy.get('input[name="name"]').should('have.value', 'Владислав');
    })

    it('создание заказа', () => {
        cy.setCookie('accessToken', 'fakeAccessToken');
        localStorage.setItem('refreshToken', 'fakeRefreshToken');

        cy.visit('http://localhost:4000');

        cy.get('[data-cy-id="1"]')
        .within(() => {
            cy.contains('button', 'Добавить').click();
        })

        cy.get('[data-cy-id="2"]')
        .within(() => {
            cy.contains('button', 'Добавить').click();
        })

        cy.contains('button','Оформить заказ').click();

        cy.wait('@postOrder');

        cy.contains('12345').should('exist');

        cy.get('[data-cy=modal-close]').click();

        cy.contains('12345').should('not.exist');

        cy.get('[data-cy=constructor-ingredient]').should('have.length', 0);
    });
})

