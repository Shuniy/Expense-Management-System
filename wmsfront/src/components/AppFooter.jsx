import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function AppFooter() {
    return (
        <div>
      <footer style={{margin:"5px 0"}}>
        <Container>
          <Row>
            <Col className="text-center py-5">
              No Copyright &copy; WealthManagementApp
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
    )
}

export default AppFooter
