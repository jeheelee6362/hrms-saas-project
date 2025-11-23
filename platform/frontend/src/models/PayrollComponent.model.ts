export interface IPayrollComponent {
    componentId: string,
    name: string,
    unit: number | null,
    rate: {
        value: number,
        base: 'Hourly' | 'Daily'
    } | null,
    type: "Default" | "Custom"
}