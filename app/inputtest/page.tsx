import Input from '@/components/input'
import SearchBar from '@/components/search-bar'

function InputTest() {
  return (
    <>
      <h1>인풋 테스트 페이지</h1>
      <Input
        type="text"
        placeholder="제목을 입력해 주세요"
        data-cy="textInput"
      />
      <Input
        type="password"
        placeholder="비밀번호를 입력해 주세요"
        data-cy="passwordInput"
      />
      <SearchBar data-cy="searchBar" />
    </>
  )
}
export default InputTest
