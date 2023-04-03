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
    getApps = async (qlik) => {
        // engine.then(engine => { // in saas we use endpoint "/items" to get apps
        //     engine.getDocList().then(apps => {
        //         //update state with list of apps from object
        //         this.setState({ apps: apps })
        //     })
        // });
      
        qlik.then(qlik => {
          console.log(qlik);
          this.setState({ apps: qlik.apps.data })
          this.setState({ tenantUri: qlik.tenantUri })
        });

    }

  render() {
    //create a variable containing app state
    const appList = this.state.apps
    const tenantUri = this.state.tenantUri
      
    return (
      <div>
        <h1>AppList</h1>
        {/* Map over app object and render our app list */}
        <div> {appList.map((app,i) => {
            return (
              <div style={{
                borderBottom: '1px solid'
              }} key={i}>
                <img src={tenantUri + app.thumbnailId} alt={app.name} />
                {app.name}</div>
            )
        })} </div>
      </div>
    );
  }
}

export default AppList;