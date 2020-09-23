import React from 'react';
import { random} from "lodash-es";

import Header from '../components/Header';

export default class App extends React.Component {
  render() {
    const message = 'About webpack.';
    return (
      <div>
        <Header/>
        <p>{message}{random}</p>
      </div>
    );
  }
}
