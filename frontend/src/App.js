import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListUserComponent from './components/ListUserComponent';
import CreateUserComponent from './components/CreateUserComponent';
import UpdateUserComponent from './components/UpdateUserComponent';
import ViewUserComponent from './components/ViewUserComponent';
import ListCampaignComponentFunctional from './components/ListCampaignComponentFunctional';
import CreateCampaignComponent from './components/CreateCampaignComponent';
import UpdateCampaignComponent from './components/UpdateCampaignComponent';
import ViewCampaignComponent from './components/ViewCampaignComponent';
import OptionsComponent from './components/OptionsComponent';
import Login from './components/Login/Login';
import NewCampaignForm from './components/NewCampaignForm/NewCampaignForm';
import CampaignDetails from './components/CampaignDetails/CampaignDetails';

function App() {

  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container content-center">
          <Routes>
            <Route path="/" element={<Login/>}></Route>
            <Route path="/users" element={<ListUserComponent/>}></Route>
            <Route path="/add-user/:id" element={<CreateUserComponent/>}></Route>
            <Route path="/view-user/:id" element={<ViewUserComponent/>}></Route>
            <Route path="/update-user/:id" element={<UpdateUserComponent/>}></Route>
            <Route path="/campaigns" element={<ListCampaignComponentFunctional />}></Route>
            <Route path="/add-campaign/:id" element={<CreateCampaignComponent/>}></Route>
            <Route path="/view-campaign/:id" element={<ViewCampaignComponent/>}></Route>
            <Route path="/update-campaign/:id" element={<UpdateCampaignComponent/>}></Route>
            <Route path="/options/:id" element={<OptionsComponent/>}></Route>
            <Route path="newCampaignForm" element={<NewCampaignForm/>}></Route>
            <Route path='campaignDetails' element={<CampaignDetails/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;