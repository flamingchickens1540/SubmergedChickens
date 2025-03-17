import type { UncountedTeamMatch } from "@/types"
import { Server } from "socket.io"
import { type ViteDevServer } from "vite"

const info = (s: string) => console.log(`\x1b[32m${s}\x1b[0m`)
const warn = (s: string) => console.log(`\x1b[33m${s}\x1b[0m`)

const sid_to_username: Map<string, string> = new Map()
let robot_queue: { key: string; color: "red" | "blue" }[] = []
let curr_match_key: string = ""

const webSocketServer = {
    name: "webSocketServer",
    configureServer(server: ViteDevServer) {
        if (!server.httpServer) return
        const io = new Server(server.httpServer)

        io.use((socket, next) => {
            const username = socket.handshake.auth.username
            if (!username) {
                return next(new Error("No username provided"))
            }

            Array.from(sid_to_username.entries())
                .filter(([_key, value]) => value === username)
                .map(([key, _value]) => key)
                .forEach(key => {
                    // DEBUG warn(`deleted old key: ${key}`)
                    sid_to_username.delete(key)
                })

            sid_to_username.set(socket.id, username)

            next()
        })

        io.on("connect", socket => {
            if (socket.handshake.auth.token === "celary") {
                socket.join("admin_room")
                info("Admin Aquired")
            }
            socket.on("new_user", (user: string) => {
                sid_to_username.set(socket.id, user)
                info(`New user ${user} on socket ${socket.id}`)
            })

            socket.on("join_queue", () => {
                const username = sid_to_username.get(socket.id)

                const team_data = robot_queue.pop()
                if (!team_data) {
                    io.to("admin_room").emit("scout_joined_queue", username)
                    info(`${username} joined queue`)
                    socket.join("scout_queue")
                    return
                }
<<<<<<< HEAD
                io.to("admin_room").emit("robot_left_queue", team_data)

                socket.emit("time_to_scout", [curr_match_key, ...team_data])
=======

                io.to("admin_room").emit("robot_left_queue", [
                    team_data,
                    username,
                ])
                info(`${username} recieved robot ${team_data.key}`)
                socket.emit("time_to_scout", [curr_match_key, team_data])
>>>>>>> a757463e81a0c661ac9f7ca618848defbe506679
            })

            async function leave_scout_queue(scout_id: string) {
                const scout_sid = Array.from(sid_to_username.entries())
                    .filter(([_, scout]) => scout === scout_id)
                    .map(([sid, _]) => sid)[0]

                // Tells both the scout and admin that the scout left (either could have removed the scout)
                io.emit("scout_left_queue", scout_id)

                // NOTE Duplicates shouldn't exist, since middleware filters it
                const socket = (await io.in("scout_queue").fetchSockets()).find(
                    socket => socket.id === scout_sid
                )
                if (!socket) {
                    return
                }
                socket.leave("scout_queue")

                const scout_queue = (
                    await io.in("scout_queue").fetchSockets()
                ).map(t => t.id)
                if (scout_queue.length === 0) {
                    info(`${scout_id} left queue; scout queue now empty`)
                } else {
                    info(
                        `${scout_id} left queue; scout queue length: ${scout_queue.length}`
                    )
                }
            }

            socket.on("leave_scout_queue", leave_scout_queue)

            socket.on(
                "leave_robot_queue",
                (robot: { key: string; color: "red" | "blue" }) => {
                    const robotsEqual = (
                        robot1: { key: string; color: "red" | "blue" },
                        robot2: { key: string; color: "red" | "blue" }
                    ): boolean => {
                        return (
                            robot1.key === robot2.key &&
                            robot1.color === robot2.color
                        )
                    }
                    const index = robot_queue.findIndex(robot_t =>
                        robotsEqual(robot_t, robot)
                    )
                    if (index === -1) return

                    robot_queue.splice(index, 1)
                }
            )

            socket.on(
                "send_match",
                async ([match_key, teams]: [
                    string,
                    { key: string; color: "red" | "blue" }[],
                ]) => {
                    if (!socket.rooms.has("admin_room")) return

                    const teams_print: string = teams
                        .map(team => {
                            if (team.color == "red") {
                                return ` \x1b[31m${team.key}\x1b[0m`
                            } else {
                                return ` \x1b[34m${team.key}\x1b[0m`
                            }
                        })
                        .join()
                    info(`New Match (${match_key}):${teams_print}`)

                    robot_queue = []

                    const scout_queue = (
                        await io.in("scout_queue").fetchSockets()
                    ).reverse()
                    for (const scout of scout_queue) {
                        const team_data = teams.pop()
                        if (!team_data) break

                        const username = sid_to_username.get(scout.id)
                        if (!username) {
                            console.error("Scout in queue not in map")
                            continue
                        }

                        info(
                            `${username} recieved robot ${team_data.key} from queue`
                        )
                        scout.leave("scout_queue")
                        scout.emit("time_to_scout", [match_key, team_data])
                        io.to("admin_room").emit("scout_left_queue", username)
                    }

                    io.to("admin_room").emit("robot_joined_queue", teams)
                    robot_queue.push(...teams)

                    // NOTE Update all connected sockets with new match info (for cosmetic purposes)
                    io.emit("new_match", match_key)
                    curr_match_key = match_key
                }
            )

            socket.on("clear_robot_queue", async () => {
                robot_queue = []
            })

            // Event-listener sockets that were offline to sync back up with the current match key
            socket.on("get_curr_match", callback => {
                callback({
                    curr_match_key,
                })
            })

            socket.on("get_robot_queue", callback => {
                callback({
                    robots: robot_queue ?? [],
                })
            })

            socket.on("get_scout_queue", async callback => {
                const scouts = (
                    (await io.in("scout_queue").fetchSockets()) ?? []
                )
                    .map(n => sid_to_username.get(n.id))
                    .reverse()
                callback({
                    scouts,
                })
            })

            // NOTE For these next two, the team match has already been sent
            // or removed by the client sending a request to the server
            socket.on("submit_team_match", (team_match: UncountedTeamMatch) => {
                io.to("admin_room").emit("new_team_match", team_match)
            })

            socket.on(
                "failed_submit_team_match",
                (team_match: UncountedTeamMatch) => {
                    io.to("admin_room").emit("failed_team_match", team_match)
                }
            )

            socket.on("disconnect", async _reason => {
                const scout_id = sid_to_username.get(socket.id)
                if (!scout_id) return

                sid_to_username.delete(socket.id)
                leave_scout_queue(scout_id)

                io.to("admin_room").emit("scout_left_queue", scout_id)
            })
        })
    },
}

function printTeamMatch(teams: [string, "blue" | "red"][]) {
    teams
        .slice(0, 3)
        .map(team => team[0])
        .forEach(key => {
            console.log(`  \x1b[31m${key}\x1b[0m`)
        })

    teams
        .slice(0, 3)
        .map(team => team[0])
        .forEach(key => {
            console.log(`  \x1b[34m${key}\x1b[0m`)
        })
}

export default webSocketServer
