import React, { useState, useEffect } from 'react';
import './style.css';

function DevForm ({ onSubmit}){
    const [techs,setTechs] = useState('');
    const [github_username,setGithubUsername] = useState('');
    const [ latitude, setLatitude] = useState('');
    const [ longitude, setLongitude] = useState('');

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude} = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);
          },
          (err) => {
            console.log(err);
          },
          {
            timeout: 30000,
          }
        )
    },[]);

    async function handleAddDev(e){
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude
        });

        setGithubUsername('');
        setTechs('');
    }

    return (
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" value={github_username} required onChange={ e => setGithubUsername(e.target.value)}></input>
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" value={techs} required onChange={e => setTechs(e.target.value)}></input>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" type="number" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)}></input>          
            </div>
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" type="number" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)}></input>          
            </div>
          </div>

          <button type="submit">Salvar</button>
        </form>
    );
}

export default DevForm;