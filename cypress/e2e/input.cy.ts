describe('인풋을 테스트 한다', () => {
  it('text input을 테스트한다', () => {
    // given - 테스트 페이지에 접근한다
    cy.visit('http://localhost:3000/inputtest')
    cy.get('[data-cy=textInput]').as('textInput')
    cy.get('[data-cy=passwordInput]').as('passwordInput')
    cy.get('[data-cy=searchBarInput]').as('searchBarInput')

    // when - text, password, searchBarInput에 값을 입력하고, 검색 버튼을 클릭한다
    cy.get('@textInput').type('dm1234')
    cy.get('@passwordInput').type('dm1234')
    cy.get('@searchBarInput').type('최고의 아이돌은 누구인가요?')
    cy.get('[data-cy=searchBarButton]').should('exist').click()

    // then - 입력한 값이 정상적으로 출력되는지 확인한다
    cy.get('@textInput').invoke('val').should('eq', 'dm1234')
    cy.get('@passwordInput').invoke('val').should('eq', 'dm1234')
    cy.get('@searchBarInput')
      .invoke('val')
      .should('eq', '최고의 아이돌은 누구인가요?')
  })
})
