import React from 'react';
import { Router, BrowserRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import {createMemoryHistory} from 'history'
import Settings from './Settings'
import SettingsCard from './SettingsCard'
import MyProfile from './MyProfile/MyProfile'

//settings

test('Contains NavBar', () => {
    render(
    <BrowserRouter>
      <Settings />
    </BrowserRouter>);
    expect(screen.getByText(/this.jobs/i)).toBeInTheDocument();
  });

test("Renders Settings Card", () => {
    const {container} = render(
        <BrowserRouter>
           <Settings />
        </BrowserRouter>);
    expect(container.classList.contains("App"));
});

//settings card
test("Renders settingsPageBoxInfo", () => {
    const {container} = render(
        <BrowserRouter>
           <SettingsCard />
        </BrowserRouter>);
    expect(container.classList.contains("settingsPageBoxInfo"));
});

test("Renders linkDisplay", () => {
    const {container} = render(
        <BrowserRouter>
           <SettingsCard />
        </BrowserRouter>);
    expect(container.classList.contains("linkDisplay"));
});

//My Profile
test('hits the user profile API - /userprofile/', () => {
    const history = createMemoryHistory()
    const route = '/userprofile/'
    history.push(route)
    render(
      <BrowserRouter history={history}>
        <MyProfile />
      </BrowserRouter>)
});

