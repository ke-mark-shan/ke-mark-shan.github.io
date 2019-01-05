import React from "react";
import { getAllTanks } from '../logic/wargamingRequests'

class TankSelect extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tanks: {},
      selectedTankId: 'select',
      related_tanks: {},
    };
  }

  async componentDidMount() {
    const tanks = await getAllTanks();
    this.setState({ tanks });
  }

  onChange(e) {
    const selectedTankId = e.target.value;
    this.setState({
      selectedTankId,
    })
    this.props.onSelectTank(this.state.tanks[selectedTankId])
  }

  render() {
    return (
      <div className="form-group">
        <label htmlFor="selectTank" >Tanks:</label>
        <select value={this.state.selectedTankId} onChange={this.onChange.bind(this)} className="form-control">
          {Object.keys(this.state.tanks).map((tank_id, i) => {
            const tank = this.state.tanks[tank_id];
            return <option value={tank.tank_id} key={i} >{tank.name}</option>
          })}
        </select>
      </div>
    );
  }
}

export default TankSelect;