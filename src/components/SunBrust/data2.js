export default {
  name: "flare",
  color: "hsl(176, 70%, 50%)",
  children: [
    {
      name: "viz",
      color: "hsl(102, 70%, 50%)",
      children: [
        {
          name: "stack",
          color: "hsl(184, 70%, 50%)",
          children: [
            {
              name: "chart",
              color: "hsl(286, 70%, 50%)",
              value: 31240,
            },
            {
              name: "xAxis",
              color: "hsl(276, 70%, 50%)",
              value: 97953,
            },
            {
              name: "yAxis",
              color: "hsl(182, 70%, 50%)",
              value: 197081,
            },
            {
              name: "layers",
              color: "hsl(162, 70%, 50%)",
              value: 44255,
            },
          ],
        },
        {
          name: "pie",
          color: "hsl(244, 70%, 50%)",
          children: [
            {
              name: "chart",
              color: "hsl(228, 70%, 50%)",
              children: [
                {
                  name: "pie",
                  color: "hsl(161, 70%, 50%)",
                  children: [
                    {
                      name: "outline",
                      color: "hsl(252, 70%, 50%)",
                      value: 125359,
                    },
                    {
                      name: "slices",
                      color: "hsl(22, 70%, 50%)",
                      value: 101632,
                    },
                    {
                      name: "bbox",
                      color: "hsl(223, 70%, 50%)",
                      value: 107584,
                    },
                  ],
                },
                {
                  name: "donut",
                  color: "hsl(324, 70%, 50%)",
                  value: 83536,
                },
                {
                  name: "gauge",
                  color: "hsl(160, 70%, 50%)",
                  value: 54735,
                },
              ],
            },
            {
              name: "legends",
              color: "hsl(3, 70%, 50%)",
              value: 105942,
            },
          ],
        },
      ],
    },
    {
      name: "colors",
      color: "hsl(214, 70%, 50%)",
      children: [
        {
          name: "rgb",
          color: "hsl(268, 70%, 50%)",
          value: 82230,
        },
        {
          name: "hsl",
          color: "hsl(13, 70%, 50%)",
          value: 166581,
        },
      ],
    },
    {
      name: "utils",
      color: "hsl(56, 70%, 50%)",
      children: [
        {
          name: "randomize",
          color: "hsl(116, 70%, 50%)",
          value: 9623,
        },
        {
          name: "resetCvaluek",
          color: "hsl(213, 70%, 50%)",
          value: 63695,
        },
        {
          name: "noop",
          color: "hsl(68, 70%, 50%)",
          value: 59377,
        },
        {
          name: "tick",
          color: "hsl(225, 70%, 50%)",
          value: 176853,
        },
        {
          name: "forceGC",
          color: "hsl(336, 70%, 50%)",
          value: 117960,
        },
        {
          name: "stackTrace",
          color: "hsl(132, 70%, 50%)",
          value: 113906,
        },
        {
          name: "dbg",
          color: "hsl(347, 70%, 50%)",
          value: 134738,
        },
      ],
    },
    {
      name: "generators",
      color: "hsl(49, 70%, 50%)",
      children: [
        {
          name: "address",
          color: "hsl(87, 70%, 50%)",
          value: 88075,
        },
        {
          name: "city",
          color: "hsl(165, 70%, 50%)",
          value: 87933,
        },
        {
          name: "animal",
          color: "hsl(77, 70%, 50%)",
          value: 61199,
        },
        {
          name: "movie",
          color: "hsl(228, 70%, 50%)",
          value: 35883,
        },
        {
          name: "user",
          color: "hsl(124, 70%, 50%)",
          value: 98712,
        },
      ],
    },
    {
      name: "set",
      color: "hsl(137, 70%, 50%)",
      children: [
        {
          name: "clone",
          color: "hsl(129, 70%, 50%)",
          value: 106085,
        },
        {
          name: "intersect",
          color: "hsl(220, 70%, 50%)",
          value: 103602,
        },
        {
          name: "merge",
          color: "hsl(2, 70%, 50%)",
          value: 107884,
        },
        {
          name: "reverse",
          color: "hsl(81, 70%, 50%)",
          value: 130458,
        },
        {
          name: "toArray",
          color: "hsl(196, 70%, 50%)",
          value: 64735,
        },
        {
          name: "toObject",
          color: "hsl(294, 70%, 50%)",
          value: 4169,
        },
        {
          name: "fromCSV",
          color: "hsl(337, 70%, 50%)",
          value: 172235,
        },
        {
          name: "slice",
          color: "hsl(157, 70%, 50%)",
          value: 18806,
        },
        {
          name: "append",
          color: "hsl(103, 70%, 50%)",
          value: 93032,
        },
        {
          name: "prepend",
          color: "hsl(40, 70%, 50%)",
          value: 68848,
        },
        {
          name: "shuffle",
          color: "hsl(147, 70%, 50%)",
          value: 163949,
        },
        {
          name: "pick",
          color: "hsl(186, 70%, 50%)",
          value: 26759,
        },
        {
          name: "plouc",
          color: "hsl(292, 70%, 50%)",
          value: 10690,
        },
      ],
    },
    {
      name: "text",
      color: "hsl(79, 70%, 50%)",
      children: [
        {
          name: "trim",
          color: "hsl(305, 70%, 50%)",
          value: 178782,
        },
        {
          name: "slugify",
          color: "hsl(93, 70%, 50%)",
          value: 144713,
        },
        {
          name: "snakeCase",
          color: "hsl(342, 70%, 50%)",
          value: 169039,
        },
        {
          name: "camelCase",
          color: "hsl(213, 70%, 50%)",
          value: 184963,
        },
        {
          name: "repeat",
          color: "hsl(266, 70%, 50%)",
          value: 142549,
        },
        {
          name: "padLeft",
          color: "hsl(116, 70%, 50%)",
          value: 11055,
        },
        {
          name: "padRight",
          color: "hsl(185, 70%, 50%)",
          value: 68205,
        },
        {
          name: "sanitize",
          color: "hsl(132, 70%, 50%)",
          value: 143504,
        },
        {
          name: "ploucify",
          color: "hsl(306, 70%, 50%)",
          value: 70099,
        },
      ],
    },
    {
      name: "misc",
      color: "hsl(305, 70%, 50%)",
      children: [
        {
          name: "greetings",
          color: "hsl(84, 70%, 50%)",
          children: [
            {
              name: "hey",
              color: "hsl(162, 70%, 50%)",
              value: 162983,
            },
            {
              name: "HOWDY",
              color: "hsl(213, 70%, 50%)",
              value: 13609,
            },
            {
              name: "aloha",
              color: "hsl(299, 70%, 50%)",
              value: 39423,
            },
            {
              name: "AHOY",
              color: "hsl(36, 70%, 50%)",
              value: 148267,
            },
          ],
        },
        {
          name: "other",
          color: "hsl(178, 70%, 50%)",
          value: 47348,
        },
        {
          name: "path",
          color: "hsl(88, 70%, 50%)",
          children: [
            {
              name: "pathA",
              color: "hsl(41, 70%, 50%)",
              value: 156588,
            },
            {
              name: "pathB",
              color: "hsl(286, 70%, 50%)",
              children: [
                {
                  name: "pathB1",
                  color: "hsl(10, 70%, 50%)",
                  value: 44609,
                },
                {
                  name: "pathB2",
                  color: "hsl(111, 70%, 50%)",
                  value: 175962,
                },
                {
                  name: "pathB3",
                  color: "hsl(255, 70%, 50%)",
                  value: 178531,
                },
                {
                  name: "pathB4",
                  color: "hsl(220, 70%, 50%)",
                  value: 23028,
                },
              ],
            },
            {
              name: "pathC",
              color: "hsl(115, 70%, 50%)",
              children: [
                {
                  name: "pathC1",
                  color: "hsl(107, 70%, 50%)",
                  value: 137009,
                },
                {
                  name: "pathC2",
                  color: "hsl(247, 70%, 50%)",
                  value: 16,
                },
                {
                  name: "pathC3",
                  color: "hsl(311, 70%, 50%)",
                  value: 145248,
                },
                {
                  name: "pathC4",
                  color: "hsl(23, 70%, 50%)",
                  value: 766,
                },
                {
                  name: "pathC5",
                  color: "hsl(214, 70%, 50%)",
                  value: 40976,
                },
                {
                  name: "pathC6",
                  color: "hsl(115, 70%, 50%)",
                  value: 157135,
                },
                {
                  name: "pathC7",
                  color: "hsl(77, 70%, 50%)",
                  value: 19277,
                },
                {
                  name: "pathC8",
                  color: "hsl(142, 70%, 50%)",
                  value: 61120,
                },
                {
                  name: "pathC9",
                  color: "hsl(30, 70%, 50%)",
                  value: 144416,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
