import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { RegisterUserUseCase } from "@/use-cases/users/register-user"
import { SessionUserUseCase } from "@/use-cases/users/session-user"

export function makeSessionUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const useCase = new SessionUserUseCase(usersRepository)

  return useCase
}
