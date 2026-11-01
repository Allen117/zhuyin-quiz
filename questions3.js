(window.EXAMS ??= []).push({
  name: '試卷3',
  title: '一(ㄧ)年(ㄋㄧㄢˊ)級(ㄐㄧˊ)注(ㄓㄨˋ)音(ㄧㄣ)符(ㄈㄨˊ)號(ㄏㄠˋ)測(ㄘㄜˋ)驗(ㄧㄢˋ)（3）',
  sections: [
    {
      title: '一、連(ㄌㄧㄢˊ)連(ㄌㄧㄢˊ)看(ㄎㄢˋ)',
      items: [
        // pairs：[圖, 注音, 國字]，按左欄順序；right：右欄注音的排列順序（pairs 的索引）
        { type: 'match', pairs: [['💧', 'ㄕㄨㄟˇ', '水'], ['🍬', 'ㄊㄤˊ', '糖'], ['🦆', 'ㄧㄚ', '鴨'], ['🍃', 'ㄧㄝˋ', '葉']], right: [2, 3, 1, 0] },
      ],
    },
    {
      title: '二、圈(ㄑㄩㄢ)出(ㄔㄨ)相(ㄒㄧㄤ)同(ㄊㄨㄥˊ)的(˙ㄉㄜ)符(ㄈㄨˊ)號(ㄏㄠˋ)',
      items: [
        { type: 'findSym', target: 'ㄓ', row: ['ㄗ', 'ㄓ', 'ㄔ', 'ㄓ', 'ㄗ', 'ㄓ', 'ㄔ'] },
      ],
    },
    {
      title: '三、看(ㄎㄢˋ)圖(ㄊㄨˊ)選(ㄒㄩㄢˇ)注(ㄓㄨˋ)音(ㄧㄣ)',
      items: [
        { type: 'choice', emoji: '🐛', word: '蟲', options: ['ㄔㄨㄥˊ', 'ㄘㄨㄥˊ', 'ㄔㄨㄣˊ'], answer: 'ㄔㄨㄥˊ' },
        { type: 'choice', emoji: '🧊', word: '冰', options: ['ㄅㄧㄣ', 'ㄆㄧㄥ', 'ㄅㄧㄥ'], answer: 'ㄅㄧㄥ' },
      ],
    },
    {
      title: '四、看(ㄎㄢˋ)注(ㄓㄨˋ)音(ㄧㄣ)選(ㄒㄩㄢˇ)圖(ㄊㄨˊ)',
      items: [
        { type: 'pickPic', zhuyin: 'ㄨㄢˇ', word: '碗', options: ['🥄', '🥣', '🥢'], answer: '🥣' },
        { type: 'pickPic', zhuyin: 'ㄉㄥ', word: '燈', options: ['🔑', '📱', '💡'], answer: '💡' },
      ],
    },
    {
      title: '五、對(ㄉㄨㄟˋ)的(˙ㄉㄜ)打(ㄉㄚˇ)○，錯(ㄘㄨㄛˋ)的(˙ㄉㄜ)打(ㄉㄚˇ)×',
      items: [
        { type: 'judge', emoji: '📞', word: '電話', zhuyin: ['ㄉㄧㄢˋ', 'ㄏㄨㄚˋ'], correct: true },
        { type: 'judge', emoji: '🐝', word: '蜜蜂', zhuyin: ['ㄇㄧˋ', 'ㄈㄣ'], correct: false, fix: 'ㄈㄥ' },
      ],
    },
    {
      title: '六、選(ㄒㄩㄢˇ)詞(ㄘˊ)填(ㄊㄧㄢˊ)空(ㄎㄨㄥˋ)',
      items: [
        { type: 'pickWord', text: '我(ㄨㄛˇ)用(ㄩㄥˋ)耳(ㄦˇ)朵(˙ㄉㄨㄛ)[ ]。', options: ['聽(ㄊㄧㄥ)歌(ㄍㄜ)', '吃(ㄔ)飯(ㄈㄢˋ)'], answer: '聽(ㄊㄧㄥ)歌(ㄍㄜ)' },
        { type: 'pickWord', text: '小(ㄒㄧㄠˇ)貓(ㄇㄠ)愛(ㄞˋ)吃(ㄔ)[ ]。', options: ['青(ㄑㄧㄥ)菜(ㄘㄞˋ)', '小(ㄒㄧㄠˇ)魚(ㄩˊ)'], answer: '小(ㄒㄧㄠˇ)魚(ㄩˊ)' },
        { type: 'pickWord', text: '我(ㄨㄛˇ)跌(ㄉㄧㄝ)倒(ㄉㄠˇ)了(˙ㄌㄜ)，[ ]好(ㄏㄠˇ)痛(ㄊㄨㄥˋ)。', options: ['頭(ㄊㄡˊ)髮(ㄈㄚˇ)', '膝(ㄒㄧ)蓋(ㄍㄞˋ)'], answer: '膝(ㄒㄧ)蓋(ㄍㄞˋ)' },
        { type: 'pickWord', text: '老(ㄌㄠˇ)師(ㄕ)在(ㄗㄞˋ)說(ㄕㄨㄛ)話(ㄏㄨㄚˋ)，大(ㄉㄚˋ)家(ㄐㄧㄚ)要(ㄧㄠˋ)[ ]。', options: ['安(ㄢ)靜(ㄐㄧㄥˋ)', '唱(ㄔㄤˋ)歌(ㄍㄜ)'], answer: '安(ㄢ)靜(ㄐㄧㄥˋ)' },
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
        { type: 'wordBlank', emoji: '🏫', word: '學校', zhuyin: ['ㄒㄩㄝˊ', 'ㄒㄧㄠˋ'], blank: 1 },
        { type: 'wordBlank', emoji: '🧤', word: '手套', zhuyin: ['ㄕㄡˇ', 'ㄊㄠˋ'], blank: 0 },
        { type: 'wordBlank', emoji: '🐢', word: '烏龜', zhuyin: ['ㄨ', 'ㄍㄨㄟ'], blank: 1 },
        { type: 'wordBlank', emoji: '⏰', word: '鬧鐘', zhuyin: ['ㄋㄠˋ', 'ㄓㄨㄥ'], blank: 0 },
        { type: 'wordBlank', emoji: '🍋', word: '檸檬', zhuyin: ['ㄋㄧㄥˊ', 'ㄇㄥˊ'], blank: 1 },
        { type: 'wordBlank', emoji: '📺', word: '電視', zhuyin: ['ㄉㄧㄢˋ', 'ㄕˋ'], blank: 1 },
      ],
    },
    {
      title: '（二）看(ㄎㄢˋ)圖(ㄊㄨˊ)完(ㄨㄢˊ)成(ㄔㄥˊ)句(ㄐㄩˋ)子(˙ㄗ)',
      sub: true,
      items: [
        { type: 'sentence', emoji: '❄️', text: '[冬(ㄉㄨㄥ)]天(ㄊㄧㄢ)好(ㄏㄠˇ)冷(ㄌㄥˇ)，外(ㄨㄞˋ)面(ㄇㄧㄢˋ)飄(ㄆㄧㄠ)著(˙ㄓㄜ)[雪(ㄒㄩㄝˇ)]花(ㄏㄨㄚ)。' },
        { type: 'sentence', emoji: '✂️', text: '[剪(ㄐㄧㄢˇ)]刀(ㄉㄠ)用(ㄩㄥˋ)完(ㄨㄢˊ)要(ㄧㄠˋ)放(ㄈㄤˋ)回(ㄏㄨㄟˊ)抽(ㄔㄡ)[屜(ㄊㄧˋ)]。' },
        { type: 'sentence', emoji: '🍪', text: '[巧(ㄑㄧㄠˇ)]克(ㄎㄜˋ)力(ㄌㄧˋ)餅(ㄅㄧㄥˇ)[乾(ㄍㄢ)]真(ㄓㄣ)好(ㄏㄠˇ)吃(ㄔ)。' },
        { type: 'sentence', emoji: '🚗', text: '爸(ㄅㄚˋ)爸(˙ㄅㄚ)開(ㄎㄞ)[汽(ㄑㄧˋ)]車(ㄔㄜ)去(ㄑㄩˋ)上(ㄕㄤˋ)[班(ㄅㄢ)]。' },
        { type: 'sentence', emoji: '🏀', text: '哥(ㄍㄜ)哥(˙ㄍㄜ)在(ㄗㄞˋ)體(ㄊㄧˇ)[育(ㄩˋ)]館(ㄍㄨㄢˇ)打(ㄉㄚˇ)[籃(ㄌㄢˊ)]球(ㄑㄧㄡˊ)。' },
        { type: 'sentence', emoji: '🎁', text: '母(ㄇㄨˇ)[親(ㄑㄧㄣ)]節(ㄐㄧㄝˊ)，我(ㄨㄛˇ)送(ㄙㄨㄥˋ)媽(ㄇㄚ)媽(˙ㄇㄚ)禮(ㄌㄧˇ)[物(ㄨˋ)]。' },
      ],
    },
    {
      title: '八、補(ㄅㄨˇ)上(ㄕㄤˋ)聲(ㄕㄥ)調(ㄉㄧㄠˋ)符(ㄈㄨˊ)號(ㄏㄠˋ)',
      items: [
        { type: 'toneSentence', emoji: '🪑', text: '我(ㄨㄛˇ)坐(ㄗㄨㄛˋ)在(ㄗㄞˋ)[椅(ㄧˇ)]子(˙ㄗ)上(ㄕㄤˋ)。' },
        { type: 'toneSentence', emoji: '🐻', text: '森(ㄙㄣ)林(ㄌㄧㄣˊ)裡(ㄌㄧˇ)有(ㄧㄡˇ)[熊(ㄒㄩㄥˊ)]。' },
        { type: 'toneSentence', emoji: '🛌', text: '我(ㄨㄛˇ)要(ㄧㄠˋ)睡(ㄕㄨㄟˋ)[覺(ㄐㄧㄠˋ)]了(˙ㄌㄜ)。' },
        { type: 'toneSentence', emoji: '🌊', text: '我(ㄨㄛˇ)們(˙ㄇㄣ)去(ㄑㄩˋ)[海(ㄏㄞˇ)]邊(ㄅㄧㄢ)玩(ㄨㄢˊ)。' },
        { type: 'toneSentence', emoji: '🍑', text: '我(ㄨㄛˇ)愛(ㄞˋ)吃(ㄔ)[桃(ㄊㄠˊ)]子(˙ㄗ)。' },
        { type: 'toneSentence', emoji: '🎂', text: '今(ㄐㄧㄣ)天(ㄊㄧㄢ)是(ㄕˋ)我(ㄨㄛˇ)的(˙ㄉㄜ)生(ㄕㄥ)[日(ㄖˋ)]。' },
      ],
    },
    {
      title: '九、聽(ㄊㄧㄥ)寫(ㄒㄧㄝˇ)（按(ㄢˋ)🔊聽(ㄊㄧㄥ)）',
      // 只在平板上考，列印時不印。用字避開變調：三聲連三聲、一、不、輕聲
      items: [
        { type: 'dictation', word: '牛奶', zhuyin: ['ㄋㄧㄡˊ', 'ㄋㄞˇ'] },
        { type: 'dictation', word: '口罩', zhuyin: ['ㄎㄡˇ', 'ㄓㄠˋ'] },
        { type: 'dictation', word: '午餐', zhuyin: ['ㄨˇ', 'ㄘㄢ'] },
        { type: 'dictation', word: '鉛筆盒', zhuyin: ['ㄑㄧㄢ', 'ㄅㄧˇ', 'ㄏㄜˊ'] },
        { type: 'dictation', word: '運動會', zhuyin: ['ㄩㄣˋ', 'ㄉㄨㄥˋ', 'ㄏㄨㄟˋ'] },
      ],
    },
  ],
});
