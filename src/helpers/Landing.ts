import { error } from "console";

export async function tableData() {
    try {
        const trend = ['+', '-'];
        let obj = [];
        for (let i = 0; i < 5; i++) {
            obj.push({ id: i, name: 'Bitcoin', price: '$' + getPrice(), change: getChange(trend), pieChart: Math.random() * 1, supply: (Math.random() * 5).toFixed(1) + 'M' })
        }

        console.log("obj is: ", obj)
        return obj;

    } catch (error: unknown) {
        if (error instanceof Error) return error.message
        return String(error)


    }
};

function getPrice() {
    return Math.floor(Math.random() * 10000);
}

function getChange(trend: any) {
    return (trend[Math.floor(Math.random() * trend.length)] + (Math.random() * 5).toFixed(2));

}