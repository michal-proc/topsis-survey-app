import numpy as np
from app.core.models import DecisionModel, Ranking
from app.core.topsis import Topsis


def calculate_topsis(model: DecisionModel) -> Ranking:
    criteria = model.criteria
    alternatives = model.alternatives
    expert_inputs = model.expert_inputs

    if not expert_inputs:
        return Ranking(
            average_criteria_weights={},
            aggregated_decision_matrix={},
            closeness_scores={},
            ranking=[]
        )

    crit_weights_sum = {c.id: 0.0 for c in criteria}
    crit_weights_count = {c.id: 0 for c in criteria}

    n_experts = len(expert_inputs)
    n_alternatives = len(alternatives)
    n_criteria = len(criteria)

    alt_index_map = {alt.id: i for i, alt in enumerate(alternatives)}
    crit_index_map = {crit.id: j for j, crit in enumerate(criteria)}

    decision_matrices = np.zeros((n_experts, n_alternatives, n_criteria), dtype=float)

    for e_idx, expert in enumerate(expert_inputs):
        for crit_id, weight in expert.criterion_weights.items():
            crit_weights_sum[crit_id] += weight
            crit_weights_count[crit_id] += 1

        for crit_id, alt_dict in expert.criterion_scores.items():
            j = crit_index_map[crit_id]
            for alt_id, score in alt_dict.items():
                i = alt_index_map[alt_id]
                decision_matrices[e_idx, i, j] = score

    average_criterion_weights = {}
    for c in criteria:
        s = crit_weights_sum[c.id]
        cnt = crit_weights_count[c.id]
        avg_w = s / cnt if cnt > 0 else 0.0
        average_criterion_weights[c.id] = avg_w

    weights_array = np.zeros(n_criteria, dtype=float)
    for c in criteria:
        weights_array[crit_index_map[c.id]] = average_criterion_weights[c.id]

    is_benefit = np.ones(n_criteria, dtype=bool)

    topsis = Topsis(
        n_alternatives=n_alternatives,
        n_criteria=n_criteria,
        weights=weights_array,
        decision_matrices=decision_matrices,
        is_benefit_criteria=is_benefit
    )

    ranking_indices = topsis.rank_alternatives()

    aggregated_matrix = topsis._aggregate_expert_opinions()
    normalized_matrix = topsis._normalize_decision_matrix(aggregated_matrix)
    weighted_matrix = topsis._apply_weights(normalized_matrix)
    ideal, negative_ideal = topsis._determine_ideal_solutions(weighted_matrix)
    dist_to_ideal, dist_to_negative_ideal = topsis._calculate_distances_to_ideals(weighted_matrix, ideal,
                                                                                  negative_ideal)
    scores = topsis._calculate_closeness_scores(dist_to_ideal, dist_to_negative_ideal)

    closeness_scores_map = {}
    for i, alt in enumerate(alternatives):
        closeness_scores_map[alt.id] = float(scores[i])

    final_ranking = [alternatives[idx].id for idx in ranking_indices]

    aggregated_decision_dict = {}
    for i, alt in enumerate(alternatives):
        aggregated_decision_dict[alt.id] = {}
        for j, crit in enumerate(criteria):
            aggregated_decision_dict[alt.id][crit.id] = float(aggregated_matrix[i, j])

    return Ranking(
        average_criteria_weights=average_criterion_weights,
        aggregated_decision_matrix=aggregated_decision_dict,
        closeness_scores=closeness_scores_map,
        ranking=final_ranking
    )
