import React from "react";

class RelatedTankTable extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tanks: props.tanks,
    };
  }

  static getDerivedStateFromProps = (props) => {
    return props
  }

  render() {
    return (
      <div className="form-group">
        <label>Related Tanks:</label>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tier</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.state.tanks).map((tank_id, i) => {
              const tank = this.state.tanks[tank_id];
              return <tr key={i}>
                  <td>
                    {tank.name}
                  </td>
                  <td>
                    {tank.tier}
                  </td>
                </tr>;
            })}
          </tbody>
          
        </table>
      </div>
    );
  }
}

export default RelatedTankTable;