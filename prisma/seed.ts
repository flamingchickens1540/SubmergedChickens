import { PrismaClient, User, Post } from "@prisma/client"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

async function main() {
    await prisma.post.deleteMany() // WARNING: DELETES ALL POSTS
    await prisma.user.deleteMany() // WARNING: DELETES ALL USERS

    const users = await seedUsers()
    await seedPosts(users)
}

async function seedUsers() {
    const users: User[] = []
    for (let i = 1; i <= 10; i++) {
        users.push({
            id: i,
            name: faker.person.fullName(),
        })
    }
    await prisma.user.createMany({ data: users })

    return await prisma.user.findMany()
}

async function seedPosts(users: User[]) {
    const posts: Post[] = []
    for (let i = 1; i <= 50; i++) {
        posts.push({
            id: i,
            title: faker.commerce.productName(),
            content: faker.lorem.paragraph({ min: 5, max: 25 }),
            authorId: users[Math.floor(Math.random() * users.length)].id,
        })
    }
    return await prisma.post.createMany({ data: posts })
}

await main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
