(window.EXAMS ??= []).push({
  name: '試卷2',
  title: '一(ㄧ)年(ㄋㄧㄢˊ)級(ㄐㄧˊ)注(ㄓㄨˋ)音(ㄧㄣ)符(ㄈㄨˊ)號(ㄏㄠˋ)測(ㄘㄜˋ)驗(ㄧㄢˋ)（2）',
  sections: [
    {
      title: '一、連(ㄌㄧㄢˊ)連(ㄌㄧㄢˊ)看(ㄎㄢˋ)',
      items: [
        // pairs：[圖, 注音, 國字]，按左欄順序；right：右欄注音的排列順序（pairs 的索引）
        { type: 'match', pairs: [['🐄', 'ㄋㄧㄡˊ', '牛'], ['🌙', 'ㄩㄝˋ', '月'], ['👂', 'ㄦˇ', '耳'], ['🌸', 'ㄏㄨㄚ', '花']], right: [2, 0, 3, 1] },
      ],
    },
    {
      title: '二、圈(ㄑㄩㄢ)出(ㄔㄨ)相(ㄒㄧㄤ)同(ㄊㄨㄥˊ)的(˙ㄉㄜ)符(ㄈㄨˊ)號(ㄏㄠˋ)',
      items: [
        { type: 'findSym', target: 'ㄊ', row: ['ㄒ', 'ㄊ', 'ㄠ', 'ㄊ', 'ㄒ', 'ㄊ', 'ㄠ'] },
        { type: 'findSym', target: 'ㄢ', row: ['ㄤ', 'ㄢ', 'ㄣ', 'ㄢ', 'ㄤ', 'ㄢ', 'ㄣ'] },
      ],
    },
    {
      title: '三、看(ㄎㄢˋ)圖(ㄊㄨˊ)選(ㄒㄩㄢˇ)注(ㄓㄨˋ)音(ㄧㄣ)',
      items: [
        { type: 'choice', emoji: '🐑', word: '羊', options: ['ㄧㄢˊ', 'ㄧㄤˊ', 'ㄧㄤˇ'], answer: 'ㄧㄤˊ' },
        { type: 'choice', emoji: '🍚', word: '飯', options: ['ㄈㄢˋ', 'ㄈㄤˋ', 'ㄈㄢˇ'], answer: 'ㄈㄢˋ' },
        { type: 'choice', emoji: '👃', word: '鼻', options: ['ㄆㄧˊ', 'ㄅㄧˇ', 'ㄅㄧˊ'], answer: 'ㄅㄧˊ' },
        { type: 'choice', emoji: '🐱', word: '貓', options: ['ㄇㄡ', 'ㄇㄠ', 'ㄇㄠˊ'], answer: 'ㄇㄠ' },
      ],
    },
    {
      title: '四、看(ㄎㄢˋ)注(ㄓㄨˋ)音(ㄧㄣ)選(ㄒㄩㄢˇ)圖(ㄊㄨˊ)',
      items: [
        { type: 'pickPic', zhuyin: 'ㄓㄨ', word: '豬', options: ['🐷', '🐻', '🐶'], answer: '🐷' },
        { type: 'pickPic', zhuyin: 'ㄐㄧ', word: '雞', options: ['🦆', '🐔', '🐟'], answer: '🐔' },
        { type: 'pickPic', zhuyin: 'ㄇㄣˊ', word: '門', options: ['🪟', '🛏️', '🚪'], answer: '🚪' },
      ],
    },
    {
      title: '五、對(ㄉㄨㄟˋ)的(˙ㄉㄜ)打(ㄉㄚˇ)○，錯(ㄘㄨㄛˋ)的(˙ㄉㄜ)打(ㄉㄚˇ)×',
      items: [
        { type: 'judge', emoji: '🌽', word: '玉米', zhuyin: ['ㄩˋ', 'ㄇㄧˊ'], correct: false, fix: 'ㄇㄧˇ' },
        { type: 'judge', emoji: '🦒', word: '長頸鹿', zhuyin: ['ㄔㄤˊ', 'ㄐㄧㄥˇ', 'ㄌㄨˋ'], correct: true },
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
        { type: 'wordBlank', emoji: '🚀', word: '火箭', zhuyin: ['ㄏㄨㄛˇ', 'ㄐㄧㄢˋ'], blank: 1 },
        { type: 'wordBlank', emoji: '👓', word: '眼鏡', zhuyin: ['ㄧㄢˇ', 'ㄐㄧㄥˋ'], blank: 0 },
        { type: 'wordBlank', emoji: '🍉', word: '西瓜', zhuyin: ['ㄒㄧ', 'ㄍㄨㄚ'], blank: 1 },
        { type: 'wordBlank', emoji: '✏️', word: '鉛筆', zhuyin: ['ㄑㄧㄢ', 'ㄅㄧˇ'], blank: 0 },
        { type: 'wordBlank', emoji: '👖', word: '褲子', zhuyin: ['ㄎㄨˋ', '˙ㄗ'], blank: 0 },
        { type: 'wordBlank', emoji: '🐯', word: '老虎', zhuyin: ['ㄌㄠˇ', 'ㄏㄨˇ'], blank: 1 },
      ],
    },
    {
      title: '（二）看(ㄎㄢˋ)圖(ㄊㄨˊ)完(ㄨㄢˊ)成(ㄔㄥˊ)句(ㄐㄩˋ)子(˙ㄗ)',
      sub: true,
      items: [
        { type: 'sentence', emoji: '🐶', text: '我(ㄨㄛˇ)家(ㄐㄧㄚ)養(ㄧㄤˇ)[小(ㄒㄧㄠˇ)狗(ㄍㄡˇ)]。' },
        { type: 'sentence', emoji: '🌧️', text: '外(ㄨㄞˋ)面(ㄇㄧㄢˋ)在(ㄗㄞˋ)下(ㄒㄧㄚˋ)[雨(ㄩˇ)]。' },
        { type: 'sentence', emoji: '🍰', text: '今(ㄐㄧㄣ)天(ㄊㄧㄢ)吃(ㄔ)[蛋(ㄉㄢˋ)糕(ㄍㄠ)]。' },
        { type: 'sentence', emoji: '🎒', text: '我(ㄨㄛˇ)背(ㄅㄟ)[書(ㄕㄨ)包(ㄅㄠ)]上(ㄕㄤˋ)學(ㄒㄩㄝˊ)。' },
        { type: 'sentence', emoji: '🐦', text: '[小(ㄒㄧㄠˇ)鳥(ㄋㄧㄠˇ)]在(ㄗㄞˋ)唱(ㄔㄤˋ)歌(ㄍㄜ)。' },
        { type: 'sentence', emoji: '🧃', text: '我(ㄨㄛˇ)喝(ㄏㄜ)[果(ㄍㄨㄛˇ)汁(ㄓ)]。' },
      ],
    },
    {
      title: '七、補(ㄅㄨˇ)上(ㄕㄤˋ)聲(ㄕㄥ)調(ㄉㄧㄠˋ)符(ㄈㄨˊ)號(ㄏㄠˋ)',
      items: [
        { type: 'toneSentence', emoji: '🍓', text: '我(ㄨㄛˇ)愛(ㄞˋ)吃(ㄔ)草(ㄘㄠˇ)[莓(ㄇㄟˊ)]。' },
        { type: 'toneSentence', emoji: '🦋', text: '蝴(ㄏㄨˊ)[蝶(ㄉㄧㄝˊ)]在(ㄗㄞˋ)飛(ㄈㄟ)。' },
        { type: 'toneSentence', emoji: '🌳', text: '公(ㄍㄨㄥ)園(ㄩㄢˊ)有(ㄧㄡˇ)大(ㄉㄚˋ)[樹(ㄕㄨˋ)]。' },
        { type: 'toneSentence', emoji: '🛏️', text: '我(ㄨㄛˇ)在(ㄗㄞˋ)[床(ㄔㄨㄤˊ)]上(ㄕㄤˋ)睡(ㄕㄨㄟˋ)覺(ㄐㄧㄠˋ)。' },
        { type: 'toneSentence', emoji: '🍜', text: '爸(ㄅㄚˋ)爸(˙ㄅㄚ)吃(ㄔ)[麵(ㄇㄧㄢˋ)]。' },
        { type: 'toneSentence', emoji: '🐭', text: '老(ㄌㄠˇ)[鼠(ㄕㄨˇ)]愛(ㄞˋ)偷(ㄊㄡ)吃(ㄔ)。' },
      ],
    },
  ],
});
