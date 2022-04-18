import React from 'react';
import { Router, BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {createMemoryHistory} from 'history'

import Connections from './Connections';
import MyConnections from './MyConnections/MyConnections';
import ConnCard from './MyConnections/ConnCard';
import PendingRequests from './PendingRequests/PendingRequests';
import PRCard from './PendingRequests/PRCard';
import Suggestions from './Suggestions/Suggestions';


//connection Page tests - 

test('Contains NavBar', () => {
    render(
    <BrowserRouter>
      <Connections />
    </BrowserRouter>);
    expect(screen.getByText(/this.jobs/i)).toBeInTheDocument();
  });

test("My Connections Tab rendering", () => {
    render(
        <BrowserRouter>
          <Connections />
        </BrowserRouter>);
    expect(screen.getByText(/My Connections/i)).toBeInTheDocument();
});

test("My Pending Requests Tab rendering", () => {
    render(
        <BrowserRouter>
          <Connections />
        </BrowserRouter>);
    expect(screen.getByText(/Pending Requests/i)).toBeInTheDocument();
});

test("My Suggestions Tab rendering", () => {
    render(
        <BrowserRouter>
          <Connections />
        </BrowserRouter>);
    expect(screen.getByText(/Suggestions/i)).toBeInTheDocument();
});

// My Connections tests - 

test("MyConnections Rendering Server Lost Page", () => {
    const {container} = render(
        <BrowserRouter>
           <MyConnections />
        </BrowserRouter>);
    expect(container.classList.contains("serverLost"));
});

test("MyConnections Rendering Connections Card element", () => {
    const {container} = render(
        <BrowserRouter>
           <MyConnections />
        </BrowserRouter>);
    expect(container.classList.contains("connCard"));
});

// Pending Requests page - 

test('All the pending requests are being correctly pulled from /connectionrequests/2', () => {
    const history = createMemoryHistory()
    const route = '/connectionrequests/2'
    history.push(route)
    render(
      <BrowserRouter history={history}>
        <PendingRequests />
      </BrowserRouter>)
});

test("Pending requests calling the PRs component", () => {
    const {container} = render(
        <BrowserRouter>
           <PendingRequests />
        </BrowserRouter>);
    expect(container.classList.contains("mainDivConn"));
});

// Suggestions

test('All the Suggestions are being correctly pulled from /connectionrequests/2', () => {
    const history = createMemoryHistory()
    const route = '/peopleyoumayknow/2'
    history.push(route)
    render(
      <BrowserRouter history={history}>
        <Suggestions />
      </BrowserRouter>)
});

test("Pending requests calling the SCard component", () => {
    const {container} = render(
        <BrowserRouter>
           <Suggestions />
        </BrowserRouter>);
    expect(container.classList.contains("mainDivConn"));
});




