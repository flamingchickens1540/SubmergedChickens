import { $ } from "bun"

const { exitCode } = await $`prisma ${process.argv.slice(2)}`.nothrow()

process.exit(exitCode)
