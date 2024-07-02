import { Column } from '@ant-design/plots';
// 这里从 @ant-design/plots 库中导入了 Column 组件，它是用于创建柱状图的组件。
export default function BookRankChart({ books }) {
    const data = books.map(book => ({
        sales: book.sales,
        title: book.title,
    }));
    /*
    通过 map 对传入的 books 数据进行处理，将每本书的 sales（销售量）和 title（书名）转换成想要的数据格式。
    data 变量最终是一个包含所有书籍信息的数组，对应的对象格式为 { sales, title }。
     */

    // 配置图表的各个参数
    const config = {
        data,
        // data：定义图表要展示的数据。
        xField: 'title',
        yField: 'sales',
        // xField：确定 x 轴对应的字段，这里是 title。
        // yField：确定 y 轴对应的字段，这里是 sales。

        label: {
            // label：为柱状图的每个柱子上的标签进行配置。这些标签通常用来展示与各个柱子相关的数值信息（例如，柱子所代表的销量数值）。
            position: 'top',
            // 指定了标签的位置。在这里，标签将显示在每个柱子的顶部，也就是最上方。
            style: {
                fill: '#800080',
                opacity: 1,
                // opacity 值的范围在 0 到 1 之间，0 表示完全透明，1 表示完全不透明。
                fontSize: 18,
            },
        },

        xAxis: {
            label: {
                // autoHide: true,
                autoRotate: true,
                title: {
                    text: '书名',
                }
            },
        },

        yAxis: {
            label:{
                title: {
                    text: '销量',
                }

            }
        },
        /*
        label：配置 x 轴上标签的显示方式。标签是 x 轴上显示的数据点或类别名称（在这个案例中是书名 title）。
        autoHide：当设置为 true 时，如果标签之间的空间不足以显示所有标签，某些标签会自动隐藏。这有助于避免图表因标签过多而变得拥挤或混乱。
        autoRotate：当设置为 true 时，如果标签之间的空间不足，标签会自动旋转以便更清晰地显示。通常与 angle 配合使用，但在这里默认使用自动计算的角度。
         */
        meta: {
            title: {
                alias: '书名',
            },
            sales: {
                alias: '销量',
            },
        },
        style: {
            // 圆角样式
            radiusTopLeft: 40,
            radiusTopRight: 40,

            fill: '#22CBCC',
        },

        columnWidthRatio: 0.4,
        /*
        columnWidthRatio：此属性控制柱子的宽度相对于柱子间隔的比例。取值范围是 0 到 1。
        当设置为 1 时，柱子会没有间隔，相互紧挨。如果希望柱子之间有一些间隔，应该设置为比 1 小的值，例如 0.6。
        当设置为 0 时，柱子会非常细，只有间隔。
         */
    };
    /*
    xAxis：配置 x 轴，标签自动隐藏和旋转。
    meta：提供字段的别名，将 title 显示为“书名”，将 sales 显示为“销量”。
     */
    return <Column {...config} />;
}