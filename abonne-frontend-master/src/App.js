import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';
import bookFlight from './flight/bookFlight';
import flightCosts from './flight/flightCosts';
import tripsConfirmation from './flight/tripsConfirmation';
import Policies from './captin/Policies';
import RegistrationSteps from './captin/Registration_steps';
import StepOne from './captin/StepOne';
import RegistrationIsDone from './captin/RegistrationIsDone';

import HomeEng from './en/Home_eng';
import flightCostsEng from './en/flight/flightCosts';
import bookFlightEng from './en/flight/bookFlight';
import tripsConfirmationEng from './en/flight/tripsConfirmation';
import PoliciesEn from './en/captin/Policies';
import RegistrationStepsEn from './en/captin/Registration_steps';
import StepOneEn from './en/captin/StepOne';
import RegistrationIsDoneEn from './en/captin/RegistrationIsDone';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route path="/" component={Home} exact />
        <Route path="/Policies" component={Policies} exact />
        <Route path="/Registration_steps" component={RegistrationSteps} exact />
        <Route path="/StepOne" component={StepOne} />
        <Route path="/RegistrationIsDone" component={RegistrationIsDone} />
        <Route path="/bookFlight" component={bookFlight} exact />
        <Route path="/flightCosts" component={flightCosts} exact />
        <Route path="/tripsConfirmation" component={tripsConfirmation} exact />

        <Route path="/en/home" component={HomeEng} exact />
        <Route path="/en/flightCosts" component={flightCostsEng} exact />
        <Route path="/en/bookFlight" component={bookFlightEng} exact />
        <Route path="/en/flight/tripsConfirmation" component={tripsConfirmationEng} exact />
        <Route path="/en/Policies" component={PoliciesEn} exact />
        <Route path="/en/RegistrationSteps" component={RegistrationStepsEn} exact />
        <Route path="/en/StepOne" component={StepOneEn} exact />
        <Route path="/en/RegistrationIsDone" component={RegistrationIsDoneEn} />
      </div>
    </BrowserRouter>
  );
}

export default App;
