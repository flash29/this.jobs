import React from 'react';
import { Router, BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import Search from './Search';

test("NavBar is rendering", () => {
    const {container} = render(
        <BrowserRouter>
           <Search />
        </BrowserRouter>);
    expect(container.classList.contains("NaviBar"));
});

test("Search textbox functioning", () => {
    const {container} = render(
        <BrowserRouter>
           <Search />
        </BrowserRouter>);
    expect(container.classList.contains("optionSearch"));    
});

test("People div functioning", () => {
    const {container} = render(
        <BrowserRouter>
           <Search />
        </BrowserRouter>);
    expect(container.classList.contains("peopleID"));    
});

test("Jobs div functioning", () => {
    const {container} = render(
        <BrowserRouter>
           <Search />
        </BrowserRouter>);
    expect(container.classList.contains("JobsID"));    
});

test("Displaying all Search Components", () => {
    const {container} = render(
        <BrowserRouter>
           <Search />
        </BrowserRouter>);
    expect(container.classList.contains("cardDisplay"));    
});
