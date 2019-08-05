import axios from 'axios'
const JwtToken = 'token'
const api = axios.create({
	baseURL: 'http://localhost:3001',
	headers: {
		Authorization: `Bearer ${JwtToken}`,
		'Access-Control-Allow-Origin': '*'
	}
})

export const getProducts = async () => {
	try {
		const resp = await api.get('/apparel')
		return resp.data
	} catch (error) {
		throw error
	}
}

export const getProduct = async (id) => {
	try {
		const resp = await api.get(`/apprel/${id}`)
		return resp.data
	} catch (error) {
		throw error
	}
}
