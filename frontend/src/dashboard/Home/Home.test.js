import React from 'react';
import ReactDom from 'react-dom';
import { Router, BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import Home from './Home';
import NavBar from '../../components/NavBar/NavBar'
import PostCard from './PostCard/PostCard';
import PostBox from '../../components/PostBox/PostBox';

import "@testing-library/jest-dom/extend-expect";
import { shallow, mount, configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16'
import renderer from 'react-test-renderer';

test('Homepage rendered right', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <Home />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('Navbar rendered right', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <NavBar />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('PostBox rendered right', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <PostBox />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('PostCard rendered right', () => {  
    const TextInputComponent = renderer.create(<BrowserRouter>
        <PostCard />
      </BrowserRouter>).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

test('HomePage redirecting to Feed ', () => {
  const history = createMemoryHistory()
  const route = '/feed'
  history.push(route)
  render(
    <BrowserRouter history={history}>
      <Home />
    </BrowserRouter>)
});

test("PostBox : Comment Box working", () => {
  render(
      <BrowserRouter>
        <PostBox />
      </BrowserRouter>);
  expect(screen.queryByPlaceholderText(/What's on your mind?/i)).toBeInTheDocument();
});

test('NavBar app title', () => {
  render(<BrowserRouter>
    <NavBar />
  </BrowserRouter>);
  expect(screen.getByText(/this.jobs/i)).toBeInTheDocument();
  expect()
});

test('NavBar redirecting to home page', () => {
  const history = createMemoryHistory()
  const route = '/home'
  history.push(route)
  render(
    <BrowserRouter history={history}>
      <NavBar />
    </BrowserRouter>)
});

test('NavBar to connections', () => {
  const history = createMemoryHistory()
  const route = '/connections'
  history.push(route)
  render(
    <BrowserRouter history={history}>
      <NavBar />
    </BrowserRouter>)
});

test('NavBar to jobs', () => {
  const history = createMemoryHistory()
  const route = '/jobs'
  history.push(route)
  render(
    <BrowserRouter history={history}>
      <NavBar />
    </BrowserRouter>)
});


test('NavBar to settings', () => {
  const history = createMemoryHistory()
  const route = '/settings'
  history.push(route)
  render(
    <BrowserRouter history={history}>
      <NavBar />
    </BrowserRouter>)
});

test('NavBar to login', () => {
  const history = createMemoryHistory()
  const route = '/login'
  history.push(route)
  render(
    <BrowserRouter history={history}>
      <NavBar />
    </BrowserRouter>)
});






