describe('투표 생성 페이지를 테스트 한다', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://13.125.250.153:3000/api/votelist/1', {
      statusCode: 200,
      fixture: 'get-votelist.json',
    })
    cy.intercept('PUT', 'http://13.125.250.153:3000/api/vote/1', {
      statusCode: 200,
      fixture: 'put-vote.json',
    })
  })

  it('제목 인풋, 콘텐츠 인풋, 콘텐츠 인풋 추가, 라디오 버튼, 이름 인풋, 비밀번호 인풋, 투표 등록 버튼을 테스트한다', () => {
    // given - 테스트 페이지에 접근한다
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

    // when - title, contentInput-1, contentInput-2, nameInput, passwordInput에 값을 입력하고 addContentButton 을 클릭하고 radioPublic, radioPrivate를 클릭한다.
    cy.get('@passwordInput').type('1234')

    // then - 입력한 값이 정상적으로 출력되는지 확인한다
    cy.get('@passwordInput').should('have.value', '1234')

    // given - voteCreateButton을 찾는다
    cy.get('[data-cy=editVoteButton]').as('editVoteButton')

    // when - createVoteButton을 클릭한다
    cy.get('@editVoteButton').click()

    // then - /vote/1 페이지로 이동한다
    cy.url().should('include', '/vote/1')
  })
})
