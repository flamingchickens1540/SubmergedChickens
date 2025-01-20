// For DB
export type Match = {
    match_key: string
    event_key: string
}

export type User = {
    id: string
    name: string
    is_admin: boolean
    slack_token: string
}

// DB Tables

/// Auto actions table stored and retreived from the backend
export type AutoActionsTM = ActionsTM & {
    coral_l1: number
    coral_l2: number
    coral_l3: number
    coral_l4: number
    algae_l2: number
    algae_l3: number
    // TODE
    actions: AutoActionData[]
}

export type TeleActionsTM = ActionsTM & {
    actions: TeleActionData[]
}

export type ActionsTM = {
    id: number
    // TODO
}

/// TeamMatch data that gets sent to the backend
export type TeamMatch = {
    id: number
    scout_id: string
    match_key: string
    team_key: string
    leave: boolean
    skill: number
    notes: string
    broke: boolean
    died: boolean
    auto_actions: AutoActionData[]
    tele_actions: TeleActionData[]
}

export type AutoActionData = {
    action: AutoAction
    success: boolean
    ok: boolean
}

export type TeleActionData = {
    action: TeleAction
    success: boolean
    ok: boolean
}

// Action Types
// Naming Convention: action_type + game_piece + where
// TODO
export type TeleAction = ""

export type PreAction = "" | ""
export type AutoAction = TeleAction | PreAction

export type TeleHeldItems = {
    // TODO
}
export type AutoHeldItems = TeleHeldItems

// For state machine
// TODO Decide in intake semantics
export type ItemInputState = "Intake" | "Score" | "Eject" | "None"
export type TeleInputState = TeleAction | ItemInputState
export type AutoInputState = TeleInputState
