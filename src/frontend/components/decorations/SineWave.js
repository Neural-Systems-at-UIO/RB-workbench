import React, { useRef, useEffect, useState } from 'react'

export function SineWave ({ width = 5000, height = 100, frequency = 0.6, amplitude = 0.1, offset = 0, framerate = 20, increment = 0.2 }) {
  const svg = useRef()
  var [increment, setIncrement] = useState(increment)
  var [framerate, setFramerate] = useState(framerate)
  var [frequency, setFrequency] = useState(frequency)
  var [amplitude, setAmplitude] = useState(amplitude)
  var [offset, setOffset] = useState(offset)
  const [graph, setGraph] = useState('M0,150')

  useEffect(
    () => {
      if (svg.current) {
        let id
        let aid

        // schedule next frame
        id = setTimeout(
          () =>
            (aid = requestAnimationFrame(() =>
            // prompt next graph
              setOffset(offset => (offset -= increment / framerate))
            )),
          1000 / framerate
        )

        return () => {
          clearTimeout(id)
          cancelAnimationFrame(aid)
        }
      }
    },
    [svg.current, offset]
  )

  useEffect(
    () => {
      setGraph(
        createGraph({
          frequency,
          amplitude,
          offset,
          midpoint: '25',
          width: width + 1
        })
      )
    },
    [frequency, amplitude, offset]
  )

  return (
        <svg
            ref={svg}
            width="100vw"
            height="100vw"
            viewBox={'0 0 100vw 100vw'}
            style={{ height: '10vh' }}
        >
            <defs>
                <linearGradient id="fadeGrad" y2="0" x2="0.25">
                    <stop offset="0" stopColor="white" stopOpacity="1" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>

                <mask id="fade" maskContentUnits="objectBoundingBox">
                    <rect width="2" height="1" fill="url(#fadeGrad)" />
                </mask>
            </defs>
            <path
                stroke="white"

                strokeWidth="1"
                strokeLinecap="round"
                fill="none"
                d={graph}
                mask="url(#fade)"
            />

        </svg>

  )
}

const createGraph = ({
  frequency,
  amplitude,
  offset,
  width = 300,
  midpoint = 1.5,
  precision = 3
}) => {
  return [
    ['M', [0, midpoint]],
    ...Array(width)
      .fill(0)
      .map((_, x) => [
        'L',
        [
          x,
          (midpoint - getPath(frequency, amplitude, offset, x)).toFixed(
            precision
          )
        ]
      ])
  ]
    .map(([type, path]) => `${type}${path.join(',')}`)
    .join(' ')
}

const getPath = (frequency, amplitude, offset, x) =>
// determine curve
// 0.2*(Math.sin(Math.sqrt(x)-scope.offset))*x;
  Math.sin(Math.sqrt(x * frequency) - offset) * x * (0.1 * amplitude)

export default SineWave
