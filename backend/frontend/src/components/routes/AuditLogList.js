import React from 'react';
import apiClient from "../../apis/favoriteThings";

const mapLogEntryNumberToString = { 0: "CREATE", 1: "UPDATE", 2: "DELETE"};

export default class AuditLogList extends React.Component {

  constructor(props){
    super(props);
    this.state = { logEntries: []};
  }

  componentDidMount() {
    apiClient.get('/log-entries/')
        .then(response=>{
          this.setState({ logEntries: response.data});
        });
  }

  renderList() {

    return this.state.logEntries.map(logEntry => {
      return (
          <tr>
            <td data-label="Timestamp">{logEntry.timestamp}</td>
            <td data-label="Entity">{logEntry.object_repr}</td>
            <td data-label="Action">{mapLogEntryNumberToString[logEntry.action]}</td>
            <td data-label="Changes">{logEntry.changes}</td>
          </tr>
      );
    });
  }

  render() {
    return (
        <div>
          <h2>Audit Log</h2>
          <table className="ui celled table">
            <thead>
            <tr>
              <th>Timestamp</th>
              <th>Entity</th>
              <th>Action</th>
              <th>Changes</th>
            </tr>
            </thead>
            <tbody>
              {this.renderList()}
            </tbody>
          </table>
        </div>
    );
  }

}
