import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; //for bootstrap

const GitHubProfiles = ({userData}) => {
    console.log('userData',userData)
    let showData='NotAvailable';
    if(userData){
        showData=(
             <div className="card" style={{width: '10rem'}}>
                    <img className="card-img-top" src={userData.avatar_url}/>
                    <div className="card-body">
                        <h5 className="card-title">{userData.login}</h5>
                        <a className="btn btn-primary" href={userData.html_url}>Github Profile</a>
                    </div>
                </div>
        )
    }
    return showData;
};

export default GitHubProfiles;