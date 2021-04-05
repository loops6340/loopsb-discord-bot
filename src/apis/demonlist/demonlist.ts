//se me ocurrio poner esto por separado cuando hice la ruleta
import axios, { AxiosResponse } from 'axios'
import { DemonResultsByName, DemonResultsByPosition } from '.'

const URL = "https://pointercrate.com/api/v1"

async function getDemonByTop(position: string | number) {
  const getDemon: AxiosResponse<DemonResultsByPosition> = await axios(`${URL}/demons/${position}`)
  return getDemon.data.data
}
async function getDemonByName(name: string) {
  
  const res: AxiosResponse<DemonResultsByName[]> = await axios(`${URL}/demons/?limit=100`)
  const findDemon = res.data.filter((demon) => demon.name.toLowerCase() === name)
  const getDemonPosition = String(findDemon[0].position)
  return getDemonByTop(getDemonPosition)
  
}


export { getDemonByTop, getDemonByName }
