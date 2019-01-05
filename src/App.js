import React, { Component } from 'react';
import './App.css';
import TankSelect from './component/TankSelect'
import RelatedTankTable from './component/RelatedTankTable'
import { getModules, getTanksById } from './logic/wargamingRequests'

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      relatedTanks: {},
      selectedTank: null,
      tanks: {},
    };
  }

  select_tank = async (tank) => {
    this.setState({
      selectedTank: tank,
    })
    const tankModules = await getModules(tank.module_ids);
    let relatedTankIds = Object.keys(tankModules)
      .map(module_id => tankModules[module_id].tanks)
      .flat();

    relatedTankIds = relatedTankIds
      .filter((tank_id, index) => {
        return relatedTankIds.indexOf(tank_id) === index;
      });

    console.log(relatedTankIds)

    const relatedTanks = await getTanksById(relatedTankIds);
    this.setState({
      relatedTanks,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <TankSelect onSelectTank={this.select_tank}/>
          <RelatedTankTable tanks={this.state.relatedTanks}/>
        </header>
      </div>
    );
  }
}

export default App;
