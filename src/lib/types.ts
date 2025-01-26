// Match Scout Page State Enums
export type TelePageState =
    | "Verify"
    | "ScoreAlgae"
    | "RemoveAlgae"
    | "ScoreCoral"
    | "Incap"
    | "None"

export type TeleActionState =
    | `ScoreAlgae${"Processor" | "Net"}`
    | `RemoveAlgae${"L2" | "L3"}`
    | `ScoreCoral${"L1" | "L2" | "L3" | "L4"}`
    | "Incap"
    | "None"

export type AutoPageState = TelePageState | "Intake"
export type AutoActionState =
    | TeleActionState
    | `Intake${`Coral${"Station" | "Preplaced"}` | `Algae${"Preplaced" | "Reef"}`}`

export type AutoActionData = {
    action: AutoActionState
    success: boolean
}
