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
        { type: 'findSym', target: 'ㄢ', row: ['ㄤ', 'ㄢ', 'ㄣ', 'ㄢ', 'ㄤ', 'ㄢ', 'ㄣ'] },
      ],
    },
    {
      title: '三、看(ㄎㄢˋ)圖(ㄊㄨˊ)選(ㄒㄩㄢˇ)注(ㄓㄨˋ)音(ㄧㄣ)',
      items: [
        { type: 'choice', emoji: '🐑', word: '羊', options: ['ㄧㄢˊ', 'ㄧㄤˊ', 'ㄧㄤˇ'], answer: 'ㄧㄤˊ' },
        { type: 'choice', emoji: '👃', word: '鼻', options: ['ㄆㄧˊ', 'ㄅㄧˇ', 'ㄅㄧˊ'], answer: 'ㄅㄧˊ' },
      ],
    },
    {
      title: '四、看(ㄎㄢˋ)注(ㄓㄨˋ)音(ㄧㄣ)選(ㄒㄩㄢˇ)圖(ㄊㄨˊ)',
      items: [
        { type: 'pickPic', zhuyin: 'ㄓㄨ', word: '豬', options: ['🐷', '🐻', '🐶'], answer: '🐷' },
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
      title: '六、選(ㄒㄩㄢˇ)詞(ㄘˊ)填(ㄊㄧㄢˊ)空(ㄎㄨㄥˋ)',
      items: [
        { type: 'pickWord', text: '我(ㄨㄛˇ)的(˙ㄉㄜ)牙(ㄧㄚˊ)齒(ㄔˇ)好(ㄏㄠˇ)痛(ㄊㄨㄥˋ)，要(ㄧㄠˋ)去(ㄑㄩˋ)看(ㄎㄢˋ)[ ]。', options: ['電(ㄉㄧㄢˋ)影(ㄧㄥˇ)', '醫(ㄧ)生(ㄕㄥ)'], answer: '醫(ㄧ)生(ㄕㄥ)' },
        { type: 'pickWord', text: '天(ㄊㄧㄢ)黑(ㄏㄟ)了(˙ㄌㄜ)，該(ㄍㄞ)[ ]了(˙ㄌㄜ)。', options: ['睡(ㄕㄨㄟˋ)覺(ㄐㄧㄠˋ)', '上(ㄕㄤˋ)學(ㄒㄩㄝˊ)'], answer: '睡(ㄕㄨㄟˋ)覺(ㄐㄧㄠˋ)' },
        { type: 'pickWord', text: '手(ㄕㄡˇ)髒(ㄗㄤ)了(˙ㄌㄜ)，要(ㄧㄠˋ)用(ㄩㄥˋ)[ ]洗(ㄒㄧˇ)手(ㄕㄡˇ)。', options: ['肥(ㄈㄟˊ)皂(ㄗㄠˋ)', '剪(ㄐㄧㄢˇ)刀(ㄉㄠ)'], answer: '肥(ㄈㄟˊ)皂(ㄗㄠˋ)' },
        { type: 'pickWord', text: '魚(ㄩˊ)在(ㄗㄞˋ)水(ㄕㄨㄟˇ)裡(ㄌㄧˇ)[ ]。', options: ['寫(ㄒㄧㄝˇ)字(ㄗˋ)', '游(ㄧㄡˊ)泳(ㄩㄥˇ)'], answer: '游(ㄧㄡˊ)泳(ㄩㄥˇ)' },
      ],
    },
    {
      title: '七、補(ㄅㄨˇ)注(ㄓㄨˋ)音(ㄧㄣ)',
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
        { type: 'sentence', emoji: '🐶', scene: 'scenes/dog-lawn.svg', text: '小(ㄒㄧㄠˇ)[狗(ㄍㄡˇ)]在(ㄗㄞˋ)草(ㄘㄠˇ)[地(ㄉㄧˋ)]上(ㄕㄤˋ)跑(ㄆㄠˇ)。' },
        { type: 'sentence', emoji: '🌧️', scene: 'scenes/rainy-classroom.svg', text: '今(ㄐㄧㄣ)天(ㄊㄧㄢ)下(ㄒㄧㄚˋ)大(ㄉㄚˋ)[雨(ㄩˇ)]，我(ㄨㄛˇ)們(˙ㄇㄣ)在(ㄗㄞˋ)教(ㄐㄧㄠˋ)[室(ㄕˋ)]玩(ㄨㄢˊ)。' },
        { type: 'sentence', emoji: '🍰', scene: 'scenes/cake-snack.svg', text: '媽(ㄇㄚ)媽(˙ㄇㄚ)買(ㄇㄞˇ)了(˙ㄌㄜ)[蛋(ㄉㄢˋ)]糕(ㄍㄠ)給(ㄍㄟˇ)我(ㄨㄛˇ)當(ㄉㄤ)[點(ㄉㄧㄢˇ)]心(ㄒㄧㄣ)。' },
        { type: 'sentence', emoji: '🎒', scene: 'scenes/school-walk.svg', text: '我(ㄨㄛˇ)背(ㄅㄟ)著(˙ㄓㄜ)書(ㄕㄨ)[包(ㄅㄠ)]去(ㄑㄩˋ)學(ㄒㄩㄝˊ)[校(ㄒㄧㄠˋ)]。' },
        { type: 'sentence', emoji: '🐦', scene: 'scenes/bird-song.svg', text: '早(ㄗㄠˇ)上(ㄕㄤˋ)，小(ㄒㄧㄠˇ)[鳥(ㄋㄧㄠˇ)]在(ㄗㄞˋ)唱(ㄔㄤˋ)[歌(ㄍㄜ)]。' },
        { type: 'sentence', emoji: '🧃', scene: 'scenes/juice-after-sport.svg', text: '運(ㄩㄣˋ)[動(ㄉㄨㄥˋ)]完(ㄨㄢˊ)，我(ㄨㄛˇ)喝(ㄏㄜ)果(ㄍㄨㄛˇ)[汁(ㄓ)]。' },
      ],
    },
    {
      title: '八、補(ㄅㄨˇ)上(ㄕㄤˋ)聲(ㄕㄥ)調(ㄉㄧㄠˋ)符(ㄈㄨˊ)號(ㄏㄠˋ)',
      items: [
        { type: 'toneSentence', emoji: '🍓', text: '我(ㄨㄛˇ)愛(ㄞˋ)吃(ㄔ)草(ㄘㄠˇ)[莓(ㄇㄟˊ)]。' },
        { type: 'toneSentence', emoji: '🦋', text: '蝴(ㄏㄨˊ)[蝶(ㄉㄧㄝˊ)]在(ㄗㄞˋ)飛(ㄈㄟ)。' },
        { type: 'toneSentence', emoji: '🌳', text: '公(ㄍㄨㄥ)園(ㄩㄢˊ)有(ㄧㄡˇ)大(ㄉㄚˋ)[樹(ㄕㄨˋ)]。' },
        { type: 'toneSentence', emoji: '🛏️', text: '我(ㄨㄛˇ)在(ㄗㄞˋ)[床(ㄔㄨㄤˊ)]上(ㄕㄤˋ)睡(ㄕㄨㄟˋ)覺(ㄐㄧㄠˋ)。' },
        { type: 'toneSentence', emoji: '🍜', text: '爸(ㄅㄚˋ)爸(˙ㄅㄚ)吃(ㄔ)[麵(ㄇㄧㄢˋ)]。' },
        { type: 'toneSentence', emoji: '🐭', text: '老(ㄌㄠˇ)[鼠(ㄕㄨˇ)]愛(ㄞˋ)偷(ㄊㄡ)吃(ㄔ)。' },
      ],
    },
    {
      title: '九、聽(ㄊㄧㄥ)寫(ㄒㄧㄝˇ)（按(ㄢˋ)🔊聽(ㄊㄧㄥ)）',
      // 只在平板上考，列印時不印。用字避開變調：三聲連三聲、一、不、輕聲
      items: [
        { type: 'dictation', word: '球鞋', zhuyin: ['ㄑㄧㄡˊ', 'ㄒㄧㄝˊ'] },
        { type: 'dictation', word: '排隊', zhuyin: ['ㄆㄞˊ', 'ㄉㄨㄟˋ'] },
        { type: 'dictation', word: '冰淇淋', zhuyin: ['ㄅㄧㄥ', 'ㄑㄧˊ', 'ㄌㄧㄣˊ'] },
        { type: 'dictation', word: '消防車', zhuyin: ['ㄒㄧㄠ', 'ㄈㄤˊ', 'ㄔㄜ'] },
        { type: 'dictation', word: '橡皮擦', zhuyin: ['ㄒㄧㄤˋ', 'ㄆㄧˊ', 'ㄘㄚ'] },
      ],
    },
  ],
});
