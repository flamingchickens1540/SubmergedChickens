import {
    type AutoStart,
    type Endgame,
    type AutoActionData,
    type TeleActionData,
    AutoAction,
} from "@prisma/client"

export type { AutoActionData, TeleActionData } from "@prisma/client"

// Match Scout Page State Enums
export type TelePageState =
    | "Verify"
    | "ScoreAlgae"
    | "CleanAlgae"
    | "ScoreCoral"
    | "Incap"
    | "None"
export type AutoPageState = TelePageState | "Intake"

export type FrontendAutoActionData = Omit<AutoActionData, "id" | "team_match">
export type FrontendTeleActionData = Omit<TeleActionData, "id" | "team_match">

export type Timeline = {
    auto: FrontendAutoActionData[]
    tele: FrontendTeleActionData[]
}

export type UncountedTeamMatch = {
    match_key: string
    team_key: number
    auto_start_location: AutoStart
    auto_leave_start: boolean
    timeline: Timeline
    endgame: Endgame
    skill: 1 | 2 | 3 | 4 | 5
    notes: string
    incap_time: number[]
    scout_id: number
    tags: string[]
}

// NOTE Structs for interfacing with the db are autogenerated by prisma with
// `bun db:load`

type BugReport = {
    sender_id: number
    report_text: string
    report_title: string
}

export type CurrentTeamMatch = {
    team_key: string
    color: string
    scout?: string
    displaying_tk: boolean
    tm_status: "Queue" | "Pending" | "Submitted"
}

export type SubmittedTeamMatch = UncountedTeamMatch & {
    scout_username?: string
    displaying_tk: boolean
}
