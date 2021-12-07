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
    {
      url: 'img/chunk-2.jpeg',
      filter: ['contrast(150%)', 'blur(2px)'],
      overlays: [
        {
          type: 'question',
          question: 'Do you like ice cream?',
          variants: ['Yes', 'No'],
          styles: {
            font: '2rem sans-serif',

            top: '40%',
            left: '30%',

          }
        }
      ]
    },
    {
      url: 'img/chunk-3.jpeg',
      overlays: [
        {
          type: 'text',
          value: 'You can do it',
          styles: {
            color: 'white',
            font: '2rem/14px sans-serif',
            'text-shadows': '2px 2px #000',
            'text-align': 'center',

            top: '40%',
            left: '30%',

            'min-height': '5rem',
            display: 'flex',
            'align-items': 'center'
          },
          classes: ['black-brash'],
        }
      ]
    },
  ],
  delay: 2,
})
