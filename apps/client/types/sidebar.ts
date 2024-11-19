
export type LabelCount = {
    label: string;
    count: number;
}[];

export type SidebarData = {
    type: LabelCount
    brand: LabelCount
    weight?: LabelCount
    size?: LabelCount
}