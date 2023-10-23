import { Request, Response } from "express"
import { HTTPError } from "../helper/HTTPError"
import { UserService } from "../service/userService"

export class UserController {
	static async create(req: Request, res: Response) {
		const { name, email,password } = req.body

		if (!name || !email) throw new HTTPError("Missing parameters")

		const userService = new UserService()

		const userAlreadyExists = await userService.findByEmail(email)

		if (userAlreadyExists) throw new HTTPError("User already exists", 409)

		const user = await userService.create({ name, email ,password})

		return res.status(201).json(user)
	}

	static async findAll(req: Request, res: Response) {
		const userService = new UserService()
		const users = await userService.findAll()

		return res.status(200).json(users)
	}

	static async findOne(req: Request, res: Response) {
		const { id } = req.params

		const userService = new UserService()
		const user = await userService.findById(Number(id))

		if (!user) throw new HTTPError("User not found", 404)

		return res.status(200).json(user)
	}

	static async delete(req: Request, res: Response) {
		const { id } = req.params

		if (!id) throw new HTTPError("Missing user id")

		const userService = new UserService()
		const deleted = await userService.delete(Number(id))

		if (!deleted) throw new HTTPError("User not found", 404)

		return res.status(200).json({ deleted })
	}

	static async update(req: Request, res: Response) {
		const { id } = req.params
		const { name, email ,password} = req.body

		if (!id) throw new HTTPError("Missing user id")

		const userService = new UserService()
		const updated = await userService.update(Number(id), { name, email,password })

		if (!updated) throw new HTTPError("User not found", 404)

		return res.status(200).json({ updated })
	}
}
