import React from 'react';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { Container } from 'react-bootstrap';
import '../css/qna.css';

function Qna() {
    return (
    <Container>
        <div id='FAQ'>    
          <div className='main-title'>
            <br />
            <h1>자주 묻는 질문</h1>
            <br />
              <p>많은 분들이 문의하신 질문입니다. <br />이 외의 문의사항은&nbsp;
              <Link to="/qnaPostList">QnA 게시판</Link> 페이지에 이용해주시길 바랍니다.
              </p>
          </div>
          <br /><hr />        
        <div className='FAQ-1'>
          <p className='FAQ-title'>주문 및 배송</p>
            <Accordion className='aco'>
            {/* <Accordion defaultActiveKey={['0']} alwaysOpen> */}
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
              <Accordion.Header>Q.2 배송지를 잘못입력했어요</Accordion.Header>
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
              <Accordion.Header>Q.3 배송완료라고 뜨는데 상품을 못 받았어요</Accordion.Header>
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
              <Accordion.Header>Q.4 추가로 상품을 주문하고 싶은데 이미 주문한 상품과 함께 받을 수 있나요?</Accordion.Header>
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
            <Accordion.Item eventKey="4">
              <Accordion.Header>Q.5 상품 재입고 예정이 어떻게 되나요?</Accordion.Header>
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

          <div className='FAQ-1'>
          <p className='FAQ-title'>로그인 및 회원정보</p>
            <Accordion className='aco'>
            {/* <Accordion defaultActiveKey={['0']} alwaysOpen> */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Q.1 회원가입은 어떻게 하나요?</Accordion.Header>
              <Accordion.Body>
                <p>
                  멍쓰냥쓰의 모든 상품은 CJ대한통운을 통해 배송됩니다. 배송 시작 시점 이후에는 운송장 번호를 통해 택배사에 문의해주시길 바랍니다.
                  <br />
                  주문 상품이 주문일 기준 7일 이내에 배송이 시작되지 않았거나, (도서산간지역을 제외한 국내 배송의 한하여)배송 시작 시점부터 14일 이내에 도착하지 않았을 경우 고객센터에 문의해주시길 바랍니다.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Q.2 비밀번호를 모르겠어요</Accordion.Header>
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
              <Accordion.Header>Q.3 기본 배송지를 바꾸고 싶어요</Accordion.Header>
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
              <Accordion.Header>Q.4 아이디를 바꾸고 싶어요</Accordion.Header>
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
            <Accordion.Item eventKey="4">
              <Accordion.Header>Q.5 회원탈퇴는 어떻게 하나요?</Accordion.Header>
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

          <div className='FAQ-1'>
          <p className='FAQ-title'>사이트 이용</p>
            <Accordion className='aco'>
            {/* <Accordion defaultActiveKey={['0']} alwaysOpen> */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Q.1 모바일 사용법이 궁금해요</Accordion.Header>
              <Accordion.Body>
                <p>
                  멍쓰냥쓰의 모든 상품은 CJ대한통운을 통해 배송됩니다. 배송 시작 시점 이후에는 운송장 번호를 통해 택배사에 문의해주시길 바랍니다.
                  <br />
                  주문 상품이 주문일 기준 7일 이내에 배송이 시작되지 않았거나, (도서산간지역을 제외한 국내 배송의 한하여)배송 시작 시점부터 14일 이내에 도착하지 않았을 경우 고객센터에 문의해주시길 바랍니다.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Q.2 장바구니 기능은 무엇인가요?</Accordion.Header>
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
              <Accordion.Header>Q.3 정보를 SNS에 공유하고 싶어요</Accordion.Header>
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