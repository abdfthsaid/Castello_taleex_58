import React from "react";

const RulesPage = () => {
  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text">
            Shuruudaha & Xeerarka
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Danab Battery Rental Service
          </p>
        </div>

        {/* Rules Container */}
        <div className="p-6 bg-white shadow-xl dark:bg-gray-800 rounded-2xl">
          {/* Rule 1 */}
          <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="flex items-center gap-2 mb-2 text-lg font-semibold text-purple-700 dark:text-purple-400">
              <span className="flex items-center justify-center w-6 h-6 text-sm text-white bg-purple-500 rounded-full">1</span>
              Wakhtiga Kirada
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Battery-ga waxaad kireysan kartaa muddo 24 saac ah. Haddii aadan soo celin mudadaas, waxaa lagu dalaci doonaa lacag dheeraad ah.
            </p>
          </div>

          {/* Rule 2 */}
          <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="flex items-center gap-2 mb-2 text-lg font-semibold text-purple-700 dark:text-purple-400">
              <span className="flex items-center justify-center w-6 h-6 text-sm text-white bg-purple-500 rounded-full">2</span>
              Daryeelka Battery-ga
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Waa inaad si fiican u daryeeshaa battery-ga. Haddii uu dhaawac gaaro ama uu lumo, waxaad masuul ka tahay qiimaha buuxa ee battery-ga ($50).
            </p>
          </div>

          {/* Rule 3 */}
          <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="flex items-center gap-2 mb-2 text-lg font-semibold text-purple-700 dark:text-purple-400">
              <span className="flex items-center justify-center w-6 h-6 text-sm text-white bg-purple-500 rounded-full">3</span>
              Soo Celinta
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Battery-ga waa inaad soo celisaa goobta aad ka qaadatay ama goob kale oo Danab ah. Haddii aadan soo celin 48 saac gudahood, numberkaaga waa la xiri doonaa.
            </p>
          </div>

          {/* Rule 4 */}
          <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="flex items-center gap-2 mb-2 text-lg font-semibold text-purple-700 dark:text-purple-400">
              <span className="flex items-center justify-center w-6 h-6 text-sm text-white bg-purple-500 rounded-full">4</span>
              Lacag Bixinta
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Lacagta waxaa laga jari doonaa numberka aad gelisay. Hubi in lacag ku filan ay ku jirto accountigaaga ka hor intaadan bixin.
            </p>
          </div>

          {/* Rule 5 */}
          <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="flex items-center gap-2 mb-2 text-lg font-semibold text-purple-700 dark:text-purple-400">
              <span className="flex items-center justify-center w-6 h-6 text-sm text-white bg-purple-500 rounded-full">5</span>
              Isticmaalka Saxda ah
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Battery-ga waxa loo isticmaalaa telefoonka kaliya. Ha u isticmaalin qalab kale sida laptop-yo ama qalab awood weyn u baahan.
            </p>
          </div>

          {/* Rule 6 */}
          <div className="pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="flex items-center gap-2 mb-2 text-lg font-semibold text-purple-700 dark:text-purple-400">
              <span className="flex items-center justify-center w-6 h-6 text-sm text-white bg-purple-500 rounded-full">6</span>
              Xadidaadda
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Hal qof wuxuu kireysan karaa hal battery kaliya. Ma kireysn kartid mid cusub ilaa aad soo celiso midka aad haysato.
            </p>
          </div>

          {/* Rule 7 */}
          <div>
            <h2 className="flex items-center gap-2 mb-2 text-lg font-semibold text-purple-700 dark:text-purple-400">
              <span className="flex items-center justify-center w-6 h-6 text-sm text-white bg-purple-500 rounded-full">7</span>
              Xiriirka Macaamiisha
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Haddii aad qabto wax su'aal ah, waxaad nagala soo xiriiri kartaa numberka: <span className="font-semibold text-pink-500">+252 61 XXXXXXX</span>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="p-4 mt-6 text-center border border-pink-200 bg-pink-50 dark:bg-pink-900/20 dark:border-pink-800 rounded-xl">
          <p className="text-sm text-pink-700 dark:text-pink-300">
            Marka aad isticmaasho adeegga Danab, waxaad aqbashay dhammaan shuruudahan.
          </p>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => window.close()}
            className="px-6 py-2 font-semibold text-white transition shadow-lg bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl hover:scale-105"
          >
            Dib u noqo
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
