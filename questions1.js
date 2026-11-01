(window.EXAMS ??= []).push({
  name: '試卷1',
  title: '一(ㄧ)年(ㄋㄧㄢˊ)級(ㄐㄧˊ)注(ㄓㄨˋ)音(ㄧㄣ)符(ㄈㄨˊ)號(ㄏㄠˋ)測(ㄘㄜˋ)驗(ㄧㄢˋ)（1）',
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
      ],
    },
    {
      title: '三、看(ㄎㄢˋ)圖(ㄊㄨˊ)選(ㄒㄩㄢˇ)注(ㄓㄨˋ)音(ㄧㄣ)',
      items: [
        { type: 'choice', emoji: '🚢', word: '船', options: ['ㄔㄨㄤˊ', 'ㄘㄨㄢˊ', 'ㄔㄨㄢˊ'], answer: 'ㄔㄨㄢˊ' },
        { type: 'choice', emoji: '⭐', word: '星', options: ['ㄒㄧㄣ', 'ㄒㄧㄥ', 'ㄑㄧㄥ'], answer: 'ㄒㄧㄥ' },
      ],
    },
    {
      title: '四、看(ㄎㄢˋ)注(ㄓㄨˋ)音(ㄧㄣ)選(ㄒㄩㄢˇ)圖(ㄊㄨˊ)',
      items: [
        { type: 'pickPic', zhuyin: 'ㄩˊ', word: '魚', options: ['🦆', '🐟', '🐔'], answer: '🐟' },
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
      title: '六、選(ㄒㄩㄢˇ)詞(ㄘˊ)填(ㄊㄧㄢˊ)空(ㄎㄨㄥˋ)',
      items: [
        { type: 'pickWord', text: '肚(ㄉㄨˋ)子(˙ㄗ)餓(ㄜˋ)了(˙ㄌㄜ)，我(ㄨㄛˇ)想(ㄒㄧㄤˇ)[ ]。', options: ['吃(ㄔ)飯(ㄈㄢˋ)', '洗(ㄒㄧˇ)澡(ㄗㄠˇ)'], answer: '吃(ㄔ)飯(ㄈㄢˋ)' },
        { type: 'pickWord', text: '外(ㄨㄞˋ)面(ㄇㄧㄢˋ)下(ㄒㄧㄚˋ)雨(ㄩˇ)了(˙ㄌㄜ)，我(ㄨㄛˇ)穿(ㄔㄨㄢ)上(ㄕㄤˋ)[ ]。', options: ['睡(ㄕㄨㄟˋ)衣(ㄧ)', '雨(ㄩˇ)衣(ㄧ)'], answer: '雨(ㄩˇ)衣(ㄧ)' },
        { type: 'pickWord', text: '好(ㄏㄠˇ)冷(ㄌㄥˇ)喔(ㄛ)，我(ㄨㄛˇ)要(ㄧㄠˋ)蓋(ㄍㄞˋ)[ ]。', options: ['書(ㄕㄨ)包(ㄅㄠ)', '棉(ㄇㄧㄢˊ)被(ㄅㄟˋ)'], answer: '棉(ㄇㄧㄢˊ)被(ㄅㄟˋ)' },
        { type: 'pickWord', text: '我(ㄨㄛˇ)口(ㄎㄡˇ)渴(ㄎㄜˇ)了(˙ㄌㄜ)，想(ㄒㄧㄤˇ)要(ㄧㄠˋ)[ ]。', options: ['喝(ㄏㄜ)水(ㄕㄨㄟˇ)', '跑(ㄆㄠˇ)步(ㄅㄨˋ)'], answer: '喝(ㄏㄜ)水(ㄕㄨㄟˇ)' },
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
        { type: 'sentence', emoji: '📖', scene: 'scenes/bedtime-story.svg', text: '睡(ㄕㄨㄟˋ)[覺(ㄐㄧㄠˋ)]前(ㄑㄧㄢˊ)，我(ㄨㄛˇ)看(ㄎㄢˋ)故(ㄍㄨˋ)[事(ㄕˋ)]書(ㄕㄨ)。' },
        { type: 'sentence', emoji: '🚂', scene: 'scenes/train-trip.svg', text: '放(ㄈㄤˋ)暑(ㄕㄨˇ)[假(ㄐㄧㄚˋ)]了(˙ㄌㄜ)，我(ㄨㄛˇ)們(˙ㄇㄣ)坐(ㄗㄨㄛˋ)[火(ㄏㄨㄛˇ)]車(ㄔㄜ)去(ㄑㄩˋ)玩(ㄨㄢˊ)。' },
        { type: 'sentence', emoji: '☀️', scene: 'scenes/beach.svg', text: '[太(ㄊㄞˋ)]陽(ㄧㄤˊ)出(ㄔㄨ)來(ㄌㄞˊ)了(˙ㄌㄜ)，我(ㄨㄛˇ)們(˙ㄇㄣ)去(ㄑㄩˋ)海(ㄏㄞˇ)[邊(ㄅㄧㄢ)]玩(ㄨㄢˊ)。' },
        { type: 'sentence', emoji: '🎈', scene: 'scenes/birthday.svg', text: '生(ㄕㄥ)[日(ㄖˋ)]會(ㄏㄨㄟˋ)上(ㄕㄤˋ)有(ㄧㄡˇ)很(ㄏㄣˇ)多(ㄉㄨㄛ)[氣(ㄑㄧˋ)]球(ㄑㄧㄡˊ)。' },
        { type: 'sentence', emoji: '⚽', scene: 'scenes/soccer.svg', text: '同(ㄊㄨㄥˊ)[學(ㄒㄩㄝˊ)]們(˙ㄇㄣ)在(ㄗㄞˋ)踢(ㄊㄧ)[足(ㄗㄨˊ)]球(ㄑㄧㄡˊ)。' },
        { type: 'sentence', emoji: '🍌', scene: 'scenes/breakfast.svg', text: '我(ㄨㄛˇ)吃(ㄔ)香(ㄒㄧㄤ)[蕉(ㄐㄧㄠ)]當(ㄉㄤ)早(ㄗㄠˇ)[餐(ㄘㄢ)]。' },
      ],
    },
    {
      title: '八、補(ㄅㄨˇ)上(ㄕㄤˋ)聲(ㄕㄥ)調(ㄉㄧㄠˋ)符(ㄈㄨˊ)號(ㄏㄠˋ)',
      items: [
        { type: 'toneSentence', emoji: '🖊️', text: '我(ㄨㄛˇ)用(ㄩㄥˋ)[筆(ㄅㄧˇ)]寫(ㄒㄧㄝˇ)字(ㄗˋ)。' },
        { type: 'toneSentence', emoji: '🥚', text: '媽(ㄇㄚ)媽(˙ㄇㄚ)煮(ㄓㄨˇ)[蛋(ㄉㄢˋ)]。' },
        { type: 'toneSentence', emoji: '🦷', text: '我(ㄨㄛˇ)天(ㄊㄧㄢ)天(ㄊㄧㄢ)刷(ㄕㄨㄚ)[牙(ㄧㄚˊ)]。' },
        { type: 'toneSentence', emoji: '🍵', text: '爺(ㄧㄝˊ)爺(˙ㄧㄝ)喝(ㄏㄜ)[茶(ㄔㄚˊ)]。' },
        { type: 'toneSentence', emoji: '🐴', text: '我(ㄨㄛˇ)會(ㄏㄨㄟˋ)騎(ㄑㄧˊ)[馬(ㄇㄚˇ)]。' },
        { type: 'toneSentence', emoji: '🐘', text: '動(ㄉㄨㄥˋ)物(ㄨˋ)園(ㄩㄢˊ)有(ㄧㄡˇ)大(ㄉㄚˋ)[象(ㄒㄧㄤˋ)]。' },
      ],
    },
    {
      title: '九、聽(ㄊㄧㄥ)寫(ㄒㄧㄝˇ)（按(ㄢˋ)🔊聽(ㄊㄧㄥ)）',
      // 只在平板上考，列印時不印。用字避開變調：三聲連三聲、一、不、輕聲
      items: [
        { type: 'dictation', word: '老師', zhuyin: ['ㄌㄠˇ', 'ㄕ'] },
        { type: 'dictation', word: '青菜', zhuyin: ['ㄑㄧㄥ', 'ㄘㄞˋ'] },
        { type: 'dictation', word: '電腦', zhuyin: ['ㄉㄧㄢˋ', 'ㄋㄠˇ'] },
        { type: 'dictation', word: '跳繩', zhuyin: ['ㄊㄧㄠˋ', 'ㄕㄥˊ'] },
        { type: 'dictation', word: '游泳池', zhuyin: ['ㄧㄡˊ', 'ㄩㄥˇ', 'ㄔˊ'] },
      ],
    },
  ],
});
