export type PageState =
    | "Verify"
    | "ScoreAlgae"
    | "RemoveAlgae"
    | "ScoreCoral"
    | "Intake"
    | "None"

export type ActionState =
    | `ScoreAlgae${"Processor" | "Net"}`
    | `RemoveAlgae${"L2" | "L3"}`
    | `ScoreCoral${"L1" | "L2" | "L3" | "L4"}`
    | `Intake${`Coral${"Station" | "Preplaced"}` | `Algae${"Preplaced" | "Reef"}`}`
    | "None"
