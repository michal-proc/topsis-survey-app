import React, {useEffect} from "react";
import ColorManager from "../helpers/ColorManager";

const colorManager = new ColorManager();

function Home() {
    useEffect(() => {
        document.title = "Rollerskatesl Surveys - Ankiety AHP";
    }, []);

    return (
        <div className="container mx-auto p-6">
            <header className="mb-6">
                <h1 className="text-4xl font-bold">
                    <span style={{color: colorManager.getColor('color1')}}>Rollerskates</span>{" "}
                    <span style={{color: colorManager.getColor('black')}}>Surveys</span>
                </h1>
            </header>

            <main className="flex flex-col xl:flex-row gap-8">
                <section className="xl:w-3/4">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">O aplikacji</h2>
                    <p className="mb-4 text-gray-700">
                        Nasza aplikacja to zaawansowane narzędzie wspierające metodę wielokryterialnej oceny
                        decyzji <strong>TOPSIS</strong> (Technique for Order Preference by Similarity to Ideal
                        Solution). Została zaprojektowana z myślą o maksymalnej elastyczności, pozwalając użytkownikom
                        na definiowanie dowolnej liczby alternatyw, kryteriów oraz współpracę z wieloma ekspertami
                        jednocześnie. Dzięki temu możesz precyzyjnie porównać różne opcje i uzyskać najbardziej trafny
                        ranking końcowy.
                    </p>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Możliwości aplikacji</h3>
                    <ul className="list-disc pl-6 mb-4 text-gray-700">
                        <li>Tworzenie modeli decyzyjnych z nieograniczoną liczbą alternatyw i kryteriów.</li>
                        <li>Współpraca z wieloma ekspertami, którzy mogą dostarczać dane w formie ocen i wag.</li>
                        <li>Automatyczne obliczanie końcowego rankingu na podstawie dostarczonych danych z
                            wykorzystaniem metody TOPSIS.
                        </li>
                        <li>Możliwość pracy z niekompletnymi danymi dzięki elastycznym mechanizmom przetwarzania
                            informacji.
                        </li>
                        <li>Możliwość zapisu i odczytu danych w formie pliku, co ułatwia wymianę informacji między
                            użytkownikami.
                        </li>
                    </ul>
                    <p className="mb-4 text-gray-700">
                        Aplikacja umożliwia użytkownikom zbudowanie pełnego modelu decyzyjnego, który można wzbogacić o
                        szczegółowe dane od ekspertów. Dzięki zaawansowanym algorytmom analizy wielokryterialnej
                        użytkownicy mogą zidentyfikować najbardziej optymalne rozwiązania i odpowiednio je uszeregować.
                        To narzędzie jest idealnym rozwiązaniem dla każdego, kto chce podejmować decyzje oparte na
                        danych, niezależnie od ich złożoności.
                    </p>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">O technologii</h3>
                    <p className="mb-4 text-gray-700">
                        Aplikacja została stworzona z użyciem nowoczesnych technologii, które gwarantują wydajność,
                        elastyczność i skalowalność:
                    </p>
                    <ul className="list-disc pl-6 mb-4 text-gray-700">
                        <li>
                            <strong>Frontend:</strong> React z TypeScriptem – intuicyjny interfejs użytkownika, który
                            jest szybki, responsywny i łatwy w obsłudze.
                        </li>
                        <li>
                            <strong>Backend:</strong> Python z FastAPI – wydajna i prosta platforma do budowy API, która
                            zapewnia szybkie przetwarzanie danych.
                        </li>
                        <li>
                            <strong>DevOps:</strong> Docker – wszystkie komponenty aplikacji są uruchamiane w
                            kontenerach, co zapewnia łatwą konfigurację środowiska i możliwość szybkiego skalowania.
                        </li>
                    </ul>
                    <p className="mb-4 text-gray-700">
                        Dzięki połączeniu tych technologii aplikacja jest nie tylko funkcjonalna, ale również prosta w
                        wdrożeniu i utrzymaniu. To idealne rozwiązanie dla zespołów pracujących nad złożonymi projektami
                        decyzyjnymi.
                    </p>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">O ankietach i procesie TOPSIS</h3>
                    <p className="mb-4 text-gray-700">
                        Metoda TOPSIS pozwala na podejmowanie decyzji w oparciu o wielokryterialną analizę zgodną z
                        realistycznym modelem preferencji decydentów. Użytkownicy definiują alternatywy i kryteria, a
                        następnie wprowadzają dane w formie wag i ocen dla każdej alternatywy. Dzięki specjalistycznym
                        obliczeniom TOPSIS aplikacja wyznacza rozwiązanie najbliższe idealnemu, generując końcowy
                        ranking. Współpraca z ekspertami pozwala na uzyskanie obiektywnych wyników, a obsługa
                        niekompletnych danych sprawia, że aplikacja działa nawet w przypadku braku pełnych informacji.
                    </p>
                </section>

                <section className="flex flex-row justify-center xl:flex-col gap-6 xl:w-1/4">
                    <div
                        className="w-full max-w-sm bg-white border rounded-lg shadow-md"
                        style={{borderColor: colorManager.getColor('color4')}}
                    >
                        <div className="flex flex-col items-center py-10">
                            <img
                                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                src="/images/user.png"
                                alt="Michał Proć"
                            />
                            <h5
                                className="mb-1 text-xl font-semibold"
                                style={{color: colorManager.getColor('color3')}}
                            >
                                Michał Proć
                            </h5>
                            <span className="text-sm text-gray-500">Student WI Informatyka</span>
                        </div>
                    </div>

                    <div
                        className="w-full max-w-sm bg-white border rounded-lg shadow-md"
                        style={{borderColor: colorManager.getColor('color4')}}
                    >
                        <div className="flex flex-col items-center py-10">
                            <img
                                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                src="/images/user.png"
                                alt="Ryszard Żmija"
                            />
                            <h5
                                className="mb-1 text-xl font-semibold"
                                style={{color: colorManager.getColor('color3')}}
                            >
                                Ryszard Żmija
                            </h5>
                            <span className="text-sm text-gray-500">Student WI Informatyka</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default Home;
