/* global chrome */

import React, { useState } from 'react';
import logo from './logo-small.png';
import './index.css';
import { Button, hexToRgb } from '@material-ui/core';
import Fancy_button from './Fancy_button';
import naturalLanguageUnderstanding from './watsonIntegration';

console.log(logo);

export default function Popup(){

  const [summary, setSummary] = useState();

  return(
    <div>
      <div className = "container">
      <img src={logo} className="Logo" alt="logo" />
      <blockquote>
        <h1> Welcome to Haystats! </h1>
      </blockquote>
      </div>

      <div className = "button">
        <Fancy_button variant="outlined" color="default" setSummary={setSummary}/>
      </div>

    <br/>

    <h1>{summary?.title}</h1>
    {summary?.sections.map(section => (
      <section>
        <h3>{section.sectionTitle}</h3>
        <ul>{section.information.map(item => (<li>{item}</li>))}</ul>
      </section>
    ))}

    {/* Call the function */}
    {/* <script type="text/javascript" src="watsonIntegration.js"></script> */}
    </div>
   );
 };