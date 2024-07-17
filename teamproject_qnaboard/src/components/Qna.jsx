import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';

function Qna() {
    return (
    <Container>
        <div className='divcss' style={{marginRight:'3em', marginLeft:'3em'}}>            
            <Link to="/qnaPostList">QnA 게시판</Link>
            <br />
        <div>
          <h6>주문 및 배송</h6>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Q.1 주문한 상품이 안 왔어요</Accordion.Header>
              <Accordion.Body>
                <p>
                  멍쓰냥쓰의 모든 상품은 CJ대한통운을 통해 배송됩니다. 배송 시작 시점 이후에는 운송장 번호를 통해 택배사에 문의해주시길 바랍니다.
                  <br />
                  주문 상품이 주문일 기준 7일 이내에 배송이 시작되지 않았거나, (도서산간지역을 제외한 국내 배송의 한하여)배송 시작 시점부터 14일 이내에 도착하지 않았을 경우 고객센터에 문의해주시길 바랍니다.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Accordion Item #2</Accordion.Header>
              <Accordion.Body>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          </div>
        </div>
    </Container>
    );
}

export default Qna;