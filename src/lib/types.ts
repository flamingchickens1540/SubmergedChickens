// Match Scout Page State Enums
export type TelePageState =
    | "Verify"
    | "ScoreAlgae"
    | "RemoveAlgae"
    | "ScoreCoral"
    | "Incap"
    | "None"
export type AutoPageState = TelePageState | "Intake"

export type TeleActionState =
    | `ScoreAlgae${"Processor" | "Net"}`
    | `RemoveAlgae${"L2" | "L3"}`
    | `ScoreCoral${"L1" | "L2" | "L3" | "L4"}`
    | "Incap"
    | "None"
export type AutoAction =
    | TeleActionState
    | `Intake${`Coral${"Station" | "Preplaced"}` | `Algae${"Preplaced" | "Reef"}`}`
    | "Leave"

export type AutoActionData = {
    action: AutoAction
    success: boolean
}
export type TeleActionData = {
    action: TeleActionState
    success: boolean
}

export type Timeline = {
    auto: AutoActionData[]
    tele: TeleActionData[]
}

export type EndAction = "DeepClimb" | "ShallowClimb" | "Failed" | "None"

// NOTE Structs for interfacing with the db are autogenerated by prisma with
// `bun db:load`

type BugReport = {
    sender_id: number
    report_text: string
    report_title: string
}
