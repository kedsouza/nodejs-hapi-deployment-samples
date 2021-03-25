'use strict';

const dbFunc = require("./db")

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: process.env.PORT || 3000, // Document
        host: '0.0.0.0' // Document
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            console.log(__dirname)
            return h.file(__dirname + '/index.html')
        }
    });

    server.route({
        method: 'GET',
        path: '/api',
        handler:  (request, h) => {
            return dbFunc.getNames();
        }
    });

    server.route({
        method: 'POST',
        path: '/api',
        handler: (request, h) => {
            const payload = request.payload;
            if (payload.name === undefined || payload.name === "") {
                return h.response('Could not find first name in request.').code(400)
            }
            return dbFunc.addName(payload.name)
        }
    })

    server.route({
        method: 'PATCH',
        path: '/api', 
        handler: (request, h) => {
            const payload = request.payload
             if (payload.id === undefined || payload.id === "") {
                return h.response('Could not find name id request.').code(400)
            }


            if (payload.name === undefined || payload.name === "") {
                return h.response('Could not find name in request.').code(400)
            }

            return dbFunc.findName(payload.id)
            .then ( () => { return dbFunc.editName(payload.id, payload.name);})
            .catch ( () => { return h.response("Could not find name assoicated with that ID").code(400)})
        }
    })

      server.route({
        method: 'PUT',
        path: '/api', 
        handler: (request, h) => {

            const payload = request.payload;
            if (payload.name === undefined || payload.name === "") {
                return h.response('Could not find name in request.').code(400)
            }
            return dbFunc.findName(payload.id)
            .then( () => { return dbFunc.editName(payload.id, payload.name) })
            .catch ( () => {return dbFunc.addName(payload.name) })

        }
    })

    server.route({
        method: 'DELETE', 
        path: '/api',
        handler: (request, h) => {
            const payload = request.payload;
            if (payload.id === undefined || payload.id === "") {
                return h.response('Could not find id in the request.').code(400)
            }

            return dbFunc.findName(payload.id)
            .then ( () => { return dbFunc.deleteName(payload.id) })
            .catch ( () =>  { return h.response("Could not find name assoicated with that ID").code(400)})
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
    server.events.on('request', (request, event, tags) => { // Document
        if (tags.error) {
            console.log(`Request ${event.request} error: ${event.error ? event.error.message : 'unknown'}`);
        }
    });

};

init();