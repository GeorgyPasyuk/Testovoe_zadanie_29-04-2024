<script lang="ts">
  import { onMount } from 'svelte';

  let currencies: string[] = [];

  let firstCurrency = '';
  let secondCurrency = '';

  let amount1 = 0;
  let amount2 = 0;

  onMount(async () => {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    currencies = Object.keys(data.rates);
    firstCurrency = currencies[0];
    secondCurrency = currencies[1];
  });

  function setFirstAmount(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newAmount = Number(target.value);
    fetch(`https://api.exchangerate-api.com/v4/latest/${firstCurrency}`)
            .then(res => res.json())
            .then(data => {
              amount2 = data.rates[secondCurrency] * newAmount;
            });

  }

  function setSecondAmount(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newAmount = Number(target.value)
    fetch(`https://api.exchangerate-api.com/v4/latest/${secondCurrency}`)
            .then(res => res.json())
            .then(data => {
              amount1 = data.rates[firstCurrency] * newAmount;
            });
  }

  function setFirstCurrency(event: Event): void {
    setFirstAmount(event);
  }
  function setSecondCurrency(event: Event) {
    setSecondAmount(event);
  }

</script>

<main>
  <h1>Конвертер валют</h1>

  <div class="currency-header">
    <div>
      <h2>Валюта 1:</h2>
      <select class="currency-selector" id="fromCurrency" bind:value={firstCurrency} on:change={setFirstCurrency}>
        {#each currencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
    </div>

    <div>
      <h2>Валюта 2:</h2>
      <select class="currency-selector" id="toCurrency" bind:value={secondCurrency} on:change={setSecondCurrency}>
        {#each currencies as currency}
          <option value={currency}>{currency}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="input-group">
    <label for="amount1">Сумма валюты {firstCurrency}:</label>
    <input type="number" id="amount1" bind:value={amount1} on:input={setFirstAmount} />
  </div>

  <div class="input-group">
    <label for="amount2">Сумма валюты {secondCurrency}:</label>
    <input type="number" id="amount2" bind:value={amount2} on:input={setSecondAmount}/>
  </div>
</main>


<style>
  main {
    text-align: center;
    padding: 20px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .currency-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .currency-selector {
    width: 150px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .input-group {
    margin-bottom: 20px;
  }

  .input-group label {
    font-weight: bold;
    display: block;
    margin-bottom: 5px;
  }

  .input-group input[type="number"] {
    width: 150px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
</style>
