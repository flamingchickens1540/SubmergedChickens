// The TeamMatch sent to the database
export type TeamMatchData = {
    scout_id: string
    team_key: string
    match_key: string

    timeline: Timeline
    end: EndAction
    driver_skill: 1 | 2 | 3 | 4 | 5
    notes: string
}

export type Timeline = {
    auto: AutoAction[]
    tele: TeleAction[]
}

export type AutoAction = TeleAction | "IntakeCoralHP" | "IntakeCoralGround"

export type TeleAction =
    | "ScoreCoralL1"
    | "ScoreCoralL2"
    | "ScoreCoralL3"
    | "ScoreCoralL4"
    | "ScoreProcessor"
    | "ScoreNet"

export type EndAction = "DeepClimb" | "ShallowClimb" | "Failed" | "None"

// Structs for receiving data from the db (mostly numerical tables)
