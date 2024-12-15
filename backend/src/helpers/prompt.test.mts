// import prompt from "./prompt.mjs";

// it("returns an array of chat completion messages", () => {
//   const userAnswer = { q1: "answer1", q2: "answer2" };
//   expect(prompt(userAnswer)).toEqual([
//     {
//       role: "system",
//       content:
//         "あなたは栄養アドバイザーとして、ユーザーの食生活データを分析し、個別化された精密なフィードバックを提供します。ユーザーが入力した食生活の摂取頻度データに基づいて、不足している栄養素を正確に特定し、その栄養素を補う最適な食材を提案します。",
//     },
//     {
//       role: "user",
//       content:
//         "ユーザーの食生活の摂取頻度データを詳細に分析し、次の手順とフォーマットに従って、「不足栄養素」、「食生活のスコア（100点満点）」、「推奨食材（4品目以上）」を返答してください。\n\n" +
//         "【分析手順】\n" +
//         "1. 各食品群の摂取頻度（f1～f4）を元に、どの栄養素が不足しているかを特定します。\n" +
//         "   - f1やf2の頻度が高い栄養素を優先的に分析し、それらの栄養素が不足していると判断します。\n" +
//         "   - 複数の食品群で同じ栄養素が不足している場合も、どの栄養素が最も深刻に不足しているのかを分析し、その優先順位をつけてリストに追加してください。\n" +
//         "   - 食品群の重複や栄養素の偏りを避けるようにし、効率的な栄養補給を考慮します。\n" +
//         "   - 同じ栄養素が異なる食品群で不足している場合、その栄養素が特に不足しているとみなします。\n\n" +
//         "2. 食生活のスコアの算出。\n" +
//         "   - 各食品群の摂取頻度から栄養バランスを考慮し、点数を算出します。頻繁に摂取している栄養素が適切であれば高評価を、摂取頻度が少ない栄養素が多い場合は点数を低く設定します。\n" +
//         "   - 点数は100点満点で評価します。下記採点基準を厳密に遵守して下さい。\n" +
//         "     - 95点以上: 栄養バランスが非常に良好で、すべての重要な栄養素が適切に摂取されています。\n" +
//         "     - 85点以上: 栄養バランスが良好で、ほとんどの重要な栄養素が適切に摂取されています。85点がユーザーの平均点となるように設計します。\n" +
//         "     - 75点以上: 栄養バランスに若干の偏りがあり、いくつかの重要な栄養素が不足しています。\n" +
//         "     - 65点以上: 栄養バランスに欠けており、複数の重要な栄養素が不足しています。これが最低点となります。ただし、未入力が7項目以上の場合は必ず60点未満とすること。\n" +
//         "3. 推奨食材の選定\n" +
//         "   - 不足している栄養素を補うために、4品目以上の食材を提案。\n" +
//         "   - 食材は栄養素を効率よく補うものを選び、各栄養素を補完する食材を組み合わせる。\n" +
//         "【出力条件】\n" +
//         "出力は以下のフォーマットに厳密に従って出力してください。これ以外の形式での出力は一切禁止。必ず全ての項目を出力して下さい。\n" +
//         "フォーマット例:\n" +
//         '{"missingNutrients": ["例: 鉄分", "例: ビタミンC"], "recommendedFoods": ["例: キウイ", "例: 小魚"], "score": 例: 93}\n\n' +
//         "【摂取頻度】\n" +
//         "摂取頻度は以下の通り:\n" +
//         "f1: 週0～1日, f2: 週2～3日, f3: 週4～5日, f4: ほぼ毎日。\n\n" +
//         "【質問内容】\n" +
//         "質問内容は次の通り。\n" +
//         "q1: 白米、食パン、うどん、スパゲッティ【主食】,\n" +
//         "q2: 玄米、雑穀米、オートミール、そば【食物繊維含有主食】,\n" +
//         "q3: じゃがいも、さつまいも、里芋、長芋【イモ類】,\n" +
//         "q4: 牛乳、ヨーグルト、チーズ、バター【乳製品】,\n" +
//         "q5: 豆腐、納豆、味噌、豆乳【大豆製品】,\n" +
//         "q6: 鶏むね肉、豚もも肉、牛ヒレ肉、ささみ【低脂肪肉】,\n" +
//         "q7: 鶏もも肉、豚バラ肉、牛肩ロース、スペアリブ【高脂肪肉】,\n" +
//         "q8: レバー、ハツ【内臓肉】,\n" +
//         "q9: サバ、サケ、イワシ、タラ【魚類】,\n" +
//         "q10: サンマ、アジ、マグロ、カツオ【青魚・脂肪多魚】,\n" +
//         "q11: しらす、たらこ、イクラ、ホタテ【魚介類加工品】,\n" +
//         "q12: 卵、卵焼き、ゆで卵、オムレツ【卵料理】,\n" +
//         "q13: ほうれん草、ケール、アスパラガス、ブロッコリー【緑黄色野菜】,\n" +
//         "q14: キャベツ、大根、白菜、レタス【淡色野菜】,\n" +
//         "q15: にんじん、小松菜、パプリカ、ピーマン【緑黄色野菜】,\n" +
//         "q16: ナス、ズッキーニ、カリフラワー、きゅうり【淡色野菜】,\n" +
//         "q17: わかめ、昆布、ひじき、もずく【海藻】,\n" +
//         "q18: ゴボウ、れんこん、たけのこ、ニンニク【根菜類】,\n" +
//         "q19: バナナ、リンゴ、キウイ、マンゴー【ビタミンC豊富な果物】,\n" +
//         "q20: アボカド、ココナッツ、オリーブ【不飽和脂肪酸含有果物】,\n" +
//         "q21: ブルーベリー、イチゴ、ぶどう【抗酸化作用果物】,\n" +
//         "q22: くるみ、アーモンド、ピスタチオ【ナッツ類】,\n" +
//         "q23: オリーブオイル、ごま油、サラダ油、バター【油脂】,\n" +
//         "q24: キムチ、ぬか漬け、納豆【発酵食品】,\n" +
//         "q25: こんにゃく、寒天、しらたき【低カロリー食材】。",
//     },

//     {
//       role: "system",
//       content: "指示に従い,フォーマットに沿ってすべての項目に回答します。",
//     },

//     {
//       role: "user",
//       content: JSON.stringify(userAnswer),
//     },
//   ]);
// });
