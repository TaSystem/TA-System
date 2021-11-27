import { ResponsivePie } from '@nivo/pie'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        sortByValue={true}
        innerRadius={0.55}
        cornerRadius={4}
        activeOuterRadiusOffset={6}
        colors={{ scheme: 'category10' }}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', '0.3' ] ] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#000000"
        arcLinkLabelsDiagonalLength={16}
        arcLinkLabelsStraightLength={16}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsTextColor={{ from: 'color', modifiers: [ [ 'darker', '9' ] ] }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            // {
            //     anchor: 'bottom',
            //     direction: 'row',
            //     justify: false,
            //     translateX: -30,
            //     translateY: 70,
            //     itemsSpacing: 45,
            //     itemWidth: 50,
            //     itemHeight: 10,
            //     itemTextColor: '#999',
            //     itemDirection: 'left-to-right',
            //     itemOpacity: 1,
            //     symbolSize: 20,
            //     symbolShape: 'circle',
            //     effects: [
            //         {
            //             on: 'hover',
            //             style: {
            //                 itemTextColor: '#000'
            //             }
            //         }
            //     ]
            // }
        ]}
    />
)

export default MyResponsivePie