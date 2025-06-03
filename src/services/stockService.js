import axios from 'axios';

const order = [
    'Mar 21',
    'Jun 21',
    'Sep 21',
    'Dec 21',
    'Mar 22',
    'Jun 22',
    'Sep 22',
    'Dec 22',
    'Mar 23',
    '""',
    '3 Aug 23',
    '2 Nov 23',
    '1 Feb 24',
    '2 Mai 24',
];

class StockSerivce {
    constructor() {
        this.apiClient = axios.create({
            baseURL: 'https://sheetdb.io/api/v1/s2nz7opye1dm3'
        });
    }

    async fetchData(sheetName) {
        try {
            const response = await this.apiClient.get(`?sheet=${sheetName}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    async getRevenue(sheetName, revenuePosition) {
        const data = await this.fetchData(sheetName);
        return order.map(key => data[revenuePosition]?.[key]);
    }

    async getNetIncome(sheetName, netIncomePosition) {
        const data = await this.fetchData(sheetName);
        console.log('Fetched Data', data);
        console.log('Row at netIncomePosition', data[netIncomePosition]);
        return order.map(key => data[netIncomePosition]?.[key]);
    }

    async getGrossMargin(sheetName, grossMarginPosition) {
        const data = await this.fetchData(sheetName);
        return order.map(key => data[grossMarginPosition]?.[key]);
    }
}

export const stockService = new StockSerivce();