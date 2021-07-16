import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';


const GeneratedMeme = () => {

    const history = useHistory();
    const location = useLocation();
    let trimmed = location.search.slice(location.search.indexOf("=") + 1);
    console.log("trim me senpai",trimmed)
    console.log(history);


    return (
        <div>
            <button onClick = {() => history.push('/')}> go back</button>
            <img src={trimmed}/>            
        </div>
    )
};

export default GeneratedMeme;
