import { React, useEffect, useState } from 'react'
import { Container, Row, Col, Accordion, Dropdown, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Sort = () => {
  const { popularMovies } = useSelector((state) => state.movie)
  const [filter, setFilter] = useState([])
  // console.log(popularMovies)

  // 평점 오름차순으로 정렬해주는 함수
  const movieSorted = (keyword, sortMethod) => {
    /**React에서 state는 불변성을 유지해야 하기 때문에
     * 전개 연산자를 통해서 새로운 배열을 생성하고 sort() 함수를 실행해야 한다.
     * 정렬된 배열을 state에 다시 초기화해주면 영화정보가 정렬되어 출력된다.
     */
    let list = [...filter]
    let result = []
    if (keyword === '평점') {
      result =
        sortMethod === 'asc'
          ? list.sort((a, b) => a.popularity - b.popularity)
          : list.sort((a, b) => b.popularity - a.popularity)
    } else if (keyword === '인기도') {
      result =
        sortMethod === 'asc'
          ? list.sort((a, b) => a.vote_average - b.vote_average)
          : list.sort((a, b) => b.vote_average - a.vote_average)
    } else if (keyword === '제목') {
      result =
        sortMethod === 'asc'
          ? list.sort((a, b) => a.title.localeCompare(b.title))
          : list.sort((a, b) => b.title.localeCompare(a.title))
    }

    setFilter(result)
  }

  useEffect(() => {
    if (popularMovies.length !== 0) {
      setFilter(popularMovies)
    }
  }, [])

  return (
    <div>
      <Container>
        <Row>
          <Col sm>
            <h1>인기영화 필터링</h1>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            {' '}
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>정렬</Accordion.Header>
                <Accordion.Body>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                      정렬방식을 선택하세요
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href="#/action-1"
                        onClick={() => movieSorted('제목', 'asc')}
                      >
                        제목 오름차순
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-2"
                        onClick={() => movieSorted('제목', 'desc')}
                      >
                        제목 내림차순
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-3"
                        onClick={() => movieSorted('평점', 'asc')}
                      >
                        평점 오름차순
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-4"
                        onClick={() => movieSorted('평점', 'desc')}
                      >
                        평점 내림차순
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-5"
                        onClick={() => movieSorted('인기도', 'asc')}
                      >
                        인기도 오름차순 가보자구!
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-6"
                        onClick={() => movieSorted('인기도', 'desc')}
                      >
                        인기도 내림차순
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col sm={9} className="sort-card-list">
            {filter.map((item) => (
              <Card
                style={{
                  width: '12rem',
                  marginBottom: '10px',
                  marginLeft: '20px',
                }}
              >
                <Card.Img
                  variant="top"
                  src={`https://www.themoviedb.org/t/p/w220_and_h330_face${item.poster_path}`}
                />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>{item.release_date}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Sort
