import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUserUseCase } from "@/use-cases/users/register-user"

export function makeRegisterUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new RegisterUserUseCase(usersRepository)

  return useCase
}
