describe('투표 페이지를 테스트 한다', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://13.125.250.153:3000/api/votelist/1', {
      statusCode: 200,
      fixture: 'vote.json',
    })

    cy.intercept('POST', 'http://13.125.250.153:3000/api/vote/1/1', {
      statusCode: 200,
    })

    cy.intercept('DELETE', 'http://13.125.250.153:3000/api/vote/1', {
      statusCode: 200,
    })
  })
  it('제목 인풋, 투표 내용 1, 2, 3, 4, 투표 방식 설명, 투표 남은 기간 설명, 투표 하기 버튼을 테스트 한다.', () => {
    // given - 투표 페이지에 접근해 요소 하나하나를 찾는다
    cy.visit('http://localhost:3000/vote/1')
    cy.get('[data-cy=label]').as('voteTitleLabel')
    cy.get('[data-cy=voteContent1]').as('voteContent1')
    cy.get('[data-cy=voteContent2]').as('voteContent2')
    cy.get('[data-cy=voteContent3]').as('voteContent3')
    cy.get('[data-cy=voteContent4]').as('voteContent4')
    cy.get('[data-cy=voteMethodDescription]').as('voteMethodDescription')
    cy.get('[data-cy=voteRemainingPeriod]').as('voteRemainingPeriod')

    // when - content를 선택하고 voteButton을 클릭한다
    cy.get('@voteContent1').click()

    // then - 선택한 content가 정상적으로 선택되었는지 확인한다
    cy.get('@voteContent1').find('input').should('be.checked')

    // given - voteButton을 찾는다
    cy.get('[data-cy=voteButton]').as('voteButton')

    // when - voteButton을 클릭한다
    cy.get('@voteButton').click()

    // then - /vote/1/result 페이지로 이동한다
    cy.url().should('include', '/vote/1/result')

    // given - 투표 페이지에 접근해 투표 삭제하기 버튼을 찾는다
    cy.visit('http://localhost:3000/vote/1')
    cy.get('[data-cy=voteDeleteButton]').as('voteDeleteButton')

    // when - voteDeleteButton을 클릭한다
    cy.get('@voteDeleteButton').click()

    // then - 삭제 확인 다이얼로그가 뜨는지 확인한다
    cy.get('[data-cy=dialog]').should('be.visible')

    // given - 삭제 확인 다이얼로그에서 비밀번호 인풋을 찾는다
    cy.get('[data-cy=deleteDialogInput]').as('deleteDialogInput')

    // when - 비밀번호를 입력하고 삭제 버튼을 클릭한다
    cy.get('@deleteDialogInput').type('1234')
    cy.get('[data-cy=deleteDialogButton]').click()

    // then - alert가 뜨는지 확인한다
    cy.on('window:alert', (str) => {
      expect(str).to.equal('투표가 삭제되었습니다.')
    })

    // given - 투표 페이지에 접근해 투표 수정하기 버튼을 찾는다
    cy.visit('http://localhost:3000/vote/1')
    cy.get('[data-cy=voteEditButton]').as('voteEditButton')

    // when - voteEditButton을 클릭한다
    cy.get('@voteEditButton').click()

    // then - /vote/1/edit 페이지로 이동한다
    cy.url().should('include', '/vote/1/edit')
  })
})
