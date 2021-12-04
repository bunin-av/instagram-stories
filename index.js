initPlayer({
  target: '.root',
  slides: [
    {
      url: 'img/chunk-1.jpeg',
      overlays: [
        {
          type: 'text',
          value: 'Hello',
          styles: {
            color: 'green',
            font: '60px/14px sans-serif',
            'text-shadow': '2px 2px #000',

            top: '60%',
            left: '30%',

            transform: 'rotate(-30deg)',

            animation: 'scale 2s infinite ease-in-out'
          }
        },
        {
          type: 'text',
          value: 'world',
          styles: {
            color: 'orange',
            font: '40px/14px sans-serif',
            'text-shadows': '2px 2px #000',

            bottom: '20%',
            left: '10%',

            transform: 'rotate(30deg)',

            animation: 'scale 5s infinite ease-in-out'
          }
        }
      ]
    },
    {url: 'img/chunk-2.jpeg'},
    {url: 'img/chunk-3.jpeg'},
  ],
  delay: 2,
})
