import React from 'react';
import ReactDom from 'react-dom';
import { Router, BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import RegPage from './Registration';
import RegForm from './RegForm';


import "@testing-library/jest-dom/extend-expect";
import { shallow, mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';

configure({adapter: new Adapter()});

test('Contains title', () => {
  render(
  <BrowserRouter>
    <RegPage />
  </BrowserRouter>);
  expect(screen.getByText(/this.jobs/i)).toBeInTheDocument();
});


test("Name input field working", () => {
    render(
        <BrowserRouter>
          <RegPage />
        </BrowserRouter>);
    expect(screen.queryByPlaceholderText(/Enter your name/i)).toBeInTheDocument();
});

test("Email input field working", () => {
    render(
        <BrowserRouter>
          <RegPage />
        </BrowserRouter>);
    expect(screen.queryByPlaceholderText(/Email Address/i)).toBeInTheDocument();
});

test("password input field working", () => {
    render(
        <BrowserRouter>
          <RegPage />
        </BrowserRouter>);
    expect(screen.queryByPlaceholderText(/Password/i)).toBeInTheDocument();
});

// test('Login Button test', () => {
//     const {debug, getByText} = render(<BrowserRouter>
//         <RegPage />
//       </BrowserRouter>);
//     expect(getByText('Login').tagName).toBe('BUTTON')
//     fireEvent.click(getByText('Login'))
//     //debug()
// });

test('Registration Button test', () => {
    const {debug, getByText} = render(<BrowserRouter>
        <RegPage />
      </BrowserRouter>);
    expect(getByText('Register').tagName).toBe('BUTTON')
    fireEvent.click(getByText('Register'))
    //debug()
});

test('render correctly the Registration Page component', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <RegPage />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('render correctly the Registration Form component', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <RegForm />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('rendering a component that users /auth/login', () => {
    const history = createMemoryHistory()
    const route = '/auth/login'
    history.push(route)
    render(
      <BrowserRouter history={history}>
        <RegForm />
      </BrowserRouter>)
});

test('Sending the post data to /auth/register', () => {
    const history = createMemoryHistory()
    const route = '/auth/register'
    history.push(route)
    render(
      <BrowserRouter history={history}>
        <RegForm />
      </BrowserRouter>)
});

test('Redirecting to login-page ', () => {
    const history = createMemoryHistory()
    const route = '/'
    history.push(route)
    render(
      <BrowserRouter history={history}>
        <RegForm />
      </BrowserRouter>)
});
