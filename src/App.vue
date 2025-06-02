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
            <p class="no-margin">{{ stock.revenue }}</p>
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
        <p>Inhalt für die erste Karte.</p>
      </BaseCard>
      <BaseCard>
        <h2>Revenue Breakdown Magnificent Seven</h2>
        <p>Inhalt für die erste Karte.</p>
      </BaseCard>
    </div>
    <div class="lower-section">
      <BaseCard>
        <h2>Net Income TTM</h2>
        <p>Inhalt für die erste Karte.</p>
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
import BaseCard from './components/BaseCard.vue';
import { stockService } from '@/services/stockService';

export default {
  name: 'App',
  components: {
    BaseCard
  },
  data() {
    return {
      stockData: [
        {
          company: '$AAPL',
          revenue: 3,
          netIncome: 34,
          grossMargin: 21,
          readableName: 'Apple',
          imgPath: require('@/assets/img/logo_apple.svg')
        },
        {
          company: '$AMZN',
          revenue: 7,
          netIncome: 39,
          grossMargin: 13,
          readableName: 'Amazon',
          imgPath: require('@/assets/img/logo_amazon.svg')
        },
        {
          company: '$GOOG',
          revenue: 3,
          netIncome: 39,
          grossMargin: 23,
          readableName: 'Google',
          imgPath: require('@/assets/img/logo_google.svg')
        },
        {
          company: '$META',
          revenue: 3,
          netIncome: 25,
          grossMargin: 9,
          readableName: 'Meta',
          imgPath: require('@/assets/img/logo_meta.svg')
        },
        {
          company: '$MSFT',
          revenue: 7,
          netIncome: 28,
          grossMargin: 13,
          readableName: 'Microsoft',
          imgPath: require('@/assets/img/logo_microsoft.svg')
        },
        {
          company: '$NVDA',
          revenue: 3,
          netIncome: 27,
          grossMargin: 9,
          readableName: 'Nvidia',
          imgPath: require('@/assets/img/logo_nvidia.svg')
        },
        {
          company: '$TSLA',
          revenue: 11,
          netIncome: 42,
          grossMargin: 24,
          readableName: 'Tesla',
          imgPath: require('@/assets/img/logo_tesla.svg')
        }
      ]
    };
  },
  async created() {
    for (let i = 0; i < this.stockData.length; i++) {
      this.data = await stockService.getRevenue(this.stockData[i].company, this.stockData[i].revenue, this.stockData[i].netIncome, this.stockData[i].grossMargin);
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
