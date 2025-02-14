import { json } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"
import { submitTeamMatch } from "$lib/scripts/submit"
import type { TeamMatch, Tag } from "@prisma/client"
import type {
    UncountedTeamMatch,
    Timeline,
    AutoAction,
    TeleActionState,
} from "$lib/types"

export const POST: RequestHandler = async ({ request }: any) => {
    const tm: UncountedTeamMatch = await request.json()
    return json(
        await submitTeamMatch(
            count(tm),
            tm.timeline.tele,
            tm.timeline.auto,
            tm.tagNames
        )
    )
}

function count(match: UncountedTeamMatch): Omit<TeamMatch, "id_num"> {
    return {
        match_key: match.match_key,
        team_key: match.team_number,
        event_key: match.event_key,
        auto_start_location: match.auto_start_location,
        auto_leave_start: match.auto_leave_start,
        auto_intake_coral_preplaced_succeed: countActionAuto(
            match.timeline,
            true,
            "IntakeCoralPreplaced"
        ),
        auto_intake_algae_preplaced_succeed: countActionAuto(
            match.timeline,
            true,
            "IntakeAlgaePreplaced"
        ),
        auto_intake_station_succeed: countActionAuto(
            match.timeline,
            true,
            "IntakeCoralStation"
        ),
        auto_intake_reef_succeed: countActionAuto(
            match.timeline,
            true,
            "IntakeAlgaeReef"
        ),
        auto_score_l1_succeed: countActionAuto(
            match.timeline,
            true,
            "ScoreCoralL1"
        ),
        auto_score_l2_succeed: countActionAuto(
            match.timeline,
            true,
            "ScoreCoralL2"
        ),
        auto_score_l3_succeed: countActionAuto(
            match.timeline,
            true,
            "ScoreCoralL3"
        ),
        auto_score_l4_succeed: countActionAuto(
            match.timeline,
            true,
            "ScoreCoralL4"
        ),
        auto_score_processor_succeed: countActionAuto(
            match.timeline,
            true,
            "ScoreAlgaeProcessor"
        ),
        auto_score_net_succeed: countActionAuto(
            match.timeline,
            true,
            "ScoreAlgaeNet"
        ),
        auto_clean_l2_succeed: countActionAuto(
            match.timeline,
            true,
            "CleanAlgaeL2"
        ),
        auto_clean_l3_succeed: countActionAuto(
            match.timeline,
            true,
            "CleanAlgaeL3"
        ),
        auto_intake_coral_preplaced_fail: countActionAuto(
            match.timeline,
            false,
            "IntakeCoralPreplaced"
        ),
        auto_intake_algae_preplaced_fail: countActionAuto(
            match.timeline,
            false,
            "IntakeAlgaePreplaced"
        ),
        auto_intake_station_fail: countActionAuto(
            match.timeline,
            false,
            "IntakeCoralStation"
        ),
        auto_intake_reef_fail: countActionAuto(
            match.timeline,
            false,
            "IntakeAlgaeReef"
        ),
        auto_score_l1_fail: countActionAuto(
            match.timeline,
            false,
            "ScoreCoralL1"
        ),
        auto_score_l2_fail: countActionAuto(
            match.timeline,
            false,
            "ScoreCoralL2"
        ),
        auto_score_l3_fail: countActionAuto(
            match.timeline,
            false,
            "ScoreCoralL3"
        ),
        auto_score_l4_fail: countActionAuto(
            match.timeline,
            false,
            "ScoreCoralL4"
        ),
        auto_score_processor_fail: countActionAuto(
            match.timeline,
            false,
            "ScoreAlgaeProcessor"
        ),
        auto_score_net_fail: countActionAuto(
            match.timeline,
            false,
            "ScoreAlgaeNet"
        ),
        auto_clean_l2_fail: countActionAuto(
            match.timeline,
            false,
            "CleanAlgaeL2"
        ),
        auto_clean_l3_fail: countActionAuto(
            match.timeline,
            false,
            "CleanAlgaeL3"
        ),
        tele_score_l1_succeed: countActionTele(
            match.timeline,
            true,
            "ScoreCoralL1"
        ),
        tele_score_l2_succeed: countActionTele(
            match.timeline,
            true,
            "ScoreCoralL2"
        ),
        tele_score_l3_succeed: countActionTele(
            match.timeline,
            true,
            "ScoreCoralL3"
        ),
        tele_score_l4_succeed: countActionTele(
            match.timeline,
            true,
            "ScoreCoralL4"
        ),
        tele_score_processor_succeed: countActionTele(
            match.timeline,
            true,
            "ScoreAlgaeProcessor"
        ),
        tele_score_net_succeed: countActionTele(
            match.timeline,
            true,
            "ScoreAlgaeNet"
        ),
        tele_clean_l2_succeed: countActionTele(
            match.timeline,
            true,
            "CleanAlgaeL2"
        ),
        tele_clean_l3_succeed: countActionTele(
            match.timeline,
            true,
            "CleanAlgaeL3"
        ),
        tele_score_l1_fail: countActionTele(
            match.timeline,
            false,
            "ScoreCoralL1"
        ),
        tele_score_l2_fail: countActionTele(
            match.timeline,
            false,
            "ScoreCoralL2"
        ),
        tele_score_l3_fail: countActionTele(
            match.timeline,
            false,
            "ScoreCoralL3"
        ),
        tele_score_l4_fail: countActionTele(
            match.timeline,
            false,
            "ScoreCoralL4"
        ),
        tele_score_processor_fail: countActionTele(
            match.timeline,
            false,
            "ScoreAlgaeProcessor"
        ),
        tele_score_net_fail: countActionTele(
            match.timeline,
            false,
            "ScoreAlgaeNet"
        ),
        tele_clean_l2_fail: countActionTele(
            match.timeline,
            false,
            "CleanAlgaeL2"
        ),
        tele_clean_l3_fail: countActionTele(
            match.timeline,
            false,
            "CleanAlgaeL3"
        ),
        endgame: match.endgame,
        skill: match.skill,
        notes: match.notes,
        incap_time: match.incap_time,
        scoutId: match.user_id,
    }
}

function countActionAuto(tl: Timeline, succ: Boolean, act: AutoAction) {
    return tl.auto.filter(a => a.action === act && a.success == succ).length
}
function countActionTele(tl: Timeline, succ: Boolean, act: TeleActionState) {
    return tl.tele.filter(a => a.action === act && a.success === succ).length
}
