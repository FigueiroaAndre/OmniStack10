const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request,response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request,response) {
        const { github_username, techs , latitude, longitude } = request.body;

        let dev = await Dev.findOne( {github_username} );

        if ( !dev ){            
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            //async afirma que a função é assincrona e permite o uso de await
            //await faz com que nosso programa espere a api do github responder nossa request
            const { name = login, bio, avatar_url } = apiResponse.data;
            
            // const techsArray = techs.split(',').map( tech => tech.trim());
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude,latitude]
            };

            dev = await Dev.create({
                github_username,
                name,
                bio,
                avatar_url,
                techs : techsArray,
                location
            })
        }
            
        return response.json(dev);
    },

    async update(request,response){
        //alterar a bio e as techs
        const { github_username, bio , techs} = request.body;

        let dev = await Dev.findOne( {github_username} );
        dev.bio = bio;
        dev.techs = techs
        await dev.save();
    
        return response.json(dev);
    },

    async destroy(request,response){
        const { github_username } = request.params;

        let dev = await Dev.findOne( {github_username});
        await Dev.deleteOne( { _id: dev._id} );
        return response.json({
            "github_username": github_username,
            "message": "Deleted!"
        });
    }
};