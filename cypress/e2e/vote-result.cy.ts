describe('투표결과 페이지를 테스트한다.', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://vote-server.xyz/api/votelist/1', {
      statusCode: 200,
      fixture: 'vote-result.json',
    })
    cy.visit('http://localhost:3000/vote/1/result')
  })

  it('프로그레스바, 공유하기 버튼, 재투표하기 버튼을 렌더하는지 확인한다.', () => {
    // given - 투표 결과 페이지에 접근해 요소 하나하나를 찾는다.
    cy.get('[data-cy=progressBar]').as('progressBar')
    cy.get('[data-cy=shareButton]').as('shareButton')
    cy.get('[data-cy=revoteButton]').as('revoteButton')
  })

  it('날짜선택을 테스트한다', () => {
    // given - 재투표하기 버튼을 찾는다.
    cy.get('[data-cy=revoteButton]').as('revoteButton')
    // when - 재투표하기 버튼을 누른다.
    cy.get('@revoteButton').click()
    // then - 재투표 모달이 뜬다.
    cy.get('[data-cy=revoteDialog]').should('be.visible')

    // given - 날짜선택 버튼을 찾는다.
    cy.get('[data-cy=dateButton]').as('dateButton')
    // when - 날짜선택 버튼을 누른다.
    cy.get('@dateButton').click()
    // then - 날짜선택 모달이 나타난다.
    cy.get('.react-datepicker-popper').should('be.visible')
  })

  it('시간선택을 테스트한다', () => {
    // given - 재투표하기 버튼을 찾는다.
    cy.get('[data-cy=revoteButton]').as('revoteButton')
    // when - 재투표하기 버튼을 누른다.
    cy.get('@revoteButton').click()
    cy.get('@revoteButton').click()
    // then - 재투표 모달이 뜬다.
    cy.get('[data-cy=revoteDialog]').should('be.visible')

    // given - 시간선택 버튼을 찾는다.
    cy.get('[data-cy=timeButton]').as('timeButton')
    // when - 시간선택 버튼을 클릭한다.
    cy.get('@timeButton').click()
    // then - 날짜선택 모달이 나타난다.
    cy.get('.react-datepicker-popper').should('be.visible')
  })

  it('재투표 기능을 테스트한다.', () => {
    cy.get('[data-cy=revoteButton]').as('revoteButton')
    cy.get('@revoteButton').click()
    // given - 삭제 비밀번호 인풋을 가져온다.
    cy.get('[data-cy=deleteDialogInput]').as('deleteInput')
    // when - 값을 입력한다.
    cy.get('@deleteInput').type('1234')
    // then - 재투표가 올바르게 되는지 확인한다.
    cy.get('[data-cy=doRevoteButton]').as('doRevoteButton')
    cy.get('@doRevoteButton').click()
    cy.intercept('PUT', 'https://vote-server.xyz/api/votelist/1', (req) => {
      req.reply((res) => {
        expect(res.statusCode).to.eq(200)
      })
    })
  })
})
