import StartButton from "@/components/buttons/StartButton";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        ようこそ！AI食生活診断テストへ
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        あなたの食生活を診断し、健康的な生活をサポートします。
      </p>
      <StartButton />
    </div>
  );
};

export default LandingPage;
