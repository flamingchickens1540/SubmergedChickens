import { SVD } from "svd-js"

export type Comparison<T> = {
    teamA: T
    teamB: T
    diff: number
}

export type Ranking<T> = {
    rank: number
    team: T
    score: number
    // "consistency": number; TODO: implement consistency
}

export type PairwiseOutput<T> = {
    rankings: Ranking<T>[]
    stability: number
    agreement: number
}

export function analyze_comparisons<T>(
    comparisons: Comparison<T>[]
): PairwiseOutput<T> {
    // Extract unique teams
    const teams = new Set<T>()
    comparisons.forEach(comparison => {
        teams.add(comparison.teamA)
        teams.add(comparison.teamB)
    })
    const uniqueTeams = Array.from(teams)
    const teamToIndex = new Map<T, number>(
        uniqueTeams.map((team, index) => [team, index])
    )
    const matrix: number[][] = Array.from({ length: uniqueTeams.length }, () =>
        Array(uniqueTeams.length).fill(0)
    )

    // Fill the matrix based on the comparison data
    comparisons.forEach(comparison => {
        const indexA = teamToIndex.get(comparison.teamA)!
        const indexB = teamToIndex.get(comparison.teamB)!
        matrix[indexA][indexB] = comparison.diff
        matrix[indexB][indexA] = -comparison.diff
    })

    // Compute SVD
    const { q: s, u, v: _ } = SVD(matrix)

    // Calculate and normalize rankings
    const scores = u.map(row => row[0])
    const maxAbs = Math.max(...scores.map(Math.abs))
    let scaledScores
    if (maxAbs > 0) {
        scaledScores = scores.map(rank =>
            parseFloat(((rank / maxAbs) * 100).toFixed(2))
        )
    } else {
        scaledScores = scores.map(rank => parseFloat((rank * 100).toFixed(2)))
    }

    // Map stats to each team and sort by ranking
    const rankings = uniqueTeams
        .map((team, index) => ({
            team: team,
            score: scaledScores[index],
        }))
        .sort((a, b) => a.score - b.score)
        .map((ranking, index) => ({
            rank: index + 1,
            team: ranking.team,
            score: ranking.score,
        }))

    // Calculate stability and agreement of the rankings
    const stability = s[0] / s[s.length - 1]
    const agreement = s[s.length - 1] / s[0]

    return { rankings, stability, agreement }
}

function test() {
    const testDataSet: Comparison<number>[] = [
        { teamA: 1001, teamB: 1007, diff: 2 },
        { teamA: 1001, teamB: 1002, diff: 1 },
        { teamA: 1001, teamB: 1003, diff: 2 },
        { teamA: 1001, teamB: 1004, diff: 2 },
        { teamA: 1006, teamB: 1007, diff: 1 },
        { teamA: 1006, teamB: 1008, diff: 1 },
        { teamA: 1007, teamB: 1008, diff: 0 },
        { teamA: 1002, teamB: 1008, diff: 2 },
        { teamA: 1003, teamB: 1006, diff: 1 },
        { teamA: 1004, teamB: 1006, diff: 1 },
        { teamA: 1004, teamB: 1007, diff: 1 },
        { teamA: 1005, teamB: 1006, diff: 0 },
        { teamA: 1005, teamB: 1007, diff: 1 },
        { teamA: 1005, teamB: 1008, diff: 1 },
        { teamA: 1002, teamB: 1003, diff: 1 },
        { teamA: 1002, teamB: 1004, diff: 2 },
        { teamA: 1002, teamB: 1005, diff: 2 },
        { teamA: 1003, teamB: 1004, diff: 1 },
        { teamA: 1003, teamB: 1005, diff: 1 },
        { teamA: 1004, teamB: 1005, diff: 1 },
    ]

    const sixteenDataSet: Comparison<number>[] = [
        { teamA: 1101, teamB: 1102, diff: 0 },
        { teamA: 1101, teamB: 1103, diff: 1 },
        { teamA: 1101, teamB: 1104, diff: 2 },
        { teamA: 1101, teamB: 1105, diff: 2 },
        { teamA: 1101, teamB: 1109, diff: 2 },
        { teamA: 1102, teamB: 1103, diff: 0 },
        { teamA: 1102, teamB: 1104, diff: 2 },
        { teamA: 1102, teamB: 1106, diff: 2 },
        { teamA: 1102, teamB: 1110, diff: 2 },
        { teamA: 1103, teamB: 1104, diff: 1 },
        { teamA: 1103, teamB: 1107, diff: 2 },
        { teamA: 1103, teamB: 1111, diff: 2 },
        { teamA: 1104, teamB: 1105, diff: 0 },
        { teamA: 1104, teamB: 1106, diff: 0 },
        { teamA: 1104, teamB: 1109, diff: 1 },
        { teamA: 1104, teamB: 1112, diff: 2 },
        { teamA: 1105, teamB: 1106, diff: 0 },
        { teamA: 1105, teamB: 1107, diff: 0 },
        { teamA: 1105, teamB: 1110, diff: 1 },
        { teamA: 1105, teamB: 1113, diff: 2 },
        { teamA: 1106, teamB: 1107, diff: 0 },
        { teamA: 1106, teamB: 1108, diff: 0 },
        { teamA: 1106, teamB: 1111, diff: 1 },
        { teamA: 1106, teamB: 1114, diff: 2 },
        { teamA: 1107, teamB: 1108, diff: 0 },
        { teamA: 1107, teamB: 1109, diff: 1 },
        { teamA: 1107, teamB: 1115, diff: 2 },
        { teamA: 1108, teamB: 1109, diff: 1 },
        { teamA: 1108, teamB: 1110, diff: 1 },
        { teamA: 1108, teamB: 1116, diff: 2 },
        { teamA: 1109, teamB: 1110, diff: 0 },
        { teamA: 1109, teamB: 1111, diff: 0 },
        { teamA: 1109, teamB: 1112, diff: 1 },
        { teamA: 1110, teamB: 1111, diff: 0 },
        { teamA: 1110, teamB: 1113, diff: 1 },
        { teamA: 1110, teamB: 1114, diff: 1 },
        { teamA: 1111, teamB: 1112, diff: 1 },
        { teamA: 1111, teamB: 1115, diff: 1 },
        { teamA: 1111, teamB: 1116, diff: 1 },
        { teamA: 1112, teamB: 1113, diff: 0 },
        { teamA: 1112, teamB: 1114, diff: 0 },
        { teamA: 1112, teamB: 1115, diff: 0 },
        { teamA: 1113, teamB: 1114, diff: 0 },
        { teamA: 1113, teamB: 1115, diff: 0 },
        { teamA: 1113, teamB: 1116, diff: 0 },
        { teamA: 1114, teamB: 1115, diff: 0 },
        { teamA: 1114, teamB: 1116, diff: 0 },
        { teamA: 1115, teamB: 1116, diff: 0 },
    ]

    console.log(analyze_comparisons(testDataSet))
    console.log(analyze_comparisons(sixteenDataSet))
}

// test()
