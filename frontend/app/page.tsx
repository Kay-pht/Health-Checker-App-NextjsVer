import StartButton from "@/components/buttons/StartButton";
import { FaQuestionCircle, FaRobot, FaCarrot } from "react-icons/fa";
const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        ようこそ！AI食生活診断テストへ
      </h1>
      <p className="text-lg text-gray-600 ">
        あなたの食生活を診断し、健康的な生活をサポートします。
      </p>
      <p className="text-lg text-gray-600 mb-8">
        <strong className="text-gray-600">登録無し</strong>
        でもご利用頂けます！
      </p>
      <StartButton />
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow-md rounded-lg transform transition-transform hover:scale-105">
          <FaQuestionCircle className="text-4xl text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Step 1</h2>
          <p className="text-gray-600">3分で質問に答える！</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg transform transition-transform hover:scale-105">
          <FaRobot className="text-4xl text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Step 2</h2>
          <p className="text-gray-600">AIが分析開始！</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg transform transition-transform hover:scale-105">
          <FaCarrot className="text-4xl text-red-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Step 3</h2>
          <p className="text-gray-600">スコアと栄養アドバイスをゲット！</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
