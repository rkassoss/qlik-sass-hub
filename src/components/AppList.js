import React from 'react';

class AppList extends React.Component {

    constructor () {
        super()
        this.state = { apps: [] }
    }

    componentDidMount(){
        this.getApps(this.props.engine)
    }
    
    //Get list of apps
    getApps = (engine) => {
        console.log(engine);
        engine.then(engine => {
            engine.getDocList().then(apps => {
                //update state with list of apps from object
                this.setState({ apps: apps })
            })
        });
    }

  render() {
    //create a variable containing app state
    const appList = this.state.apps

    return (
      <div>
        <h1>AppList</h1>
        {/* Map over app object and render our app list */}
        <div> {appList.map((appList,i) => <div key={i}> {appList.qDocName} </div>)} </div>
      </div>
    );
  }
}

export default AppList;