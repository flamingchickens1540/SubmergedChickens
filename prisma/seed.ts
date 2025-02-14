import { PrismaClient, User, Post } from "@prisma/client"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

async function main() {
    console.log("ERROR: Database seeding needs to be implemented!")

    // await prisma.post.deleteMany() // WARNING: DELETES ALL POSTS
    // await prisma.user.deleteMany() // WARNING: DELETES ALL USERS

    // const users = await seedUsers()
    // await seedPosts(users)
}

// async function seedUsers() {
//     const users: User[] = []
//     for (let i = 1; i <= 10; i++) {
//         users.push({
//             id: i,
//             name: faker.person.fullName(),
//         })
//     }
//     await prisma.user.createMany({ data: users })

    return await prisma.user.findMany()
}

async function seedTags() {
    const tags: Tag[] = []

    let category_roles = {
        roles: ["defender", "algae", "coral"],
        matchplay: ["heavily-defended", "gamepiece-stuck", "tipped-over"],
        damage: ["lost-comms", "bumper-damage", "mech-fail"],
    }

    let id = 0
    for (let key in category_roles) {
        for (let i = 0; i < category_roles[key].length; i++) {
            tags.push({
                id: id++,
                name: category_roles[key][i],
                category: key,
            })
        }
    }

    await prisma.tag.createMany({ data: tags })

    return await prisma.tag.findMany()
}

async function seedTeams() {
    const teams: Team[] = []
    for (let i = 1100; i <= 1116; i++) {
        teams.push({
            key: i,
            name: faker.commerce.productName() + "s",
        })
    }
    return await prisma.team.createMany({ data: teams })
}

async function clearDB() {
    await prisma.eventState.deleteMany()
    await prisma.event.deleteMany()
    await prisma.user.deleteMany()
    await prisma.tag.deleteMany()
    await prisma.team.deleteMany()
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
