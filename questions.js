window.EXAM = {
  title: '一(ㄧ)年(ㄋㄧㄢˊ)級(ㄐㄧˊ)注(ㄓㄨˋ)音(ㄧㄣ)符(ㄈㄨˊ)號(ㄏㄠˋ)測(ㄘㄜˋ)驗(ㄧㄢˋ)',
  sections: [
    {
      title: '一、連(ㄌㄧㄢˊ)連(ㄌㄧㄢˊ)看(ㄎㄢˋ)',
      items: [
        // pairs：[圖, 注音, 國字]，按左欄順序；right：右欄注音的排列順序（pairs 的索引）
        { type: 'match', pairs: [['✋', 'ㄕㄡˇ', '手'], ['☁️', 'ㄩㄣˊ', '雲'], ['🦶', 'ㄐㄧㄠˇ', '腳'], ['🐍', 'ㄕㄜˊ', '蛇']], right: [1, 3, 0, 2] },
      ],
    },
    {
      title: '二、圈(ㄑㄩㄢ)出(ㄔㄨ)相(ㄒㄧㄤ)同(ㄊㄨㄥˊ)的(˙ㄉㄜ)符(ㄈㄨˊ)號(ㄏㄠˋ)',
      items: [
        { type: 'findSym', target: 'ㄅ', row: ['ㄆ', 'ㄅ', 'ㄉ', 'ㄅ', 'ㄆ', 'ㄉ', 'ㄅ'] },
        { type: 'findSym', target: 'ㄜ', row: ['ㄛ', 'ㄜ', 'ㄝ', 'ㄛ', 'ㄜ', 'ㄜ', 'ㄝ'] },
      ],
    },
    {
      title: '三、看(ㄎㄢˋ)圖(ㄊㄨˊ)選(ㄒㄩㄢˇ)注(ㄓㄨˋ)音(ㄧㄣ)',
      items: [
        { type: 'choice', emoji: '🚢', word: '船', options: ['ㄔㄨㄤˊ', 'ㄘㄨㄢˊ', 'ㄔㄨㄢˊ'], answer: 'ㄔㄨㄢˊ' },
        { type: 'choice', emoji: '👁️', word: '眼', options: ['ㄧㄢˇ', 'ㄧㄤˇ', 'ㄧㄣˇ'], answer: 'ㄧㄢˇ' },
        { type: 'choice', emoji: '⛰️', word: '山', options: ['ㄙㄢ', 'ㄕㄤ', 'ㄕㄢ'], answer: 'ㄕㄢ' },
        { type: 'choice', emoji: '⭐', word: '星', options: ['ㄒㄧㄣ', 'ㄒㄧㄥ', 'ㄑㄧㄥ'], answer: 'ㄒㄧㄥ' },
      ],
    },
    {
      title: '四、看(ㄎㄢˋ)注(ㄓㄨˋ)音(ㄧㄣ)選(ㄒㄩㄢˇ)圖(ㄊㄨˊ)',
      items: [
        { type: 'pickPic', zhuyin: 'ㄩˊ', word: '魚', options: ['🦆', '🐟', '🐔'], answer: '🐟' },
        { type: 'pickPic', zhuyin: 'ㄕㄨˋ', word: '樹', options: ['📖', '🐍', '🌳'], answer: '🌳' },
        { type: 'pickPic', zhuyin: 'ㄇㄠˋ', word: '帽', options: ['🧢', '👟', '👕'], answer: '🧢' },
      ],
    },
    {
      title: '五、對(ㄉㄨㄟˋ)的(˙ㄉㄜ)打(ㄉㄚˇ)○，錯(ㄘㄨㄛˋ)的(˙ㄉㄜ)打(ㄉㄚˇ)×',
      items: [
        { type: 'judge', emoji: '🍞', word: '麵包', zhuyin: ['ㄇㄧㄢˋ', 'ㄅㄠ'], correct: true },
        { type: 'judge', emoji: '🌈', word: '彩虹', zhuyin: ['ㄘㄞˇ', 'ㄏㄨㄤˊ'], correct: false, fix: 'ㄏㄨㄥˊ' },
      ],
    },
    {
      title: '六、補(ㄅㄨˇ)注(ㄓㄨˋ)音(ㄧㄣ)',
      items: [],
    },
    {
      title: '（一）看(ㄎㄢˋ)圖(ㄊㄨˊ)補(ㄅㄨˇ)注(ㄓㄨˋ)音(ㄧㄣ)',
      sub: true,
      items: [
        { type: 'wordBlank', emoji: '✈️', word: '飛機', zhuyin: ['ㄈㄟ', 'ㄐㄧ'], blank: 0 },
        { type: 'wordBlank', emoji: '🪥', word: '牙刷', zhuyin: ['ㄧㄚˊ', 'ㄕㄨㄚ'], blank: 1 },
        { type: 'wordBlank', emoji: '🚌', word: '公車', zhuyin: ['ㄍㄨㄥ', 'ㄔㄜ'], blank: 0 },
        { type: 'wordBlank', emoji: '☂️', word: '雨傘', zhuyin: ['ㄩˇ', 'ㄙㄢˇ'], blank: 1 },
        { type: 'wordBlank', emoji: '👟', word: '鞋子', zhuyin: ['ㄒㄧㄝˊ', '˙ㄗ'], blank: 0 },
        { type: 'wordBlank', emoji: '🍎', word: '蘋果', zhuyin: ['ㄆㄧㄥˊ', 'ㄍㄨㄛˇ'], blank: 1 },
      ],
    },
    {
      title: '（二）看(ㄎㄢˋ)圖(ㄊㄨˊ)完(ㄨㄢˊ)成(ㄔㄥˊ)句(ㄐㄩˋ)子(˙ㄗ)',
      sub: true,
      items: [
        { type: 'sentence', emoji: '📖', text: '我(ㄨㄛˇ)在(ㄗㄞˋ)看(ㄎㄢˋ)[書(ㄕㄨ)]。' },
        { type: 'sentence', emoji: '🚂', text: '我(ㄨㄛˇ)坐(ㄗㄨㄛˋ)[火(ㄏㄨㄛˇ)車(ㄔㄜ)]去(ㄑㄩˋ)玩(ㄨㄢˊ)。' },
        { type: 'sentence', emoji: '☀️', text: '天(ㄊㄧㄢ)上(ㄕㄤˋ)有(ㄧㄡˇ)[太(ㄊㄞˋ)陽(ㄧㄤˊ)]。' },
        { type: 'sentence', emoji: '🎈', text: '妹(ㄇㄟˋ)妹(˙ㄇㄟ)拿(ㄋㄚˊ)著(˙ㄓㄜ)[氣(ㄑㄧˋ)球(ㄑㄧㄡˊ)]。' },
        { type: 'sentence', emoji: '⚽', text: '我(ㄨㄛˇ)們(˙ㄇㄣ)去(ㄑㄩˋ)踢(ㄊㄧ)[足(ㄗㄨˊ)球(ㄑㄧㄡˊ)]。' },
        { type: 'sentence', emoji: '🍌', text: '我(ㄨㄛˇ)愛(ㄞˋ)吃(ㄔ)[香(ㄒㄧㄤ)蕉(ㄐㄧㄠ)]。' },
      ],
    },
    {
      title: '七、補(ㄅㄨˇ)上(ㄕㄤˋ)聲(ㄕㄥ)調(ㄉㄧㄠˋ)符(ㄈㄨˊ)號(ㄏㄠˋ)',
      items: [
        { type: 'toneSentence', emoji: '🖊️', text: '我(ㄨㄛˇ)用(ㄩㄥˋ)[筆(ㄅㄧˇ)]寫(ㄒㄧㄝˇ)字(ㄗˋ)。' },
        { type: 'toneSentence', emoji: '🥚', text: '媽(ㄇㄚ)媽(˙ㄇㄚ)煮(ㄓㄨˇ)[蛋(ㄉㄢˋ)]。' },
        { type: 'toneSentence', emoji: '🦷', text: '我(ㄨㄛˇ)天(ㄊㄧㄢ)天(ㄊㄧㄢ)刷(ㄕㄨㄚ)[牙(ㄧㄚˊ)]。' },
        { type: 'toneSentence', emoji: '🍵', text: '爺(ㄧㄝˊ)爺(˙ㄧㄝ)喝(ㄏㄜ)[茶(ㄔㄚˊ)]。' },
        { type: 'toneSentence', emoji: '🐴', text: '我(ㄨㄛˇ)會(ㄏㄨㄟˋ)騎(ㄑㄧˊ)[馬(ㄇㄚˇ)]。' },
        { type: 'toneSentence', emoji: '🐘', text: '動(ㄉㄨㄥˋ)物(ㄨˋ)園(ㄩㄢˊ)有(ㄧㄡˇ)大(ㄉㄚˋ)[象(ㄒㄧㄤˋ)]。' },
      ],
    },
  ],
};
