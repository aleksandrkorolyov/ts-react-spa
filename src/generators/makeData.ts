import { faker } from '@faker-js/faker'

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  subRows?: Person[]
}

const newPerson = (user:any): Person => {
  return {
    firstName: user.first_name,
    lastName: user.last_name,
    age: faker.number.int({ max: 40 }),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
  }
}

export async function makeData(...lens: number[]) {

  try {
    const res = await fetch('https://random-data-api.com/api/v2/users?size=10').then(res => res.json());
    const arr = res.map((user: any) => {
      return {...newPerson(user) }
    })  
    return arr
  } catch (error) {
    console.log(error)
  }
}