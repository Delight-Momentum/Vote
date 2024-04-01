import sum from '@/app/sum'

test('adds 2 + 3 to equal 5', () => {
  expect(sum(2, 3)).toBe(5)
})

test('adds 2 + 4 to equal 6', () => {
  expect(sum(2, 4)).toBe(6)
})

test('adds 3 + 4 to equal 7', () => {
  expect(sum(3, 4)).toBe(7)
})

test('adds 5 + 4 to equal 9', () => {
  expect(sum(5, 4)).toBe(9)
})

test('adds 6 + 4 to equal 10', () => {
  expect(sum(2, 3)).toBe(5)
})

test('adds 1 + 4 to equal 10', () => {
  expect(sum(1, 4)).toBe(5)
})
