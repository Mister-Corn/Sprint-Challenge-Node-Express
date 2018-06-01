import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProjectDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: {},
      loading: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.location.state;
    console.log('ProjectDetail.js CDM id:',id);
    axios.get(`http://localhost:5000/api/projects/${id}`)
      .then(res => {
        console.log("ProjectDetail.js CDM res.data",res.data);
        this.setState({ project: res.data, loading: false });
      })
      .catch(err => {
        console.log("ProjectDetail.js CDM error:",err);
      })
  }

  render() {
    const { id, name, description, actions, completed } = this.state.project;
    console.log("this.state.project:",id,name,description,actions,completed);

    const displayActions = (actions) => {
      if (actions) {
        return actions.map(action => {
            const { id, description, notes } = action;
            return (
              <article key={id} className="mh2 mw5 mw6-ns br3 hidden ba b--black-10 mv4">
                <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{description}</h1>
                <div className="pa3 bt b--black-10">
                  <p className="f6 f5-ns lh-copy measure">
                    {notes}
                  </p>
                </div>
              </article>
            );
          });
      }
    };

    return (
      <article style={{width:"96rem"}} className="center hidden ba mv4">
        <h1 className="f4 bg-near-black white mv0 pv2 ph3">{name}</h1>
        <div className="pa3 bt">
          <p className="f6 f5-ns lh-copy measure mv0">
            {description}
          </p>
          <hr />
            {
                this.state.loading ?
                  <p>"Loading"</p>
                :
                  displayActions(actions)
            }
        </div>
      </article>
    )
  }
}

export default ProjectDetail;