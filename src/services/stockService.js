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

    async getRevenue(sheetName, revenue, netIncome, grossMargin) {
        const data = await this.fetchData(sheetName);
        return order.map(key => {
            console.log(sheetName, key ,data[revenue][key]);
            return {
                company: sheetName,
                revenue: data[revenue]?.[key],
                netIncome: data[netIncome]?.[key],
                grossMargin: data[grossMargin]?.[key]
            };
        });
    }
}

export const stockService = new StockSerivce();