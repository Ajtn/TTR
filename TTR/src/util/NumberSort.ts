
export default function numberSort(x: number, y:number) {
        if (x > y)
            return 1;
        else if (x < y)
            return -1;
        else
            return 0;
}