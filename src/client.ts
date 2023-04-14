(function () {
    const $: Document['querySelector'] = (selector: any) => document.querySelector(selector)
    const $new: Document['createElement'] = (tagName: any) => document.createElement(tagName)

    const random = (max: number) => Math.floor(Math.random() * max)

    // prettier-ignore
    const fluentEmoji = ['alien', 'alien-monster', 'anger-symbol', 'angry-face', 'angry-face-with-horns', 'anguished-face', 'anxious-face-with-sweat', 'astonished-face', 'beaming-face-with-smiling-eyes', 'beating-heart', 'black-heart', 'blue-heart', 'bomb', 'broken-heart', 'brown-heart', 'cat-with-tears-of-joy', 'cat-with-wry-smile', 'clown-face', 'cold-face', 'collision', 'confounded-face', 'confused-face', 'cowboy-hat-face', 'crying-cat', 'crying-face', 'dashing-away', 'disappointed-face', 'disguised-face', 'dizzy', 'dotted-line-face', 'downcast-face-with-sweat', 'drooling-face', 'exploding-head', 'expressionless-face', 'eye-in-speech-bubble', 'face-blowing-a-kiss', 'face-exhaling', 'face-holding-back-tears', 'face-in-clouds', 'face-savoring-food', 'face-screaming-in-fear', 'face-vomiting', 'face-with-diagonal-mouth', 'face-with-hand-over-mouth', 'face-with-head-bandage', 'face-with-medical-mask', 'face-with-monocle', 'face-with-open-eyes-and-hand-over-mouth', 'face-with-open-mouth', 'face-with-peeking-eye', 'face-with-raised-eyebrow', 'face-with-rolling-eyes', 'face-with-spiral-eyes', 'face-with-steam-from-nose', 'face-with-symbols-on-mouth', 'face-with-tears-of-joy', 'face-with-thermometer', 'face-with-tongue', 'face-without-mouth', 'fearful-face', 'flushed-face', 'frowning-face', 'frowning-face-with-open-mouth', 'ghost', 'goblin', 'green-heart', 'grimacing-face', 'grinning-cat', 'grinning-cat-with-smiling-eyes', 'grinning-face', 'grinning-face-with-big-eyes', 'grinning-face-with-smiling-eyes', 'grinning-face-with-sweat', 'grinning-squinting-face', 'growing-heart', 'hear-no-evil-monkey', 'heart-decoration', 'heart-exclamation', 'heart-on-fire', 'heart-with-arrow', 'heart-with-ribbon', 'hole', 'hot-face', 'hugging-face', 'hundred-points', 'hushed-face', 'kiss-mark', 'kissing-cat', 'kissing-face', 'kissing-face-with-closed-eyes', 'kissing-face-with-smiling-eyes', 'knocked-out-face', 'left-speech-bubble', 'loudly-crying-face', 'love-letter', 'lying-face', 'melting-face', 'mending-heart', 'money-mouth-face', 'nauseated-face', 'nerd-face', 'neutral-face', 'ogre', 'orange-heart', 'partying-face', 'pensive-face', 'persevering-face', 'pile-of-poo', 'pleading-face', 'pouting-cat', 'pouting-face', 'purple-heart', 'red-heart', 'relieved-face', 'revolving-hearts', 'right-anger-bubble', 'robot', 'rolling-on-the-floor-laughing', 'sad-but-relieved-face', 'saluting-face', 'see-no-evil-monkey', 'shushing-face', 'skull', 'skull-and-crossbones', 'sleeping-face', 'sleepy-face', 'slightly-frowning-face', 'slightly-smiling-face', 'smiling-cat-with-heart-eyes', 'smiling-face', 'smiling-face-with-halo', 'smiling-face-with-heart-eyes', 'smiling-face-with-hearts', 'smiling-face-with-horns', 'smiling-face-with-smiling-eyes', 'smiling-face-with-sunglasses', 'smiling-face-with-tear', 'smirking-face', 'sneezing-face', 'sparkling-heart', 'speak-no-evil-monkey', 'speech-balloon', 'squinting-face-with-tongue', 'star-struck', 'sweat-droplets', 'thinking-face', 'thought-balloon', 'tired-face', 'two-hearts', 'unamused-face', 'upside-down-face', 'weary-cat', 'weary-face', 'white-heart', 'winking-face', 'winking-face-with-tongue', 'woozy-face', 'worried-face', 'yawning-face', 'yellow-heart', 'zany-face', 'zipper-mouth-face', 'zzz']
    const randomIcon = fluentEmoji[random(fluentEmoji.length)]
    $('link[rel="icon"]')?.setAttribute('href', `https://api.iconify.design/fluent-emoji/${randomIcon}.svg`)

    // wechat title
    // if (navigator.userAgent.toLowerCase().includes('micromessenger')) {
    //     const title = document.title
    //     const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
    //         document.title = intersectionRatio ? '' : title
    //     })
    //     observer.observe($('body header h1')!)
    // }

    // 以下在生产环境下才执行
    if (import.meta.env.DEV)
        return

    // baidu analytics
    const hm = $new('script')
    hm.src = 'https://hm.baidu.com/hm.js?31461ca186316e6e1d22fe0e57687243'
    $('head')?.appendChild(hm)
})()
