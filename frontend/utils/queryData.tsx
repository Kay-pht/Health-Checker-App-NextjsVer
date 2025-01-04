export const frequencyArray = [
  { key: "f1", value: "週0～1日", size: 30, color: "#9B9FAA" },
  { key: "f2", value: "週2～3日", size: 35, color: "#77A1EE" },
  { key: "f3", value: "週4～5日", size: 40, color: "#4E84E4" },
  { key: "f4", value: "ほぼ毎日", size: 45, color: "#2563EB" },
] as const;

const queryArray_page1 = [
  {
    key: "q1",
    value:
      "玄米、雑穀米、オートミール、そばなどの食物繊維を含む主食を食べますか？",
  },
  {
    key: "q2",
    value: "白米、食パン、うどん、パスタなどの主食を食べますか？",
  },
  {
    key: "q3",
    value: "じゃがいも、さつまいも、里芋、長芋などのイモ類を食べますか？",
  },
  {
    key: "q4",
    value: "サバ、サケ、イワシ、タラなどの魚を食べますか？",
  },
  {
    key: "q5",
    value: "サンマ、アジ、マグロ、カツオなどの青魚や脂肪の多い魚を食べますか？",
  },
] as const;

const queryArray_page2 = [
  {
    key: "q6",
    value: "しらす、たらこ、イクラ、ホタテなどの魚介類加工品を食べますか？",
  },
  {
    key: "q7",
    value: "かき、あさり、しじみなどの貝類を食べますか？",
  },
  {
    key: "q8",
    value:
      "鶏むね肉、豚もも肉、牛ヒレ肉、ささみなどの脂肪が少ない部位の肉を食べますか？",
  },
  {
    key: "q9",
    value:
      "鶏もも肉、豚バラ肉、牛肩ロースなどの脂肪が豊富な部位の肉を食べますか？",
  },
  {
    key: "q10",
    value: "レバー、ハツなどの内臓肉を食べますか？",
  },
] as const;

const queryArray_page3 = [
  {
    key: "q11",
    value: "卵料理を食べますか？",
  },
  {
    key: "q12",
    value: "豆腐、納豆、味噌、豆乳などの大豆製品を摂取しますか？",
  },
  {
    key: "q13",
    value:
      "ほうれん草、アスパラガス、ブロッコリーなどの鉄分が豊富な野菜を食べますか？",
  },
  {
    key: "q14",
    value: "にんじん、小松菜、パプリカ、ピーマンなどの緑黄色野菜を食べますか？",
  },
  {
    key: "q15",
    value: "キャベツ、大根、白菜、レタスなどの淡色野菜を食べますか？",
  },
] as const;

const queryArray_page4 = [
  {
    key: "q16",
    value:
      "ナス、きゅうり、ズッキーニ、カリフラワーなどの淡色野菜を食べますか？",
  },
  {
    key: "q17",
    value: "ゴボウ、れんこん、たけのこ、ニンニクなどの根菜類を食べますか？",
  },
  {
    key: "q18",
    value: "わかめ、昆布、ひじき、もずくなどの海藻類を食べますか？",
  },
  {
    key: "q19",
    value: "しいたけ、まいたけ、えのきたけ、エリンギなどのきのこ類を食べますか",
  },
  {
    key: "q20",
    value:
      "アボカド、ココナッツ、オリーブなど、不飽和脂肪酸を含む果物を食べますか？",
  },
] as const;

const queryArray_page5 = [
  {
    key: "q21",
    value:
      "バナナ、リンゴ、キウイ、マンゴーなど、ビタミンCが豊富な果物を食べますか？",
  },
  {
    key: "q22",
    value:
      "ブルーベリー、イチゴ、ぶどうなど、抗酸化作用のある果物を食べますか？",
  },
  {
    key: "q23",
    value: "くるみ、アーモンド、ピスタチオなどのナッツ類を食べますか？",
  },
  {
    key: "q24",
    value: "牛乳、ヨーグルト、チーズ、バターなどの乳製品を摂取しますか？",
  },
  {
    key: "q25",
    value: "キムチ、ぬか漬け、納豆などの発酵食品を食べますか？",
  },
] as const;

export const foodQueryPages = [
  queryArray_page1,
  queryArray_page2,
  queryArray_page3,
  queryArray_page4,
  queryArray_page5,
];
