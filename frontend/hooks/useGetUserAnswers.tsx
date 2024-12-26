import { useEffect, useState } from "react";

interface UserInputType {
  [key: string]: string | null;
}

// QuestionBlockComp内(ページ1~5)の回答をここでキャッチする
const useGetUserAnswers = () => {
  const [userAnswers, setUserAnswers] = useState<UserInputType>(
    initializeAnswers()
  );
  //ユーザーの回答を記録するロジックを実装する
  const getAnswersInEachPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [name]: value,
      };
      return orderAnswers(updatedAnswers);
    });
  };
  useEffect(() => {
    console.log(userAnswers);
  }, [userAnswers]);

  return { userAnswers, getAnswersInEachPage };
};

// userの回答順で格納されているリクエストを、質問番号順に並べ替える関数
function orderAnswers(answers: UserInputType) {
  const orderedAnswers: UserInputType = {};
  for (let i = 1; i <= Object.keys(answers).length; i++) {
    const key = `q${i}`;
    // if (!answers[key]) {
    //   orderedAnswers[key] = null;
    //   continue;
    // }
    const answer = answers[key];
    orderedAnswers[key] = answer;
  }
  return orderedAnswers;
}

// 初期状態を設定する関数
const initializeAnswers = (): UserInputType => {
  const initialAnswers: UserInputType = {};
  for (let i = 1; i <= 25; i++) {
    initialAnswers[`q${i}`] = null; // 修正箇所: 初期値をnullに設定
  }
  return initialAnswers;
};

export default useGetUserAnswers;
