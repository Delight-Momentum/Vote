describe('투표 생성 페이지를 테스트 한다', () => {
  beforeEach(() => {
    cy.intercept('POST', 'https://vote-server.xyz/api/vote', {
      statusCode: 201,
      fixture: 'create-vote.json',
    })

    cy.intercept('GET', 'https://vote-server.xyz/api/votelist/1', {
      statusCode: 200,
      fixture: 'vote.json',
    })
  })

  it('제목 인풋, 콘텐츠 인풋, 콘텐츠 인풋 추가, 라디오 버튼, 이름 인풋, 비밀번호 인풋, 투표 등록 버튼을 테스트한다', () => {
    // given - 투표 생성 페이지에 접근해 요소 하나하나를 찾는다.
    cy.visit('http://localhost:3000/create-vote')
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
    cy.get('@titleInput').type('title 입니다.')
    cy.get('@contentInput-1').type('content 1 입니다.')
    cy.get('@contentInput-2').type('content 2 입니다.')
    cy.get('@addContentButton').click()
    cy.get('@radioMultiple').click()
    cy.get('@radioPrivate').click()
    cy.get('@nameInput').type('name 입니다.')
    cy.get('@passwordInput').type('password 입니다.')

    // then - 입력한 값이 정상적으로 출력되는지 확인한다
    cy.get('@titleInput').should('have.value', 'title 입니다.')
    cy.get('@contentInput-1').should('have.value', 'content 1 입니다.')
    cy.get('@contentInput-2').should('have.value', 'content 2 입니다.')
    cy.get('[data-cy=contentInput-3]').should('exist')
    cy.get('@radioMultiple').should('be.checked')
    cy.get('@radioPrivate').should('be.checked')
    cy.get('@nameInput').should('have.value', 'name 입니다.')
    cy.get('@passwordInput').should('have.value', 'password 입니다.')

    // given - contentInput-3를 찾는다
    cy.get('[data-cy=contentInput-3]').as('contentInput-3')

    // when - contentInput-3에 값을 입력한다
    cy.get('@contentInput-3').type('content 3 입니다.')

    // then - contentInput-3에 값이 정상적으로 입력되는지 확인한다
    cy.get('@contentInput-3').should('have.value', 'content 3 입니다.')

    // given - voteCreateButton을 찾는다
    cy.get('[data-cy=createVoteButton]').as('createVoteButton')

    // when - createVoteButton을 클릭한다
    cy.get('@createVoteButton').click()

    // then - /vote/1 페이지로 이동한다
    cy.url().should('include', '/vote/1')
  })
})
