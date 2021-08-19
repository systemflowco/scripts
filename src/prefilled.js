// SYSTEM FLOW Form Prefill
(() => {
  class Query {
    constructor(initialQuery) {
      this.query = [];

      if (initialQuery) {
        this.parse(initialQuery);
      }
    }

    parse(queryString) {
      const parts = (
        queryString.charAt(0) === '?' ? queryString.slice(1) : queryString
      ).split('&');

      parts.forEach((part) => {
        const [key, val] = part.split('=');
        this.set(key, decodeURIComponent(val));
      });
    }

    get(keyToCheck) {
      const item = this.query.find(({ key }) => key === keyToCheck);

      return item ? item.value : null;
    }

    set(keyToSet, value) {
      this.remove(keyToSet);
      this.query.push({ key: keyToSet, value });
    }

    remove(keyToRemove) {
      this.query = this.query.filter(({ key }) => key !== keyToRemove);
    }
  }

  const form = document.querySelector('[data-sysflow-form-prefill]');
  console.log(form);

  if (form) {
    const query = new Query(window.location.search);
    console.log(query);
    const inputs = form.querySelectorAll('input');
    console.log(inputs);

    inputs.forEach((input) => {
      console.log(input.id);
      const queryKey = input.id;
      console.log(queryKey);
      const queryValue = query.get(queryKey);
      console.log(queryValue);

      //set input value to matched query value
      if (queryValue) {
        input.value = queryValue;
      }
    });
  }
})();
