const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringsAsArray');

//index, show, store, update, destroy

module.exports = {
    async index (request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },
    
    async store (request, response) {
        const {github_username, techs, latitude, longitude} = request.body;
        
        let dev = await Dev.findOne({github_username});

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const {name = login, avatar_url, bio} = apiResponse.data;
            
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
         
        return response.json(dev);
    },
    async update (request, response){
        const {github_username, techs, latitude, longitude} = request.body;

        const techsArray = parseStringAsArray(techs);

        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        const {name = login, avatar_url, bio} = apiResponse.data;

        dev = await Dev.findOneAndUpdate(
            {github_username},
            {
                github_username,
                name,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            },
            {
                overwrite: true,
            }
        );
        
        return response.json(dev);
    },
    async destroy (request, response){
        const {github_username} = request.body;
        
        let dev = await Dev.findOneAndDelete({github_username});
        
        return response.json(dev);
    },
};