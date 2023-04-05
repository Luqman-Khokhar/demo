
import { createServer } from 'miragejs'
import { API_BASE_URL } from 'configs/AppConfig';

import { signInUserData } from './data/authData'

import { authFakeApi } from './fakeApi'

export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
			server.db.loadData({
				// signInUserData
                usersData: [
					{
						id: '1',
						name: 'Carolyn Perkins',
                        email:'Alslaam@lemo.net',
                        password:'Alslaam786'
					},
					{
						id: '2',
						name: 'Terrance Moreno',
                        email:'Alslaam2@lemo.net',
                        password:'Alslaam2786'
					},
					{
						id: '3',
						name: 'Ron Vargas',
					},
				]
			})
		},
        routes() {
            this.urlPrefix = ''
            this.namespace = ''
            this.passthrough(request => {
                const isExternal = request.url.startsWith('http')
                return isExternal
            })
            this.passthrough()
            
            
            authFakeApi(this, API_BASE_URL)
        },
    })
}