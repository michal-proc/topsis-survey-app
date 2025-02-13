export interface Alternative {
    id: string;
    name: string;
}

export interface Criterion {
    id: string;
    name: string;
}


export interface CriterionWeights {
    [criterionId: string]: number;
}


export interface CriterionScores {
    [criterionId: string]: {
        [alternativeId: string]: number;
    };
}


export interface ExpertInput {
    expert_id: string;
    criterion_weights: CriterionWeights;
    criterion_scores: CriterionScores;
}

export interface Model {
    model_id: string;
    name: string;
    alternatives: Alternative[];
    criteria: Criterion[];
    expert_inputs: ExpertInput[];
}


export interface Ranking {
    average_criteria_weights: Record<string, number>;
    aggregated_decision_matrix: Record<string, Record<string, number>>;
    closeness_scores: Record<string, number>;
    ranking: string[];
}
