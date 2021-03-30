//se me ocurrio poner esto por separado cuando hice la ruleta
import axios, { AxiosResponse } from 'axios'
import { DemonResultsByName, DemonResultsByPosition } from '.'


async function getDemonByTop(position: string | number) {
  const getDemon: AxiosResponse<DemonResultsByPosition> = await axios(`https://pointercrate.com/api/v1/demons/${position}`)
  return getDemon.data.data
}
async function getDemonByName(name: string) {
  
  const url: AxiosResponse<DemonResultsByName[]> = await axios(`https://pointercrate.com/api/v1/demons/?limit=100`)
  const findDemon = url.data.filter((demon) => demon.name.toLowerCase() === name)
  const getDemonPosition = String(findDemon[0].position)
  return getDemonByTop(getDemonPosition)
  
}


export { getDemonByTop, getDemonByName }
