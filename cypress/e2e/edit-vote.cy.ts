describe('투표 수정 페이지를 테스트 한다', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://vote-server.xyz/api/votelist/1', {
      statusCode: 200,
      fixture: 'vote.json',
    })
    cy.intercept('PUT', 'https://vote-server.xyz/api/vote/1', {
      statusCode: 200,
    })
  })

  it('제목 인풋, 콘텐츠 인풋, 콘텐츠 인풋 추가, 라디오 버튼, 이름 인풋, 비밀번호 인풋, 투표 수정 버튼을 테스트한다', () => {
    // given - 투표 수정 페이지에 접근해 요소 하나하나를 찾는다.
    cy.visit('http://localhost:3000/vote/1/edit')
    cy.get('[data-cy=titleInput]').as('titleInput')
    cy.get('[data-cy=contentInput-1]').as('contentInput-1')
    cy.get('[data-cy=contentInput-2]').as('contentInput-2')
    cy.get('[data-cy=addContentButton]').as('addContentButton')
    cy.get('[data-cy=radioOne]').as('radioOne')
    cy.get('[data-cy=radioMultiple]').as('radioMultiple')
    cy.get('[data-cy=radioPublic]').as('radioPublic')
    cy.get('[data-cy=radioPrivate]').as('radioPrivate')
    cy.get('[data-cy=nameInput]').as('nameInput')
    cy.get('[data-cy=passwordInput]').as('passwordInput')

    // when - passwordInput에 값을 입력한다
    cy.get('@passwordInput').type('password123')

    // then - 입력한 값이 정상적으로 출력되는지 확인한다
    cy.get('@passwordInput').should('have.value', 'password123')

    // given - editVoteButton을 찾는다
    cy.get('[data-cy=editVoteButton]').as('editVoteButton')

    // when - editVoteButton을 클릭한다
    cy.get('@editVoteButton').click()

    // then - /vote/1 페이지로 이동한다
    cy.url().should('include', '/vote/1')
  })
})
