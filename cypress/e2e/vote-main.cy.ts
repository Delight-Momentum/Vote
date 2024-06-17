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
      'https://vote-server.xyz/api/votelist?offset=1&limit=8&search=%ED%85%8C%EC%8A%A4%ED%8A%B8%203&order=popular',
      {
        statusCode: 200,
        fixture: 'votelist-search.json',
      },
    )

    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=voteCard]').as('voteCard')
  })

  it('투표 진행중인 카드 클릭시 투표 페이지로 라우팅 된다.', () => {
    cy.get('@voteCard').each(($card) => {
      cy.wrap($card)
        .invoke('attr', 'href')
        .then((href) => {
          if (typeof href === 'string' && href.includes('/vote/')) {
            cy.wrap($card).click()
            cy.url().should('include', '/vote/')
            cy.go('back')
          }
        })
    })
  })

  it('투표가 끝난 카드를 클릭하면 결과 페이지로 라우팅된다.', () => {
    cy.get('@voteCard').each(($card) => {
      cy.wrap($card)
        .invoke('attr', 'href')
        .then((href) => {
          if (typeof href === 'string' && href.includes('/result/')) {
            cy.wrap($card).click()
            cy.url().should('include', '/result/')
            cy.go('back')
          }
        })
    })
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
