import type { TeamMatch } from "$lib/types"
import { Server } from "socket.io"
import { type ViteDevServer } from "vite"
const info = (s: string) => console.log(`\x1b[32m ${s} \x1b[0m`)

const sid_to_username: Map<string, string> = new Map()
let robot_queue: [string, "red" | "blue"][] = []
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

            let old_entries = Object.entries(sid_to_username).find(
                ([_key, value]) => value === username
            )
            if (old_entries) {
                old_entries
                    .map(([key, _value]) => key)
                    .forEach(key => sid_to_username.delete(key))
            }

            sid_to_username.set(socket.id, username)

            next()
        })

        io.on("connect", socket => {
            if (socket.handshake.auth.token === "celary") {
                info("Admin Aquired")
                socket.join("admin_room")
            }

            socket.on("join_queue", () => {
                const username = sid_to_username.get(socket.id)

                const team_data = robot_queue.pop()
                if (!team_data) {
                    io.to("admin_room").emit("scout_joined_queue", username)
                    socket.join("scout_queue")
                    return
                }
                io.to("admin_room").emit("robot_left_queue", team_data)
                socket.emit("time_to_scout", [curr_match_key, ...team_data])
            })

            socket.on("leave_scout_queue", (scout_id: string) => {
                const scout_sid = Object.entries(sid_to_username)
                    .filter(([_sid, scout]) => scout === scout_id)
                    .map(([sid, _]) => sid)[0]
                // NOTE This event handles the the case where the scout removed itself from the queue
                io.emit("scout_left_queue", scout_id)
                // NOTE This event handles the case where the admin removed the scout from the queue
                io.sockets.sockets.get(scout_sid)?.leave("scout_queue")
            })

            socket.on(
                "leave_robot_queue",
                (robot: [string, "red" | "blue"]) => {
                    const robotsEqual = (
                        robot1: [string, "red" | "blue"],
                        robot2: [string, "red" | "blue"]
                    ): boolean => {
                        return (
                            robot1[0] === robot2[0] && robot1[1] === robot2[1]
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
                    [string, "red" | "blue"][],
                ]) => {
                    if (!socket.rooms.has("admin_room")) return

                    // TODO: New TeamMatch in DB request here

                    info(`${match_key}: ${teams}`)
                    robot_queue = []

                    const scout_queue = (
                        await io.in("scout_queue").fetchSockets()
                    ).reverse()
                    for (const socket of scout_queue) {
                        const team_data = teams.pop()
                        if (!team_data) break

                        const username = sid_to_username.get(socket.id)
                        if (!username) {
                            console.error("Scout in queue not in map")
                            continue
                        }

                        socket.leave("scout_queue")
                        socket.emit("time_to_scout", [match_key, ...team_data])
                        io.to("admin_room").emit("scout_left_queue", username)
                    }

                    io.to("admin_room").emit("robot_joined_queue", teams)
                    robot_queue.push(...teams)

                    // Update all connected sockets with new match info (for cosmetic purposes)
                    io.emit("new_match", match_key)
                    curr_match_key = match_key
                }
            )

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

            // Problem
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
            socket.on("submit_team_match", (team_match: TeamMatch) => {
                io.to("admin_room").emit("new_team_match", team_match)
            })

            socket.on("failed_submit_team_match", (team_match: TeamMatch) => {
                io.to("admin_room").emit("failed_team_match", team_match)
            })

            socket.on("disconnect", _reason => {
                const scout_id = sid_to_username.get(socket.id)
                io.to("admin_room").emit("scout_left_queue", scout_id)
            })
        })
    },
}

export default webSocketServer
