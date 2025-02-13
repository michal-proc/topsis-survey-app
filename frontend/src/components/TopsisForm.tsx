import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {Model} from "../interfaces/Model";
import ColorManager from "../helpers/ColorManager";
import {FaSpinner} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;
const colorManager = new ColorManager();

interface TopsisFormProps {
    survey: Model;
    onSaveSuccess: () => void;
}

interface FormData {
    criterion_weights: {
        [criterionId: string]: number | null;
    };
    criterion_scores: {
        [criterionId: string]: {
            [alternativeId: string]: number | null;
        };
    };
}

function TopsisForm({survey, onSaveSuccess}: TopsisFormProps) {
    const {id} = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [hover, setHover] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        criterion_weights: {},
        criterion_scores: {},
    });

    useEffect(() => {
        const initialWeights: FormData["criterion_weights"] = {};
        const initialScores: FormData["criterion_scores"] = {};

        survey.criteria.forEach((criterion) => {
            initialWeights[criterion.id] = null;
            initialScores[criterion.id] = {};

            survey.alternatives.forEach((alternative) => {
                initialScores[criterion.id][alternative.id] = null;
            });
        });

        setFormData({
            criterion_weights: initialWeights,
            criterion_scores: initialScores,
        });
    }, [survey]);

    const handleCriterionWeightChange = (criterionId: string, value: number | null) => {
        setFormData((prev) => ({
            ...prev,
            criterion_weights: {
                ...prev.criterion_weights,
                [criterionId]: value,
            },
        }));
    };

    const handleCriterionScoreChange = (
        criterionId: string,
        alternativeId: string,
        value: number | null
    ) => {
        setFormData((prev) => ({
            ...prev,
            criterion_scores: {
                ...prev.criterion_scores,
                [criterionId]: {
                    ...prev.criterion_scores[criterionId],
                    [alternativeId]: value,
                },
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const filteredWeights: { [criterionId: string]: number } = {};
        const filteredScores: { [criterionId: string]: { [alternativeId: string]: number } } = {};

        for (const critId in formData.criterion_weights) {
            const val = formData.criterion_weights[critId];
            if (val !== null) {
                filteredWeights[critId] = val;
            }
        }

        for (const critId in formData.criterion_scores) {
            filteredScores[critId] = {};
            for (const altId in formData.criterion_scores[critId]) {
                const val = formData.criterion_scores[critId][altId];
                if (val !== null) {
                    filteredScores[critId][altId] = val;
                }
            }
        }

        const finalPayload = {
            criterion_weights: filteredWeights,
            criterion_scores: filteredScores,
        };

        try {
            const response = await fetch(`${API_URL}${API_PREFIX}/models/${id}/experts`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(finalPayload),
            });

            if (response.ok) {
                toast.success("Dane zostały zapisane pomyślnie.");
                onSaveSuccess();
            } else {
                toast.error("Wystąpił błąd podczas zapisywania danych.");
            }
        } catch {
            toast.error("Wystąpił błąd podczas zapisywania danych.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div
                className="bg-white shadow-md rounded-lg p-6 border"
                style={{borderColor: colorManager.getColor("color4")}}
            >
                <h3 className="text-lg font-bold mb-4">Wagi Kryteriów</h3>
                <div className="overflow-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr>
                            <th className="border p-2 bg-gray-100 text-left">Kryterium</th>
                            <th className="border p-2 bg-gray-100 text-center">Waga</th>
                        </tr>
                        </thead>
                        <tbody>
                        {survey.criteria.map((criterion) => (
                            <tr key={criterion.id}>
                                <td className="border p-2 bg-gray-100 font-medium">{criterion.name}</td>
                                <td className="border p-2">
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="p-2 border rounded-lg w-full"
                                        value={formData.criterion_weights[criterion.id] ?? ""}
                                        onChange={(e) =>
                                            handleCriterionWeightChange(
                                                criterion.id,
                                                e.target.value === "" ? null : parseFloat(e.target.value)
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                className="bg-white shadow-md rounded-lg p-6 border"
                style={{borderColor: colorManager.getColor("color4")}}
            >
                <h3 className="text-lg font-bold mb-4">Ocena Kryteriów (1–10) dla Alternatyw</h3>
                <div className="overflow-auto">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr>
                            <th className="border p-2 bg-gray-100 text-left"></th>
                            {survey.criteria.map((criterion) => (
                                <th key={criterion.id} className="border p-2 bg-gray-100 text-center">
                                    {criterion.name}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {survey.alternatives.map((alternative) => (
                            <tr key={alternative.id}>
                                <td className="border p-2 bg-gray-100 font-medium">{alternative.name}</td>
                                {survey.criteria.map((criterion) => (
                                    <td key={criterion.id} className="border p-2">
                                        <select
                                            className="p-2 border rounded-lg w-full"
                                            value={
                                                formData.criterion_scores[criterion.id]?.[alternative.id] ?? ""
                                            }
                                            onChange={(e) =>
                                                handleCriterionScoreChange(
                                                    criterion.id,
                                                    alternative.id,
                                                    e.target.value === "" ? null : parseInt(e.target.value)
                                                )
                                            }
                                        >
                                            <option value="">Wybierz</option>
                                            {Array.from({length: 10}, (_, i) => i + 1).map((val) => (
                                                <option key={val} value={val}>
                                                    {val}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`block w-min-[100px] p-3 font-bold rounded-lg text-white ${
                    loading ? "cursor-not-allowed" : ""
                }`}
                style={{
                    backgroundColor: hover
                        ? colorManager.getColor("color3")
                        : colorManager.getColor("color1"),
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                {loading ? <FaSpinner className="animate-spin inline-block"/> : "Zapisz odpowiedzi"}
            </button>
        </form>
    );
}

export default TopsisForm;
