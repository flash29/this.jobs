import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from './LoginPage';
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import "@testing-library/jest-dom/extend-expect";
import { shallow, mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';
import {createMemoryHistory} from 'history'
//const renderer = require('react-test-renderer'); 
//import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

test('Contains title', () => {
  render(
  <BrowserRouter>
    <LoginPage />
  </BrowserRouter>);
  expect(screen.getByText(/this.jobs/i)).toBeInTheDocument();
});

test("Email input field working", () => {
    render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>);
    expect(screen.queryByPlaceholderText(/Email Address/i)).toBeInTheDocument();
});

test("password input field working", () => {
    render(
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>);
    expect(screen.queryByPlaceholderText(/Password/i)).toBeInTheDocument();
});

test('Login Button test', () => {
    const {debug, getByText} = render(<BrowserRouter>
        <LoginPage />
      </BrowserRouter>);
    expect(getByText('Login').tagName).toBe('BUTTON')
    fireEvent.click(getByText('Login'))
    //debug()
});


test('Registration Button test', () => {
    const {debug, getByText} = render(<BrowserRouter>
        <LoginPage />
      </BrowserRouter>);
    expect(getByText('Register').tagName).toBe('BUTTON')
    fireEvent.click(getByText('Register'))
    //debug()
});

test('render correctly the LoginPage component', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <LoginPage />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('render correctly the LoginForm component', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <LoginForm />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('Sending the post data to /auth/login', () => {
  const history = createMemoryHistory()
  const route = '/auth/register'
  history.push(route)
  render(
    <BrowserRouter history={history}>
      <LoginPage />
    </BrowserRouter>)
});

test('Redirecting to register page ', () => {
  const history = createMemoryHistory()
  const route = '/registration'
  history.push(route)
  render(
    <BrowserRouter history={history}>
      <LoginPage />
    </BrowserRouter>)
});

test('Redirecting to home page ', () => {
  const history = createMemoryHistory()
  const route = '/home'
  history.push(route)
  render(
    <BrowserRouter history={history}>
      <LoginPage />
    </BrowserRouter>)
});
