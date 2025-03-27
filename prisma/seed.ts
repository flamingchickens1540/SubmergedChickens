import {
    PrismaClient,
    Event,
    EventState,
    User,
    Tag,
    TeamEvent,
    TeamMatch,
    Comparison,
    Team,
} from "@prisma/client"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

async function main() {
    await clearDB()

    await seedEvent()
    await seedEventState()
    await seedUsers()
    await seedTags()
    await seedTeams()
}

async function seedEvent() {
    await prisma.event.createMany({
        data: {
            event_key: "2025demo",
        },
    })
}

async function seedEventState() {
    await prisma.eventState.createMany({
        data: {
            id: 0,
            event_key: "2025demo",
            stream_url: "https://www.twitch.tv/firstinspires",
        },
    })
}

async function seedUsers() {
    // WARNING Seeding users causes unique key
    // constrait bugs when creating new ones
    //
    // const users: User[] = []
    // users.push({
    //     id: 0,
    //     username: "admin",
    //     is_enabled: true,
    //     is_admin: true,
    // })
    // for (let i = 1; i <= 9; i++) {
    //     users.push({
    //         id: i,
    //         username: faker.person.firstName(),
    //         is_enabled: faker.number.int(100) > 30,
    //         is_admin: false,
    //     })
    // }
    // await prisma.user.createMany({ data: users })
    //
    // return await prisma.user.findMany()
}

async function seedTags() {
    const tags: Tag[] = []

    const category_roles = {
        roles: ["defender", "algae", "coral"],
        matchplay: [
            "heavily-defended",
            "gamepiece-stuck",
            "tipped-over",
            "looked-lost",
        ],
        damage: [
            "lost-comms",
            "mech-break",
            "elect-fail",
            "bumper-damage",
            "e-stopped",
        ],
    }

    let id = 0
    for (const key in category_roles) {
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
    await prisma.comparison.deleteMany()
    await prisma.user.deleteMany()
    await prisma.tag.deleteMany()
    await prisma.image.deleteMany()
    await prisma.teamEvent.deleteMany()
    await prisma.teamMatch.deleteMany()
    await prisma.team.deleteMany()
    await prisma.event.deleteMany()
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
