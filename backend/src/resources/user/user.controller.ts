import { Router } from 'express'
import { UserService } from '~/resources/user/user.service'
import { BadRequestException, NotFoundException } from '~/utils/exceptions'

const UserController = Router()


const service = new UserService()

UserController.get('/', (req, res) => {
  return res
    .status(200)
    .json(service.findAll())
})

UserController.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    throw new BadRequestException('ID is not valid')
  }

  const user = service.findOne(id)

  if (!user) {
    throw new NotFoundException('User not found')
  }

  return res
    .status(200)
    .json(user)
})

UserController.post('/', (req, res) => {
  const createdUser = service.create(req.body)

  return res
    .status(201)
    .json(createdUser)
})

UserController.patch('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    throw new BadRequestException('invalid ID')
  }

  const updatedUser = service.update(req.body, id)

  return res
    .status(200)
    .json(updatedUser)
})

UserController.delete('/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    throw new BadRequestException('invalid ID')
  }

  return res
    .status(200)
    .json(service.delete(id))
})

/**
 * On expose notre controller pour l'utiliser dans `src/index.ts`
 */
export { UserController }