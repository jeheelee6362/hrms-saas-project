import * as dotenv from 'dotenv'
dotenv.config()

const { URI, PORT, SECRET_ACCESS_TOKEN, NAMESPACE } = process.env

export { URI, PORT, SECRET_ACCESS_TOKEN, NAMESPACE }