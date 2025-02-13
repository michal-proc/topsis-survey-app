import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import {FaSpinner, FaArrowLeft} from "react-icons/fa";
import {MdError} from "react-icons/md";
import ColorManager from "../helpers/ColorManager";
import {Model, Ranking} from "../interfaces/Model";
import RankingTable from "../components/RankingTable";

const API_URL = import.meta.env.VITE_API_URL;
const API_PREFIX = import.meta.env.VITE_API_PREFIX;
const colorManager = new ColorManager();

function SurveyRanking() {
    const {id} = useParams();

    const [survey, setSurvey] = useState<Model | null>(null);
    const [surveyResults, setSurveyResults] = useState<Ranking | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSurvey = async () => {
        try {
            const response = await fetch(`${API_URL}${API_PREFIX}/models/${id}`);
            if (response.ok) {
                const responseData = await response.json();
                setSurvey(responseData.data as Model);
                document.title = `Rollerskates Surveys - ${responseData.data.name}`;
            } else {
                const errorData = await response.json();
                toast.error(errorData.detail || "Wystąpił błąd podczas pobierania danych modelu.");
                setError(errorData.detail || "Wystąpił błąd podczas pobierania danych modelu.");
            }
        } catch (err) {
            toast.error("Wystąpił błąd podczas pobierania danych modelu.");
            setError("Wystąpił błąd podczas pobierania danych modelu.");
        }
    };

    const fetchSurveyResults = async () => {
        try {
            const response = await fetch(`${API_URL}${API_PREFIX}/models/${id}/rankings`);
            if (response.ok) {
                const responseData = await response.json();
                setSurveyResults(responseData.data as Ranking);
            } else {
                const errorData = await response.json();
                toast.error(errorData.detail || "Wystąpił błąd podczas pobierania wyników rankingu.");
                setError(errorData.detail || "Wystąpił błąd podczas pobierania wyników rankingu.");
            }
        } catch (err) {
            toast.error("Wystąpił błąd podczas pobierania wyników rankingu.");
            setError("Wystąpił błąd podczas pobierania wyników rankingu.");
        }
    };

    useEffect(() => {
        setLoading(true);
        Promise.all([fetchSurvey(), fetchSurveyResults()]).finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <FaSpinner className="animate-spin text-4xl text-gray-500"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <MdError className="text-green-500 text-6xl mb-4"/>
                <h1 className="text-4xl font-bold" style={{color: colorManager.getColor("color5")}}>
                    Wystąpił błąd serwera
                </h1>
            </div>
        );
    }

    if (!survey || !surveyResults) {
        return null;
    }

    const getPlaceColor = (index: number) => {
        switch (index) {
            case 1:
                return "gold";
            case 2:
                return "silver";
            case 3:
                return "#804A00";
            default:
                return colorManager.getColor("color1");
        }
    };

    const alternativesRankingData = surveyResults.ranking.map((altId) => {
        const alt = survey.alternatives.find((a) => a.id === altId);
        const closeness = surveyResults.closeness_scores[altId] || 0;
        return {
            id: altId,
            name: alt ? alt.name : "Nieznana alternatywa",
            score: closeness * 100,
        };
    });

    const criteriaRankingData = Object.entries(surveyResults.average_criteria_weights)
        .map(([critId, weight]) => {
            const crit = survey.criteria.find((c) => c.id === critId);
            return {
                id: critId,
                name: crit ? crit.name : "Nieznane kryterium",
                score: weight * 100,
            };
        })
        .sort((a, b) => b.score - a.score);

    const aggregatedMatrix = surveyResults.aggregated_decision_matrix; // Obiekt

    return (
        <div className="container mx-auto p-6">
            <header className="mb-6 flex items-center justify-between">
                <h1 className="text-4xl font-bold" style={{color: colorManager.getColor("black")}}>
                    Wyniki ankiety: {survey.name}
                </h1>
                <Link
                    to={`/surveys/${id}`}
                    className="flex items-center space-x-2 group"
                    style={{color: colorManager.getColor("color2")}}
                >
                    <FaArrowLeft
                        className="text-4xl transition-transform duration-300 group-hover:-translate-x-1 mr-10"/>
                </Link>
            </header>

            <div className="mb-10">
                <RankingTable
                    title="Ranking Alternatyw"
                    data={alternativesRankingData}
                    getPlaceColor={getPlaceColor}
                />
            </div>

            {criteriaRankingData.length > 0 && (
                <div className="mb-10">
                    <RankingTable
                        title="Ranking Kryteriów"
                        data={criteriaRankingData}
                        getPlaceColor={getPlaceColor}
                    />
                </div>
            )}

            <div className="mb-10 bg-white shadow-md rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold mb-4">Macierz Decyzyjna</h2>
                <div className="overflow-auto">
                    <table className="min-w-full table-auto border-collapse">
                        <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-3 bg-gray-100 text-left">Alternatywa</th>
                            {survey.criteria.map((crit) => (
                                <th key={crit.id} className="border border-gray-300 px-4 py-3 bg-gray-100 text-center">
                                    {crit.name}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {survey.alternatives.map((alt) => (
                            <tr key={alt.id} className="hover:bg-gray-50 transition duration-200">
                                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-800">
                                    {alt.name}
                                </td>
                                {survey.criteria.map((crit) => {
                                    const val = aggregatedMatrix[alt.id]?.[crit.id] ?? 0;
                                    return (
                                        <td key={crit.id}
                                            className="border border-gray-300 px-4 py-3 text-center text-gray-700">
                                            {val.toFixed(2)}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default SurveyRanking;
