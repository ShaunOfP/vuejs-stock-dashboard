<template>
  <header class="header">
    <div class="header-blue-form"></div>
    <p>The Magnificent Seven Companies</p>
  </header>
  <div class="main-container">
    <div class="upper-section">
      <BaseCard v-for="stock in stockData" :key="stock.company">
        <header class="upper-section--header">
          <img :src="stock.imgPath" class="stock-image">
          <h2 class="no-margin">{{ stock.readableName }}</h2>
        </header>
        <div class="upper-section--main">
          <p class="no-margin">Revenue Q1 2024</p>
          <div>
            <p class="no-margin"></p>
            <div>
              <p class="no-margin"></p>
              <p class="no-margin"></p>
            </div>
          </div>
          <p class="no-margin">In Bill USD</p>
        </div>
      </BaseCard>
    </div>
    <div class="middle-section">
      <BaseCard>
        <h2>Revenue last 3 years</h2>
      </BaseCard>
      <BaseCard>
        <h2>Revenue Breakdown Magnificent Seven</h2>
        <p>Inhalt für die erste Karte.</p>
      </BaseCard>
    </div>
    <div class="lower-section">
      <BaseCard>
        <h2>Net Income TTM</h2>
        <BarChart :labels="companyNames" :values="latestTTMNetIncomes" :datasets="netIncomeDatasets" />
      </BaseCard>
      <BaseCard>
        <h2>Gross Margin in % LQ</h2>
        <p>Inhalt für die erste Karte.</p>
      </BaseCard>
      <BaseCard>
        <h2>Revenue Growth in % YoY</h2>
        <p>Inhalt für die erste Karte.</p>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import BarChart from './components/BarChart.vue';
import BaseCard from './components/BaseCard.vue';
import { stockService } from '@/services/stockService';

export default {
  name: 'App',
  components: {
    BaseCard,
    BarChart
  },
  data() {
    return {
      stockData: [
        {
          company: '$AAPL',
          revenue: 5,
          netIncome: 36,
          grossMargin: 23,
          readableName: 'Apple',
          imgPath: require('@/assets/img/logo_apple.svg')
        },
        {
          company: '$AMZN',
          revenue: 9,
          netIncome: 41,
          grossMargin: 15,
          readableName: 'Amazon',
          imgPath: require('@/assets/img/logo_amazon.svg')
        },
        {
          company: '$GOOG',
          revenue: 5,
          netIncome: 41,
          grossMargin: 25,
          readableName: 'Google',
          imgPath: require('@/assets/img/logo_google.svg')
        },
        {
          company: '$META',
          revenue: 5,
          netIncome: 27,
          grossMargin: 11,
          readableName: 'Meta',
          imgPath: require('@/assets/img/logo_meta.svg')
        },
        {
          company: '$MSFT',
          revenue: 9,
          netIncome: 30,
          grossMargin: 15,
          readableName: 'Microsoft',
          imgPath: require('@/assets/img/logo_microsoft.svg')
        },
        {
          company: '$NVDA',
          revenue: 5,
          netIncome: 29,
          grossMargin: 11,
          readableName: 'Nvidia',
          imgPath: require('@/assets/img/logo_nvidia.svg')
        },
        {
          company: '$TSLA',
          revenue: 13,
          netIncome: 44,
          grossMargin: 26,
          readableName: 'Tesla',
          imgPath: require('@/assets/img/logo_tesla.svg')
        }
      ]
    };
  },
  async created() {
    const translatedStockData = await Promise.all(
      this.stockData.map(async stock => {
        const revenue = await stockService.getRevenue(stock.company, stock.revenue);
        const netIncome = await stockService.getNetIncome(stock.company, stock.netIncome);
        const grossMargin = await stockService.getGrossMargin(stock.company, stock.grossMargin);
        return { ...stock, revenue, netIncome, grossMargin };
      }));
    this.stockData = translatedStockData;
  },
  computed: {
    companyNames() {
      return this.stockData.map(stock => stock.readableName);
    },
    latestTTMNetIncomes() {
      return this.stockData.map(stock => {
        return stock.netIncome?.slice(-12) ?? [];
      });
    },
    netIncomeDatasets() {
      return this.stockData.map(stock => ({
        label: stock.company,
        data: stock.netIncome?.slice(-12) ?? [],
        backgroundColor: this.getColorFor(stock.company),
      }));
    }
  },
  methods: {
    getColorFor(company) {
      const colors = {
        '$AAPL': '#196F8C',
        '$AMZN': '#39DAFF',
        '$GOOG': '#29A5C5',
        '$META': '#31BFE2',
        '$MSFT': '#218AA8',
        '$NVDA': '#11546F',
        '$TSLA': '#093A52'
      };
      return colors[company] || '#ddd';
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  padding: 64px 100px;
  background: radial-gradient(71.11% 100% at 50% 0%, #020204 14.6%, #011F35 100%);
  box-sizing: border-box;
  min-height: 100vh;
  width: 100vw;
  color: white;
  font-family: 'Rubik';
}

.header {
  display: flex;
  align-items: center;
  gap: 24px;
  font-weight: 500;
  font-size: 36px;
  margin-bottom: 48px;
  margin-left: -100px;

  p {
    margin: 0;
  }
}

.no-margin {
  margin: 0;
}

.header-blue-form {
  height: 32px;
  width: 96px;
  border-radius: 0 100px 100px 0;
  background-color: #39DAFF;
}

.main-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.upper-section {
  display: flex;
  background-color: #023A6233;
  gap: 24px;
  border-radius: 20px;
  padding: 24px;

  p {
    white-space: nowrap;
  }
}

.upper-section--header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  font-size: 20px;
}

.upper-section--main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.stock-image {
  height: 20px;
  width: 20px;
}

.middle-section {
  display: flex;
  gap: 32px;
}

.lower-section {
  display: flex;
  gap: 32px;
}

@font-face {
  font-display: swap;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 300;
  src: url('./assets/fonts/rubik-v28-latin-300.woff2') format('woff2');
}

@font-face {
  font-display: swap;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 400;
  src: url('./assets/fonts/rubik-v28-latin-regular.woff2') format('woff2');
}

@font-face {
  font-display: swap;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 500;
  src: url('./assets/fonts/rubik-v28-latin-500.woff2') format('woff2');
}

@font-face {
  font-display: swap;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 600;
  src: url('./assets/fonts/rubik-v28-latin-600.woff2') format('woff2');
}

@font-face {
  font-display: swap;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 700;
  src: url('./assets/fonts/rubik-v28-latin-700.woff2') format('woff2');
}

@font-face {
  font-display: swap;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 800;
  src: url('./assets/fonts/rubik-v28-latin-800.woff2') format('woff2');
}

@font-face {
  font-display: swap;
  font-family: 'Rubik';
  font-style: normal;
  font-weight: 900;
  src: url('./assets/fonts/rubik-v28-latin-900.woff2') format('woff2');
}
</style>
