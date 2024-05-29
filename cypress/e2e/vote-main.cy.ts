describe('메인페이지를 테스트 한다.', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://vote-server.xyz/api/votelist?offset=1&limit=8',
      {
        statusCode: 200,
        fixture: 'votelist-8.json',
      },
    )

    cy.intercept(
      'GET',
      'https://vote-server.xyz/api/votelist?offset=9&limit=8',
      {
        statusCode: 200,
        fixture: 'votelist-16.json',
      },
    )

    cy.intercept(
      'GET',
      'https://vote-server.xyz/api/votelist?offset=1&limit=8&search=%ED%85%8C%EC%8A%A4%ED%8A%B8%203',
      {
        statusCode: 200,
        fixture: 'votelist-search.json',
      },
    )

    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=voteCard]').as('voteCard')
  })

  it('투표중일시 참여하기 버튼이 렌더되고 클릭시 투표창으로 이동한다.', () => {
    cy.get('@voteCard').should('exist')
    cy.get('[data-cy=joinButton]').as('joinButton')
    cy.get('@joinButton').should('exist')
    cy.get('@joinButton').first().click()
    cy.url().should('match', /\/vote\/\d+$/)
  })

  it('투표 종료시 결과보기 버튼이 렌더되고 클릭시 결과창으로 이동한다.', () => {
    cy.get('@voteCard').should('exist')
    cy.get('[data-cy=resultButton]').as('resultButton')
    cy.get('@resultButton').should('exist')

    cy.get('@resultButton').first().click()
    cy.url().should('match', /\/vote\/\d+\/result$/)
  })

  it('검색 기능을 테스트한다.', () => {
    cy.wait(1500)
    cy.get('[data-cy=searchInput]').as('searchInput')

    cy.get('@searchInput').type('테스트 3')
    cy.wait(500)

    cy.get('[data-cy=voteCardList]').as('voteCardList')
    cy.get('[data-cy=voteTitle]').as('voteTitle')

    cy.get('@voteCard').each(($card) => {
      cy.wrap($card).get('@voteTitle').should('include.text', '테스트 3')
    })
  })

  it('무한 스크롤을 테스트한다.', () => {
    cy.wait(1500)
    cy.get('@voteCard').should('have.length', 8)

    cy.scrollTo('bottom')

    cy.get('@voteCard').should('have.length.gte', 8)

    cy.scrollTo('bottom')

    cy.get('@voteCard').should('have.length.gte', 16)
  })
})
