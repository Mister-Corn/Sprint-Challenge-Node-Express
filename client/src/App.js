import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route } from 'react-router-dom';
import ProjectDetail from './ProjectDetail';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      loading: false,
    }
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        console.log("App.js CDM projects:",res);
        this.setState({ projects: res.data });
      })
      .catch(err => {
        console.log("App.js CDM error:",err);
      });
  }

  render() {
    const ProjectGallery = () => {
      return (
        <div className="project-gallery flex flex-wrap justify-content-center">
          {
            this.state.projects.map(project => {
              const { id, name, description, completed } = project;
              return (
                <Link key={id} to={{
                  pathname: `/project/${id}`,
                  state: {
                    ...project,
                  }
                }}>
                  <article className="mh2 mw5 mw6-ns br3 hidden ba b--black-10 mv4">
                    <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">{name}</h1>
                    <div className="pa3 bt b--black-10">
                      <p className="f6 f5-ns lh-copy measure">
                        {description}
                      </p>
                    </div>
                  </article>
                </Link>
              );
            })
          }
        </div>
      );
    };

    return (
      <div className="App">
        <div className="header">
          <Link to="/"><h1 className="tc underline">Project Board</h1></Link>
        </div>
        <Route exact path="/" component={ProjectGallery} />
        <Route path="/project/:projectId" component={ProjectDetail} />
      </div>
    );
  }
}

export default App;
