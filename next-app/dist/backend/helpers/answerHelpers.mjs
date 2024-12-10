// ユーザー回答の型ガードを実装
function isUserAnswerFormatType(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    return true;
}
// userの回答順で格納されているリクエストを、質問番号順に並べ替える関数
function orderAnswers(answers) {
    // TODO:add request validation here
    if (!isUserAnswerFormatType(answers)) {
        throw new Error("Answers must be an object with string values");
    }
    const orderedAnswers = {};
    for (let i = 1; i <= Object.keys(answers).length; i++) {
        const key = `q${i}`;
        const answer = answers[key];
        orderedAnswers[key] = answer;
    }
    return orderedAnswers;
}
//JavaScriptのオブジェクトに変換
function parseResponseFromAI(response) {
    try {
        const parsedResponse = JSON.parse(response);
        return parsedResponse;
    }
    catch (error) {
        console.error("Failed to parse response from AI", error);
        throw new Error("Failed to parse response format from AI");
    }
}
export { orderAnswers, parseResponseFromAI, isUserAnswerFormatType };
