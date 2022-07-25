import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';

const SessionCreation = () => {
  const [session, setSession] = useState({
    sessionName: '',
    sessionDescription: '',
    sessionManagers: '',
    codeEnabled: false,
    binaryEnabled: false,
    dependencyEnabled: false,
  });

  const [validationMessage, setValdationMessage] = useState({
    sessionName: '',
    sessionDescription: '',
    sessionManagers: '',
    codeEnabled: '',
    binaryEnabled: '',
    dependencyEnabled: '',
  });

  const convertSessionManager = (sessionManager) => {
    sessionManager = sessionManager.trim();
    const sessionManagers = sessionManager.split(',');
    const result = [];
    if (sessionManagers.length) {
      for (let manager of sessionManagers) {
        const name = manager.trim();
        if (name !== '') {
          result.push(name);
        }
      }
    }
    return result;
  };

  const handleSession = (e) => {
    setSession({ ...session, [e.target.name]: e.target.value });
  };

  const handleSessionOption = (e) => {
    setSession({ ...session, [e.target.name]: !session[e.target.name] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(session);

    const sessionManagers = convertSessionManager(session.sessionManagers);

    const data = { ...session, sessionManagers: sessionManagers };

    // test data
    // const data = {
    //   sessionName: '',
    //   sessionDescription: '',
    //   sessionManagers: [],
    //   codeEnabled: false,
    //   binaryEnabled: false,
    //   dependencyEnabled: '',
    // };

    try {
      console.log(data);
      await axios.post('http://localhost:8080/sessions/create', data);
    } catch (e) {
      console.log(e);
      if (e.response.status === 400) {
        if (e.response.data.errors) {
          const errors = e.response.data.errors;
          let messages = {};

          for (let error of errors) {
            messages = {
              ...messages,
              [error.field]: error.message,
            };
          }
          setValdationMessage(messages);
        } else {
        }
      }
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formSessionName">
          <Form.Label>Session Name</Form.Label>
          <Form.Control
            type="text"
            name="sessionName"
            className={validationMessage.sessionName ? 'is-invalid' : ''}
            placeholder=""
            onChange={handleSession}
          />
          <Form.Control.Feedback type="invalid">
            {validationMessage.sessionName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Session Description</Form.Label>
          <Form.Control
            type="text"
            name="sessionDescription"
            className={validationMessage.sessionDescription ? 'is-invalid' : ''}
            placeholder=""
            onChange={handleSession}
          />
          <Form.Control.Feedback type="invalid">
            {validationMessage.sessionDescription}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Session Managers</Form.Label>
          <Form.Control
            type="text"
            name="sessionManagers"
            className={validationMessage.sessionManagers ? 'is-invalid' : ''}
            placeholder=""
            onChange={handleSession}
          />
          <Form.Control.Feedback type="invalid">
            {validationMessage.sessionManagers}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            name="codeEnabled"
            label="Code"
            className={validationMessage.codeEnabled ? 'is-invalid' : ''}
            checked={session.codeEnabled}
            onChange={handleSessionOption}
          />
          <Form.Check
            type="checkbox"
            name="binaryEnabled"
            label="Binary"
            className={validationMessage.binaryEnabled ? 'is-invalid' : ''}
            checked={session.binaryEnabled}
            onChange={handleSessionOption}
          />
          <Form.Check
            type="checkbox"
            name="dependencyEnabled"
            label="Dependency"
            className={validationMessage.dependencyEnabled ? 'is-invalid' : ''}
            checked={session.dependencyEnabled}
            onChange={handleSessionOption}
          />
          <Form.Control.Feedback type="invalid">
            {validationMessage.codeEnabled ||
              validationMessage.binaryEnabled ||
              validationMessage.dependencyEnabled}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default SessionCreation;
