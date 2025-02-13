import React from "react";

interface RankingTableProps {
    title: string;
    data: { id: string; name: string; score: number }[];
    getPlaceColor: (place: number) => string;
}

const RankingTable: React.FC<RankingTableProps> = ({title, data, getPlaceColor}) => {
    const places = data.reduce((acc, alt, index) => {
        if (index === 0) {
            acc.push({...alt, place: 1});
        } else {
            const last = acc[index - 1];
            const place = alt.score === last.score ? last.place : index + 1;
            acc.push({...alt, place});
        }
        return acc;
    }, [] as { id: string; name: string; score: number; place: number }[]);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 overflow-hidden mb-6">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">{title}</h2>
            <div className="overflow-auto rounded-lg">
                <table className="min-w-full table-auto border-collapse rounded-lg">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-3 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white text-center rounded-tl-lg">
                            Miejsce
                        </th>
                        <th className="border border-gray-300 px-4 py-3 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white text-left">
                            Nazwa
                        </th>
                        <th className="border border-gray-300 px-4 py-3 bg-gradient-to-r from-[#228B22] to-[#32CD32] text-white text-right rounded-tr-lg">
                            Wynik (%)
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {places.map((row) => (
                        <tr key={row.id} className="group hover:bg-[#E2FEE2] transition duration-200">
                            <td className="border border-gray-300 px-4 py-3 text-center">
                                <div
                                    className="w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg mx-auto"
                                    style={{
                                        backgroundColor: getPlaceColor(row.place),
                                        color: "white",
                                        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                                    }}
                                >
                                    {row.place}
                                </div>
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-gray-800">
                                {row.name}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-right text-gray-800">
                                {row.score.toFixed(2)}%
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RankingTable;
